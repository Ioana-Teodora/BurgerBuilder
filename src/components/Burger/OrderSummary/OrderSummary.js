import React,{Component} from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
    // componentWillMount (){
    //     console.log("[OrderSummary] willUpdate");
    // }

    render(){
        const ingredientSummary=Object.keys(this.props.ingredients).map(igKey=>{
            return (
            <li  key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
            </li>);
            });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger hith theh following ingredients: </p>
                <ul>
                {ingredientSummary}
                </ul>
                <p><strong>Total Price:{this.props.price.toFixed(2)} RON</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CANTINUE</Button>
            </Aux>
        );

    };
   
};

export default OrderSummary ;
