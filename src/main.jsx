import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import App from './App'
import store from './utils/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App token = 'token af63832480aba330847810051478cb20f0ccd9ce' config_id = '64ab94d14078dbac86787aed' base_url ='finflo-test-v2-uikte.ondigitalocean.app' />
  </Provider>
)
