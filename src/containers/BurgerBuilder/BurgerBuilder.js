import React , {Component} from 'react';

import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
//src\components\UI\Spinner\Spinner.js
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



export class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing:false,
  }

componentDidMount() {
   //console.log(this.props);
   this.props.onInitIngredients();
}

  updatePurchaseState (ingredients) {

    const sum = Object.keys(ingredients)
      .map( igkey => {
        return ingredients[igkey];
      } )
      .reduce((sum ,el ) => {
        return sum + el;
      } , 0);

      return sum > 0;
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
    this.setState({purchasing: true});
  }
   this.props.onSetAuthRedirectPath('/checkout');
   this.props.history.push('/auth');
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }
  purchaseContinueHandler = () => {

    // this.setState({loading:true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Prasanjeet Singh',
    //     address: {
    //       street: 'Gali no 11',
    //       pincode: '845315',
    //       country: 'India'
    //     },
    //     email: 'prasanjeetsingh079@gmail.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json' , order)
    // .then( response => {
    //   this.setState({loading:false , purchasing:false});
    // })
    // .catch(error => {
    //   this.setState({loading:false, purchasing:false});
    // });


//we don't need it due to redux;


        //
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) );
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString =queryParams.join('&');
        // console.log(queryParams , queryString);

      //   this.props.history.push({
      //     pathname: '/checkout',
      //   search: '?' + queryString
      // });
      this.props.onPurchaseInit();
      this.props.history.push('/checkout');
  }




  render () {

    const disabledInfo = {
      ...this.props.ings
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key]<=0 ;
    }

    let orderSummary =  null;

    let burger = this.props.error ? <p> Ingredient can't be loaded ....!</p> : <Spinner/> ;
    if(this.props.ings){
      burger = (
        <Aux>
        <Burger ingredients= {this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled = {disabledInfo}
          purchasable = {this.updatePurchaseState(this.props.ings)}
          price= {this.props.price}
          ordered={this.purchaseHandler}
          isAuth={this.props.isAuthenticated}
        />
        </Aux>
      );
      orderSummary = <OrderSummary
              ingredients={this.props.ings}
              purchaseCancel={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
              price={this.props.price}
              />;
    }
    return (
      <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
      </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngridents()),
        onPurchaseInit: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
