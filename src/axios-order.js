import axios from 'axios';

const instance = axios.create({
  baseURL:'https://my-burger-app-bb031-default-rtdb.firebaseio.com/'
});

export default instance;
