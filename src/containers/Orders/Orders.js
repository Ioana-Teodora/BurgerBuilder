import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';

class Orders extends Component {
   
    componentDidMount(){
       this.props.onFatchOrders();
    }
    render() { 
        return ( 
            <div>
                {this.props.loading?<Spinner/>:this.props.orders.map(order=>(
                        <Order key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                ))}
               
            </div>
         );
    }
}
const mapStateToProps= state=>{
    return{
        orders: state.order.orders,
        loading: state.order.loading

    };
};
const mapDispatchToProps= dispatch=>{
    return{
         onFatchOrders:()=>dispatch(action.fetchOrders())
    };
};
 
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));