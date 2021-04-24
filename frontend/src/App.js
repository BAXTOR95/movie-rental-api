import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import Movies from './containers/Movies/Movies';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const Activate = React.lazy(() => {
  return import('./containers/Auth/Activate/Activate');
});

const ResetPassword = React.lazy(() => {
  return import('./containers/Auth/ResetPassword/ResetPassword')
});

const ResetPasswordConfirm = React.lazy(() => {
  return import('./containers/Auth/ResetPasswordConfirm/ResetPasswordConfirm')
});

const styles = {
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
    'body': {
      margin: 0,
      height: '100%',
      backgroundColor: '#fff',
      fontFamily: 'sans-serif',
      overflowX: 'hidden',
    },
    'h1, h2': {
      margin: 0
    },
    'ul': {
      padding: 0,
      listStyle: 'none'
    },
    'App': {
      display: 'flex',
      alignItems: 'center',
      height: '100vh',
      overflow: 'hidden',
      margin: 0,
      fontFamily: 'system-ui'
    }
  }
};


const App = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [ onTryAutoSignup ]);

  let routes = (
    <Switch>
      <Route exact path="/" component={ Movies } />
      <Route exact path="/auth" render={ (props) => <Auth { ...props } /> } />
      <Route exact path="/logout" component={ Logout } />
      <Route exact path="/activate/:uid/:token" render={ (props) => <Activate { ...props } /> } />
      <Route exact path="/reset-password" render={ (props) => <ResetPassword { ...props } /> } />
      <Route exact path="/password/reset/confirm/:uid/:token" render={ (props) => <ResetPasswordConfirm { ...props } /> } />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/" component={ Movies } />
        <Route exact path="/auth" render={ (props) => <Auth { ...props } /> } />
        <Route exact path="/logout" component={ Logout } />
        <Route exact path="/activate/:uid/:token" render={ (props) => <Activate { ...props } /> } />
        <Route exact path="/reset-password" render={ (props) => <ResetPassword { ...props } /> } />
        <Route exact path="/password/reset/confirm/:uid/:token" render={ (props) => <ResetPasswordConfirm { ...props } /> } />
      </Switch>
    );
  }

  return (
    <Layout>
      <CssBaseline />
      <Suspense fallback={ <p>Loading...</p> }>{ routes }</Suspense>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
