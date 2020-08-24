import React from 'react';
import './Button.css';

const button =(props)=>(
<button   id="mydisabled" className={props.btnType}
     onClick={props.clicked}
     disabled={props.disabled}
     >
     {props.children}</button>
);

export default button ;
