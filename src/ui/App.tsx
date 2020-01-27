import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AdminPage } from '../ui/views/Admin';
import Error from '../ui/views/Error';
import Front from '../ui/views/Front';
import { THEME } from './style/Theme';

const App = () => {
  return (
    <MuiThemeProvider theme={THEME}>
      <BrowserRouter>
        <Switch>
          // ordering matters here as react router matches based on the path
          name. most complex must be first.
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={Front} />
          <Route path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
