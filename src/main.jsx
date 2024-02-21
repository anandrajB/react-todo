import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';

import App from './App';
import store from './utils/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App
      token="token edfe0367e4a9fbb727361857b5d1fd5014ccb17a"
      config_id="64ab94d14078dbac86787aed"
      base_url="finflo-test-v2-uikte.ondigitalocean.app"
      party_id="23"
    />
  </Provider>
);
