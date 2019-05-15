import Auth from '../modules/auth/Auth'
import Dashboard from '../modules/dashboard/Dashboard'

/*
 * Errors
 */
import Errors from '../modules/error/Error'
import Errors_401 from '../modules/error/pages/Error401'
import Errors_404 from '../modules/error/pages/Error404'

export default [

  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/errors',
    name: 'errors',
    component: Errors,
    children: [
      {
        path: '401',
        name: 'error_401',
        component: Errors_401
      },
      {
        path: '404',
        name: 'error_404',
        component: Errors_404
      }
    ]
  }

]