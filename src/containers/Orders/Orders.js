import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';

const Orders =props=> {
    const {onFatchOrders,token,userId}=props;
    useEffect(()=>{
        onFatchOrders(token,userId);
    },[onFatchOrders,token,userId]);

        return ( 
            <div>
                {props.loading?<Spinner/>:props.orders.map(order=>(
                        <Order key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                ))}
               
            </div>
         );
}
const mapStateToProps= state=>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};
const mapDispatchToProps= dispatch=>{
    return{
         onFatchOrders:(token,userId)=>dispatch(action.fetchOrders(token,userId))
    };
};
 
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));