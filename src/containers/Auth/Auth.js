import React, {useState,useEffect} from 'react';
import './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import{updateObject,checkValidity} from '../../shared/utility';
const Auth =props=> {
     const [controls,setControls]=useState({ email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your Mail'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched:false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched:false
    }});
    const [isSingup,setIsSingup]=useState(true);
    
   const  inputChangedHandler=(event,controlName)=>{
        const updateControls = updateObject(controls,{
            [controlName]: updateObject(controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls(updateControls);
    }
    const  submitHandler=(event)=>{
        event.preventDefault();
        props.onAuth(controls.email.value,controls.password.value,isSingup);
    }
    const switchAuthModeHandler=()=>{
        setIsSingup(!isSingup);
    }
    const {onSetAuthRedirectPath,building,authRedirectPath}=props;
    useEffect(()=>{
        if(!building && authRedirectPath!=='/'){
           onSetAuthRedirectPath();
        }
    },[onSetAuthRedirectPath,authRedirectPath,building]);

        const formElementArray = [];
        for (let key in controls) {
            formElementArray.push({
                id: key,
                config: controls[key]

            });

        }
        const form =formElementArray.map(formElement=>(
            <Input 
            elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        key={formElement.id}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
            />
            
        ));
        let error=null;
        if(props.error)
        error=(
        <p>{props.error.message}</p>
        );
        let authRedirect=null;
        if(props.isAuth){
            authRedirect=<Redirect to={props.authRedirectPath}/>
        }
        return ( 
            <div className="Auth">  
                <form onSubmit={submitHandler}>
                    {props.loading?<Spinner/>:form}
                    {error}
                    <Button btnType='Success'>SUBMIT</Button>
                    
                </form>
                <Button
                     clicked={switchAuthModeHandler}
                     btnType="Danger">SWITCH TO {isSingup?'SINGIN': 'SINGOUT'}</Button>
                {authRedirect}
            </div>
         );
    }
const mapStateToProps=state=>{
    return{
        isAuth:  state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error,
        loading: state.auth.loading,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
} ;
const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSingup)=>dispatch(actions.auth(email,password,isSingup)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
};};
export default connect(mapStateToProps,mapDispatchToProps)(Auth);