import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'

ReactDOM.render(
  <BrowserRouter basename={process.env.BASE_URL}>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)
