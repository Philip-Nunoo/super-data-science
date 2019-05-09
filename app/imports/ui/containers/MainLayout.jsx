/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import AuthRouteLayout from './AuthRouteLayout';
import Navbar from '../components/Navbar';

const MainLayout = props => (
    <Router>
        <div>
            <Navbar {...props} />
            <Switch>
                <Route path="/" exact component={() => 'Home'} />
                <AuthRouteLayout path="/login" exact component={Login} />
                <AuthRouteLayout path="/signup" exact component={Signup} />
            </Switch>
        </div>
    </Router>
);

export default MainLayout;
