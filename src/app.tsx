import React from 'react'
import { hot } from 'react-hot-loader'
import { Normalize } from 'styled-normalize'

import { GlobalStyles } from './global-styles'
import { Routes } from './routes'

declare const module: any

const AppComponent: React.FC = () => (
  <>
    <GlobalStyles />
    <Normalize />
    <Routes />
  </>
)

export const App = hot(module)(AppComponent)
