/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import AuthRouteLayout from './AuthRouteLayout';
import PrivateRouteLayout from './PrivateRouteLayout';
import Blogs from '../pages/Blogs/Blogs';
import Blog from '../pages/Blog/Blog';

const MainLayout = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={() => 'Home'} />
                <PrivateRouteLayout path="/blog" exact component={Blogs} />
                <PrivateRouteLayout path="/blog/:id" exact component={Blog} />
                <AuthRouteLayout path="/login" exact component={Login} />
                <AuthRouteLayout path="/signup" exact component={Signup} />
                <Route component={() => 'Not found'} />
            </Switch>
        </div>
    </Router>
);

export default MainLayout;
