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
      token="token 71dc1f1977db68a719b9550c1167b03e3b67d1c8"
      config_id="64ab94d14078dbac86787aed"
      base_url="finflo-test-v2-uikte.ondigitalocean.app"
      party_id="23"
    />
  </Provider>
);
