import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls= [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Chesse', type: 'chesse'},
    {label:'Meat', type: 'meat'}
];

const buildControls =(props)=>(
    <div className="BuildControls">
        <p>Current Price : <strong>{props.price.toFixed(2)} RON</strong></p>
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label}
            label={ctrl.label} 
            ingredientAdded={()=>props.ingredientAdded(ctrl.type)}
            ingredientRemuved={()=>props.ingredientRemuved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            
            />
        ))}
        <button className="OrderButton" 
        disabled={!props.purchasable}
        onClick={props.ordered}
        >
           {props.isAuth?'ORDER NOW':'SING UP TO ORDER'} 
        </button>


    </div>

);

export default buildControls ;
