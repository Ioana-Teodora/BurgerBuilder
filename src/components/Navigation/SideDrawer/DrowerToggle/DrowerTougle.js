import React from 'react';
import './DrowerTougle.css';

const drowerTougle =(props)=>(
    <div  
    className="DrawerToggle"
    onClick={props.clicked}>
     <div></div>   
     <div></div>   
     <div></div>   
    </div>
);

export default drowerTougle;