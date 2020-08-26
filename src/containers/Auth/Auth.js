import React, { Component } from 'react';
import './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import{updateObject,checkValidity} from '../../shared/utility';
class Auth extends Component {
    state = { 
        controls:{ email: {
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
        }},
        isSingup: true
     }
    
    inputChangedHandler=(event,controlName)=>{
        const updateControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            })
        });
       this.setState({controls:updateControls});
    }
    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSingup);
    }
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{
                isSingup: !prevState.isSingup
            };
        })
    }
    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }

    }
    render() { 
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]

            });

        }
        const form =formElementArray.map(formElement=>(
            <Input 
            elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        key={formElement.id}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
            />
            
        ));
        let error=null;
        if(this.props.error)
        error=(
        <p>{this.props.error.message}</p>
        );
        let authRedirect=null;
        if(this.props.isAuth){
            authRedirect=<Redirect to={this.props.authRedirectPath}/>
        }
        return ( 
            <div className="Auth">  
                <form onSubmit={this.submitHandler}>
                    {this.props.loading?<Spinner/>:form}
                    {error}
                    <Button btnType='Success'>SUBMIT</Button>
                    
                </form>
                <Button
                     clicked={this.switchAuthModeHandler}
                     btnType="Danger">SWITCH TO {this.state.isSingup?'SINGIN': 'SINGOUT'}</Button>
                {authRedirect}
            </div>
         );
    }
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