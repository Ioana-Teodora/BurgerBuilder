import React,{useState,useEffect,useCallback} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';

const BurgerBuilder= props=>{
    const [purchasing,setPurchasing]=useState(false);
   // const [loading,setLoading]=useState(false);
   const dispatch=useDispatch();
 
   const ings= useSelector(state=>{
       return state.burgerBuilder.ingredients;
   });
   const price= useSelector(state=>{
    return state.burgerBuilder.totalPrice;
});
const error= useSelector(state=>{
    return state.burgerBuilder.error;
});
const isAuth= useSelector(state=>{
    return state.auth.token!== null;
});
   const onIngredientAdded= (ingredientName)=>dispatch(actions.addIngredient(ingredientName));
   const onIngredientRemoved= (ingredientName)=>dispatch(actions.removeIngredient(ingredientName));
   const onInitIngredients= useCallback(()=>dispatch(actions.initIngredients()),[dispatch]);
   const onInitPurchese=()=>dispatch(actions.purchaseInit());
   const onSetAuthRedirectPath=(path)=>dispatch(actions.setAuthRedirectPath(path));

    useEffect(()=>{
        onInitIngredients();
        
    },[onInitIngredients]);
  
    const updatePurchaseState=(ingredients)=>{
       
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{
            return sum +el;
        },0);
        return  sum>0;
    }
    const purchaseHandler=()=>{
        if(isAuth)
        {setPurchasing(true);}else{
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }
    const purchaseCancelHandler=()=>{
        setPurchasing(false);
    }
   const purchaseContinueHandler=()=>{
      onInitPurchese();
      props.history.push('/checkout');}

        const disabledInfo={
            ...ings
        };

        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=null;
        
        let burger=error?<p style={{textAlign:"center"}}>Ingredients can't be loaded!</p>:<Spinner/>;
        console.log('[BB]',error);
        if(ings)
         {burger=( 
            <Aux>
            <Burger ingredients={ings}/>
            <BuildControls 
            ingredientAdded={onIngredientAdded}
            ingredientRemuved={onIngredientRemoved}
            disabled={disabledInfo}
            price={price}
            purchasable={updatePurchaseState(ings)}
            ordered={purchaseHandler}
            isAuth={isAuth}
            /></Aux>);
            orderSummary=<OrderSummary 
            ingredients={ings}
            purchaseCancel={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            price={price}
            />;
        }
    //     if(loading){
    //         orderSummary=<Spinner/>;
    // }
        return(
            <Aux>
                
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
               
            </Aux>

        );}

  
    export default withErrorHandler(BurgerBuilder,axios);