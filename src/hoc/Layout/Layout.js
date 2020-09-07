import React,{useState} from 'react';
import Aux from '../Auxiliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';



const Layout =props=>{
   const [showSideDrawer,setShowSideDrawer] =useState(false);

   const sideDrawerClosedHandler=()=>{
        setShowSideDrawer(false);
    }
   const  sideDrawerToggleHandler=()=>{
       setShowSideDrawer(!showSideDrawer);
    }

        return(
            <Aux>
                <Toolbar 
                isAuth={props.isAuth}
                drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth={props.isAuth}
                open={showSideDrawer}
                 closed={sideDrawerClosedHandler}/>
                <main className="Content" >
                    {props.children}
                </main>
            </Aux>
        );

};
const mapStateToProps=state=>{return{
    isAuth: state.auth.token !==null

};};

export default connect(mapStateToProps)(Layout);