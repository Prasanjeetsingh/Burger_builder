import React , {Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route , Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

// state = {
//   ingredients: null,
//   totalPrice: 0
// }
//
// componentWillMount(){
//   const query = new URLSearchParams(this.props.location.search);
//   const ingredients = {};
//   let price=0;
//   for(let param  of query.entries()){
//     if(param[0]==='price'){
//       price=(+param[1]).toFixed(2);
//       price=+price;
//     }
//     else{
//     ingredients[param[0]] = +param[1];
//   }
//               // ['salad', '1']
//     //console.log(param[0] , param[1]);
//   }
//
//   this.setState({ingredients: ingredients , totalPrice: price});
//
// }

CheckoutCancelHandler = () => {
  this.props.history.goBack();
}
CheckoutContinueHandler = () => {
   this.props.history.replace('/checkout/contact-data');
}

  render(){
    let summary = (< Redirect  to='/' />);
    if(this.props.ings){
          const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
      summary =   <div>
                    {purchasedRedirect}
                  <CheckoutSummary
                  ingredients={this.props.ings}
                  canceled = {this.CheckoutCancelHandler}
                  continued = {this.CheckoutContinueHandler}
                  />
                  <Route
                  path={this.props.match.path + '/contact-data'}
                  //render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.state.totalPrice} {...props} />) }
                  component={ContactData}
                  />
               </div>
    }
    return summary ;
  }
}

const mapStoreToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
};

export default connect(mapStoreToProps)(Checkout);
