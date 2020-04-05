import ReactDOM from 'react-dom'
import React from 'react'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

import { App } from './app'

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
)
