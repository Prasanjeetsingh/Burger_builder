import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../../shared/utillity';
// state = {
//   ingredients: null,
//   totalPrice: 4,
//   purchasable: false,
//   purchasing:false,
//   loading: false,
//   error: false
// }

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredients = (state , action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updatedObject(state.ingredients , updatedIngredient );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice:  state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
  return updatedObject(state , updatedState);
}

const removeIngredients = (state , action) => {
  const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedIngs = updatedObject(state.ingredients , updatedIng );
  const updateState = {
    ingredients: updatedIngs,
    totalPrice:  state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  }
  return updatedObject(state , updateState);
}

const setIngredients = (state , action) => {
  return updatedObject(state , {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 4
  });
}

const reducer = (state = initialState , action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT:
        return addIngredients(state , action);
    case actionTypes.REMOVE_INGREDIENT:
        return removeIngredients(state , action);
    case actionTypes.SET_INGREDIENTS:
        return setIngredients(state , action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
        return updatedObject(state , {  error: true});
    default:
      return state ;
  }

};

export default reducer;
