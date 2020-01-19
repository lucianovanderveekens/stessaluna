import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import { connect } from 'react-redux';
import PrivateRoute from './route/PrivateRoute';
import NotFoundPage from './not-found/NotFoundPage';
import Helmet from 'react-helmet';
import history from './history/history';
import { fetchCurrentUser } from './auth/actions';
import PropTypes from 'prop-types';

const App = ({ loggedIn, fetchUser }) => {

  useEffect(() => {
    if (loggedIn) {
      fetchUser();
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Luna-app</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Fragment>
  );
};

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

const actionCreators = {
  fetchUser: fetchCurrentUser,
};

export default connect(mapStateToProps, actionCreators)(App);