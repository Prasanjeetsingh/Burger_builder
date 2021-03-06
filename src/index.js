import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import {createStore , compose , applyMiddleware ,combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import burgerBuilderReducer from './store/Reducers/burgerBuilder';
import orderReducer from './store/Reducers/order';
import authReducers from './store/Reducers/auth';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducers
})

const composeEnhancers =process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose ;

const store = createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
