/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/Login';

const MainLayout = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={() => 'Home'} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </div>
    </Router>
);

export default MainLayout;
