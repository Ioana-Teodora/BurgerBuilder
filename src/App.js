import React, {useEffect,lazy,Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
import  Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';



 const Checkout= lazy(()=>{
   return import('./containers/Checkout/Checkout');
 });
 const Orders= lazy(()=>{
  return import('./containers/Orders/Orders');
});
const Auth= lazy(()=>{
  return import('./containers/Auth/Auth');
});

const App = props=> {
const {onTryAutoSingout}=props;
useEffect(()=>{
  onTryAutoSingout();
},[onTryAutoSingout]);
    let router=(
      <Switch>
        <Route path="/auth"  render={(props)=><Auth {...props}/>}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );
    if(props.isAuth)
    {
      router=(
        <Switch>
        <Route path="/checkout"   render={(props)=><Checkout {...props}/>}/>
        <Route path="/orders"   render={(props)=><Orders {...props}/>}/>
        <Route path="/logout"  component={Logout}/>
        <Route path="/auth"   render={(props)=><Auth {...props}/> }/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
        </Switch>
        );
    }

  return (
    <div >
      <Layout>
       <Suspense fallback={<p>Loading...</p>}>{router}</Suspense>
      </Layout>
     
    </div>
  );
}


const mapStateToProps=state=>{
  return{
    isAuth: state.auth.token!==null
  };
};
const mapDispatchToProps=dispatch=>{return{
      onTryAutoSingout:()=>dispatch(actions.authCheckState())
};};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
