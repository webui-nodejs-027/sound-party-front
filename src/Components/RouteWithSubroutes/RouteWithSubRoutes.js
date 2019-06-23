import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const RouteWithSubRoutes = (route) => {
  const auth = route.noredirect ? true : route.parentData.auth;
  return (
    <Route
      path={route.path}
      render={props => {
        return auth ? <route.component
          { ...props }
          { ...route.parentData }
          redirect={ route.redirect }
          routes={ route.routes }
        /> : <Redirect to='/' />
      }}
    />
  );
};

export default RouteWithSubRoutes;
