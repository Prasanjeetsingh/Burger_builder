import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
}
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  }
}
export const fetchIngredientsFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}


export const initIngridents = () => {
  return dispatch => {
    axios.get('https://my-burger-app-bb031-default-rtdb.firebaseio.com/ingredients.json')
    .then(response => {
    //  console.log(response.data);
      dispatch(setIngredients(response.data));

    })
    .catch(error => {
           dispatch(fetchIngredientsFailed());
    });
  };
}
