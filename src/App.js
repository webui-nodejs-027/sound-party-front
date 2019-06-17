import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import RouteWithSubRoutes from './components/RouteWithSubRoutes';
import config from './routerConfig';

function App() {
  const routes = config.map( (route, i) => {
    return (
      <RouteWithSubRoutes key={ i } { ...route }/>
    );
  });

  return (
      <Router>
        <CssBaseline />
        <Switch>
          { routes }
        </Switch>
      </Router>
  );
}


export default App;
