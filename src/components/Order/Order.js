import React from 'react';
import classes from './Order.css';
const order = (props) =>{


// const newIngredients =[];
// for(let ingname in props.ingredients){
//   newIngredients.push(
//     {
//       name: ingname,
//       amount: props.ingredients[ingname]
//     }
//   );
// }
//
// const ingredientOutput = newIngredients.map( ig => {
//   return (
//     <span
//         style={{
//             textTransform: 'capitalize',
//             display: 'inline-block',
//             margin: '0 8px',
//             border: '1px solid #ccc',
//             padding: '5px'
//             }}
//         key={ig.name}>
//         {ig.name} ({ig.amount})
//         </span>
//   )
// });

const ningredients = Object.keys(props.ingredients).map(ig => {
  return (
    <span
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
        key={ig}>
        {ig} ({props.ingredients[ig]})
        </span>
)
})


  return (
    //console.log(newIngredients);
   <div className={classes.Order}>
      <p>Ingredients: {ningredients}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
   </div>

);
}

export default order ;
