import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const MainLayout = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" component={() => 'Home'} />
            </Switch>
        </div>
    </Router>
);

export default MainLayout;
