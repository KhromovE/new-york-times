import React from 'react'
import { renderRoutes, RouteConfig } from 'react-router-config'

import { ArticleDetails, Main } from './features/articles/pages'

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Main,
  },
  {
    path: '/article/:id',
    exact: true,
    component: ArticleDetails,
  },
]

export const Routes: React.FC = () => <>{renderRoutes(routes)}</>
