import React, { Component } from 'react';
import Button from '../../..//components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = { 
        name: '',
        email:'',
        adress:{
            street: '',
            postalCode:'',
            loading: false
        }}
        orderHandler=(event)=>{
            event.preventDefault();
            console.log(this.props.ingredients);
      // alert('You continue now');
       this.setState({loading:true});

       const order={
           ingredients: this.props.ingredients,
           price: this.props.totalPrice,
           customer: {
               name: 'Teo',
               address: {
                   country:'Romania country',
                    city:' Suceava city',
                    street: 'MyStreet',
                    zipCode: '734500'
                
                },
                email: 'test@test.com',
                delieveryMethod: 'fastest'
           }
       };
       axios.post('/orders.json',order).then(
        resopnse=>{
            console.log(resopnse);
            this.setState({loading:false });
            this.props.history.push('/');

        }
       ).catch(
           error=>{
               console.log(error);
               this.setState({loading:false});
           }

       );

        }
    render() { 
        let form=( <form>
            <input className="Input" type="text" name="name" placeholder="Your Name"/>
            <input className="Input" type="email" name="email" placeholder="Your Mail"/>
            <input className="Input" type="text" name="street" placeholder="Street"/>
            <input className="Input" type="text" name="postal" placeholder="PostalCode"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if(this.state.loading)
            {form=<Spinner/>}

        return (  
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
               {form}
            </div>
        );
    }
}
 
export default ContactData;