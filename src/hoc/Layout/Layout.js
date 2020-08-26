import React,{Component} from 'react';
import Aux from '../Auxiliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';



class Layout extends  Component{
    state={
        showSideDrawer: false
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
        return {showSideDrawer:!prevState.showSideDrawer}
    });

    }
    render(){
        return(
            <Aux>
                <Toolbar 
                isAuth={this.props.isAuth}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth={this.props.isAuth}
                open={this.state.showSideDrawer}
                 closed={this.sideDrawerClosedHandler}/>
                <main className="Content" >
                    {this.props.children}
                </main>
            </Aux>
        );
    }

};
const mapStateToProps=state=>{return{
    isAuth: state.auth.token !==null

};};

export default connect(mapStateToProps)(Layout);