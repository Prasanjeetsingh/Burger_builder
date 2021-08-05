import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return{
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token , userId) => {
  return{
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return{
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('experationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const chectAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}


export const auth = (email , password , isSignup) => {
   return dispatch => {
     dispatch(authStart());
     const authData = {
       email: email,
       password: password,
       returnSecureToken: true
     }
     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfEQSesD-K6J-gW0UiZUIY7Mk6w9RVBwg';
     if(!isSignup){
       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfEQSesD-K6J-gW0UiZUIY7Mk6w9RVBwg';
     }
     axios.post(url, authData)
     .then(res => {
       //console.log(res);
       const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
       localStorage.setItem('token' , res.data.idToken);
       localStorage.setItem('experationDate' , expirationDate);
       localStorage.setItem('userId' , res.data.localId);
       dispatch(authSuccess(res.data.idToken , res.data.localId));
       dispatch(chectAuthTimeout(res.data.expiresIn)) ;
     })
     .catch(error => {
       console.log(error);
       dispatch(authFail(error.response.data.error));
     })
   }
};

export const setAuthRedirectPath = (path) => {
  return{
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token){
      dispatch(logout());
    }
    else{
      const experationDate =new Date(localStorage.getItem('experationDate'));
      if(experationDate <= new Date()){
        dispatch(logout());
      }
      else{
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token , userId ));
        dispatch(chectAuthTimeout((experationDate.getTime() - new Date().getTime())/1000));
      }
    }
  }
}
