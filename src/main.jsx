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
      token="token 8896e1a15abebf5faf46714290d5110e5af574e8"
      config_id="64ab94d14078dbac86787aed"
      base_url="finflo-test-v2-uikte.ondigitalocean.app"
    />
  </Provider>
);
