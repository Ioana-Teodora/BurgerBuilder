import React from 'react';
import imgSrc from '../../assets/Images/burger-logo.png';
import './Logo.css';
const logo =(props)=>(
    <div className="Logo" style={{height: props.height}}>
        <img src={imgSrc} alt="Myburger"/>
    </div>
);

export default logo ;
