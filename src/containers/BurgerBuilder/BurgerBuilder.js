import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
            purchasing:false,
            loading: false,
        };
    }
    componentDidMount(){
       // console.log(this.props);
        this.props.OnInitIngredients();
       
    }
    updatePurchaseState(ingredients){
       
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{
            return sum +el;
        },0);
        return  sum>0;
    }
    purchaseHandler=()=>{
        if(this.props.isAuth)
        {this.setState({purchasing:true});}else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
      this.props.onInitPurchese();
      this.props.history.push('/checkout');
      
    }
    render(){
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=null;
        
        let burger=this.props.error?<p style={{textAlign:"center"}}>Ingredients can't be loaded!</p>:<Spinner/>;
        if(this.props.ings)
         {burger=( 
            <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemuved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
            /></Aux>);
            orderSummary=<OrderSummary 
            ingredients={this.props.ings}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price}
            />;
        }
        if(this.state.loading){
            orderSummary=<Spinner/>;
    }
        return(
            <Aux>
                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
               
            </Aux>

        );}
    }

    const mapStateToProps= state=>{
        return{
            ings: state.burgerBuilder.ingredients,
            price: state.burgerBuilder.totalPrice,
            error: state.burgerBuilder.error,
            isAuth: state.auth.token!== null
           
        }
    };
    const mapDispatchToProps= dispatch=>{
        return{
            onIngredientAdded: (ingredientName)=>dispatch(actions.addIngredient(ingredientName)),
            onIngredientRemoved: (ingredientName)=>dispatch(actions.removeIngredient(ingredientName)),
            OnInitIngredients: ()=>dispatch(actions.initIngredients()),
            onInitPurchese:()=>dispatch(actions.purchaseInit()),
            onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
          
        };
    };
    export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));