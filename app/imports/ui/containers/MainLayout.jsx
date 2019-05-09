/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import AuthRouteLayout from './AuthRouteLayout';
import PrivateRouteLayout from './PrivateRouteLayout';
import Navbar from '../components/Navbar';
import Blogs from '../pages/Blogs/Blogs';
import Blog from '../pages/Blog/Blog';
import Home from '../pages/Home/Home';
import Users from '../pages/Users/Users';

class MainLayout extends React.PureComponent {
    state = {
        loading: true,
        logged: false
    };

    componentWillMount() {
        Tracker.autorun(() => {
            this.isLoggedIn(this.props);
        });
    }

    isLoggedIn() {
        if (!Meteor.loggingIn()) {
            const logged = !!Meteor.userId();
            this.setState({
                loading: false,
                userId: Meteor.userId(),
                logged
            });
        }
    }

    render() {
        const { loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <Router>
                <React.Fragment>
                    <Navbar {...this.state} />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <PrivateRouteLayout
                            path="/blog"
                            exact
                            component={Blogs}
                            {...this.state}
                        />
                        <PrivateRouteLayout
                            path="/blog/:id"
                            exact
                            component={Blog}
                            {...this.state}
                        />
                        <AuthRouteLayout
                            path="/login"
                            exact
                            component={Login}
                            {...this.state}
                        />
                        <AuthRouteLayout
                            path="/signup"
                            exact
                            component={Signup}
                            {...this.state}
                        />
                        <PrivateRouteLayout
                            path="/admin/users"
                            exact
                            component={Users}
                            {...this.state}
                        />
                        <Route component={() => 'Not found'} />
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}

export default MainLayout;
