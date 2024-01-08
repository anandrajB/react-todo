import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider} from 'react-redux';

import App from './App';
import store from './utils/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App
      token="token 97b0cb4fe7321eb05bbd3cd6792cc4fb6a8a8401"
      config_id="64ab94d14078dbac86787aed"
      base_url="finflo-test-v2-uikte.ondigitalocean.app"
    />
  </Provider>
);
