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
      token="token 3b7afe94514d8e96d0986f34b737ea06fcf8431f"
      config_id="64ab94d14078dbac86787aed"
      base_url="finflo-test-v2-uikte.ondigitalocean.app"
      party_id="23"
    />
  </Provider>
);
