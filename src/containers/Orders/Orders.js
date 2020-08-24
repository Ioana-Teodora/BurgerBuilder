import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: null,
        loading: true
      }
    componentDidMount(){
        axios.get('/orders.json')
        .then(response=>{
            console.log(response.data);

            const fetchedOrders=[];
            for(let key in response.data)
            {fetchedOrders.push({
                ...response.data[key],
                id: key
            });}
            this.setState({orders: fetchedOrders, loading: false});
        }).catch(err=>{
            this.setState({loading: false});
        });

    }
    render() { 
        let order=()=>{

        }
        return ( 
            <div>
                {this.state.loading?<Spinner/>:this.state.orders.map(order=>(
                        <Order key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                ))}
               
            </div>
         );
    }
}
 
export default withErrorHandler(Orders,axios);