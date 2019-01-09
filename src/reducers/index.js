import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import login from './LoginReducer';
import authentication from "./authenticationReducer"
import header from "./headerReducer"
import api from "./APIReducer"

export default combineReducers({
  locale,
  login,
  authentication,
  header,
  api
});
