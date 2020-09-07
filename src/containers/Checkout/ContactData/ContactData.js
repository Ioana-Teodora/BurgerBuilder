import React, { useState } from 'react';
import Button from '../../..//components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';
const ContactData =props=>{
    const [orderForm,setOrderForm]=useState(
         {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched:false
                
            },
            email: {
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
            delieveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastes', displayValue: 'Fastes' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation:{},
                valid:true
                
            }
        }
    );
   const [formIsValid, setFormIsValid]=useState(false);
   const  orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementId in orderForm) {
            formData[formElementId] = orderForm[formElementId].value;
        }

        const order = {
            ingredients:props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        props.onOrderBurger(order,props.token);
    }
    const inputChangedHandler = (event, inputIdentifier) => {
        const updateFormElement = updateObject (orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value,  orderForm[inputIdentifier].validation),
            touched: true
        });
        const updateOrderForm =updateObject( orderForm,{
            [inputIdentifier]: updateFormElement
        });        
        let formIsValid=true;
        for(let inputid in updateOrderForm){
            formIsValid=updateOrderForm[inputid].valid && formIsValid;
        }
        setOrderForm(updateOrderForm);
        setFormIsValid(formIsValid);
    }
        const formElementArray = [];
        for (let key in orderForm) {
            formElementArray.push({
                id: key,
                config: orderForm[key]

            });

        }
        let form = (<form onSubmit={orderHandler}>
            {
                formElementArray.map(formElement => (
                    <Input elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        key={formElement.id}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                ))
            }
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>);
        if (props.loading) { form = <Spinner /> }

        return (
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
}

const mapStateToProps=state=>{return{
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
};};
const mapDispatchToProps=dispatch=>{
return{
    onOrderBurger: (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))

};
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));