import { useContext } from 'react'
 import { Route, Redirect } from "react-router-dom";

import { AuthContext } from '../components/context/auth'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div>
      <Route {...rest} render={({ location }) => {
        return user ? <Component {...rest}/> : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }} />
      }}>
        {}
      </Route>
    </div>
  )
}