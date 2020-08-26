import React from 'react';
import './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems =(props)=>(
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth?<NavigationItem link="/orders" >Orders</NavigationItem>:null}
        {props.isAuth?
        <NavigationItem link="/logout" >LOGOUT</NavigationItem>:
        <NavigationItem link="/auth" >LOGIN</NavigationItem>
        }
    </ul>
);

export default navigationItems ;
