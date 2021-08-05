import React, { Component } from 'react';
import { Route, Switch , Redirect , withRouter} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';


//const Orders = React.lazy(() => import('./containers/Orders/Orders'));
//const Checkout = React.lazy(() => )

const Orders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const Checkout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  // state ={
  //   show: true
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show:false});
  //   } , 5000);
  // }


  render() {

    let route = (
      <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact  component={BurgerBuilder} />
      <Redirect to='/' />
      </Switch>
    );

    if(this.props.isAuthenticated){
      route = (
        <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact  component={BurgerBuilder} />
        <Redirect to = '/' />
        </Switch>
      );
    }

    return (
      <div>
          <Layout>
               {route}
         </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(App));
