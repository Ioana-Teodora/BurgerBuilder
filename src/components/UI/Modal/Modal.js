import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal =props=>{
    // shouldComponentUpdate(nextProps,nextSate){
    //     return nextProps.show!==props.show ||  nextProps.children!== props.children;
    // }
   
        return(
            <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>    
        <div 
        className="Modal"
        style={{
            transform: props.show? 'translateY(0)': 'translateY(-100vh)',
            opacity:props.show? '1': '0'
    
        }}>
            {props.children}
        </div>
        </Aux>

        );};

export default React.memo(Modal,(prevProps,nextProps)=>nextProps.show===prevProps.show &&  nextProps.children=== prevProps.children);
