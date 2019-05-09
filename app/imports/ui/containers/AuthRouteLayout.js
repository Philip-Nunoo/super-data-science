import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

class AuthRouteLayout extends React.Component {
    state = {
        loading: true
    };

    componentWillMount() {
        Tracker.autorun(() => {
            this.isLoggedIn(this.props);
        });
    }

    isLoggedIn(props) {
        if (!Meteor.loggingIn()) {
            const logged = !!Meteor.userId();

            if (logged) {
                props.history.push('/');
            } else {
                this.setState({ loading: false });
            }
        }
    }

    render() {
        const { path, exact, component, ...props } = this.props;
        const { loading } = this.state;

        if (loading) {
            return 'loading...';
        }

        return (
            <div className="auth-layout">
                <div className="container">
                    <div className="bloc">
                        <div className="Row">
                            <div className="col">
                                <Route
                                    path={path}
                                    exact={exact}
                                    component={component}
                                    {...props}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AuthRouteLayout.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.func]).isRequired
};

AuthRouteLayout.defaultProps = {
    exact: false
};

export default withRouter(AuthRouteLayout);
