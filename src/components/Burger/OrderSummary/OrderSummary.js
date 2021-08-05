import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

class  OrderSummary extends Component {

  render () {

    const ingredientSummary = Object.keys(this.props.ingredients)
    .map( igkey => {
      return (
        <li key={igkey}>
        <span style={{textTransform: 'captalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}
        </li>);
    });
   return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
        { ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p> Continue to Checkout?</p>
        <Button btnType={"Danger"} clicked={this.props.purchaseCancel}>CANCEL</Button>
        <Button btnType={"Success"} clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>

   );


}
}

export default OrderSummary;
