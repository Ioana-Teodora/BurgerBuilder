import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrowerTougle from '../SideDrawer/DrowerToggle/DrowerTougle';

const toolbar =(props)=>(
    <header className="Toolbar">
        <DrowerTougle clicked={props.drawerToggleClicked}/>
        <Logo height="80%"/>
        <nav className="DesktopOnly">
           <NavigationItems/>
        </nav>
    </header>
);

export default toolbar ;
