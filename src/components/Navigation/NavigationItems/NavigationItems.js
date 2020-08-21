import React from 'react';
import './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems =(props)=>(
    <ul className="NavigationItems">
        <NavigationItem link="/" active={'true'}>Burger Builder</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
);

export default navigationItems ;
