import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import Routes from './Components/Routes/Routes';
import './theme/_global.scss';

const app = document.getElementById('app-root');

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  app
);
