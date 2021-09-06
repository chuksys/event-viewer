import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from "./Auth"

export default function ProtectedRoute({ component: Component, ...rest}) {
    console.log(Auth.isAuthenticated())
    return (
        <Route 
            {...rest} 
            render={props => {
              if(Auth.isAuthenticated() === "true") {
                return <Component />;
              } else {
                return (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                );
              }
            }}   
        />
    )
}
