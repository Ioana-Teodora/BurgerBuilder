import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary';

const sideDrawer =(props)=>{

   let attachedClasses=['SideDrawer','Close'];
    if(props.open)
    attachedClasses=['SideDrawer','Open'];

 
    ///....
    return(

        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')}>
            <div className="marginBottomLogoSide">
            <Logo />
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>

    );
};

export default sideDrawer ;
