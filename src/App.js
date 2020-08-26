import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
import  Auth from './containers/Auth/Auth';
import  Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  // state={
  //   show: true
  // }
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show: false});
  //   },5000);
  // }
  componentDidMount(){
    this.props.onTryAutoSingout();
  }
  render(){
    let router=(
      <Switch>
        <Route path="/auth"  component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuth)
    {
      router=(
        <Switch>
        <Route path="/checkout"  component={Checkout}/>
        <Route path="/orders"  component={Orders}/>
        <Route path="/logout"  component={Logout}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
        </Switch>
        );
    }

  return (
    <div >
      <Layout>
        {/* {this.state.show?<BurgerBuilder/>:null} */}
       {router}
      </Layout>
     
    </div>
  );
}}
const mapStateToProps=state=>{
  return{
    isAuth: state.auth.token!==null
  };
};
const mapDispatchToProps=dispatch=>{return{
      onTryAutoSingout:()=>dispatch(actions.authCheckState())
};};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
