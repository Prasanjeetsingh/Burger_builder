import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as orderActions from '../../../store/actions/index';

import {updatedObject , checkValidity} from '../../../shared/utillity';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
class ContactData extends Component {

  // constructor(props) {
  //   super(props);
  //   //this.state = {value: ''};
  //
  // //  this.handleChange = this.handleChange.bind(this);
  //
  // }

  state = {
      orderForm: {
          name: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your Name'
              },
              value: '',
              validation: {
                required:true
              },
              valid: false,
              touched: false

          },
          street: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Street'
              },
              value: '',
              validation: {
                required:true
              },
              valid: false,
              touched: false
          },
          zipCode: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'ZIP Code'
              },
              value: '',
              validation: {
                required:true,
                minLength: 6,
                maxLength: 6,
                isNumeric: true
              },
              valid: false,
              touched: false
          },
          country: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Country'
              },
              value: '',
              validation: {
                required:true
              },
              valid: false,
              touched: false
          },
          email: {
              elementType: 'input',
              elementConfig: {
                  type: 'email',
                  placeholder: 'Your E-Mail'
              },
              value: '',
              validation: {
                required:true,
                isEmail: true
              },
              valid: false,
              touched: false
          },
          deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                  options: [
                      {value: 'fastest', displayValue: 'Fastest'},
                      {value: 'cheapest', displayValue: 'Cheapest'}
                  ]
              },
              value: 'fastest',
              validation: {},
              valid: true
          }
      },
      formIsValid: false,
      loading: false
  }

OrderHandler = (event) => {
  event.preventDefault();
//  console.log(this.props.ingredients);

  const formData = {};
  for (let formElementIdentifier in this.state.orderForm){
    formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
  }
  const order = {
    ingredients: this.props.ings,
    price: this.props.price.toFixed(2),
    orderData: formData,
    userId: this.props.userId
  }

   this.props.onOrderBurger(order , this.props.token);
}



inputChangedHandler = (event , inputIdentifier) => {
  //console.log(event.target.value);


  const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier] , {
    value: event.target.value,
    valid: checkValidity(event.target.value , this.state.orderForm[inputIdentifier].validation),
    touched: true
    });
const updatedOrderForm = updatedObject(this.state.orderForm , {
    [inputIdentifier]: updatedFormElement
  });


   let formValidity = true;
   for(let inputIdentifier in updatedOrderForm){
      formValidity = updatedOrderForm[inputIdentifier].valid && formValidity ;
   }
   this.setState({orderForm: updatedOrderForm , formIsValid: formValidity});
   //console.log(this.state.formIsValid);
}


  render() {

    const formElementsArray = [];
    for(let key in this.state.orderForm )  {
      formElementsArray.push(
        {
          id:  key,
          config: this.state.orderForm[key]
        }
      );
    }

    let form = (
          <form onSubmit={this.OrderHandler}>

          {formElementsArray.map(formElement => (
            <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value= {formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.inputChangedHandler( event , formElement.id)}
            />
          ))}


          <Button  btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
          </form>
        );
        if(this.props.loading){
          form = (<Spinner />);
        }

    return (
      <div className = { classes.ContactData}>
      <h4>Enter your Contact Data</h4>
          {form}
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onOrderBurger: (orderData , token) => dispatch(orderActions.purchaseBurger(orderData , token))
  };
};

export default connect(mapStoreToProps , mapDispatchToProps)(withErrorHandler(ContactData , axios));
