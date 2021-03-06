import React from 'react'
import { Redirect } from 'react-router-dom'
import Layout  from '../Layout'

export const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Layout {...rest} render={
      (props) => {
        if (1 == 2) {
          return <Component {...props}/>
        }
        else {
          return <Redirect to={
            {
              pathname: "/auth",
              state: {
                from: props.location
              }
            }
          }/>
        }
      }
    }/>
  )
}
