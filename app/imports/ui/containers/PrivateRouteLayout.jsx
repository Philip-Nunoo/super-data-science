import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

@withRouter
class PrivateRouteLayout extends React.Component {
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

            if (!logged) {
                props.history.push('/login');
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
            <div className="private-layout">
                <Route
                    path={path}
                    exact={exact}
                    component={component}
                    {...props}
                />
            </div>
        );
    }
}

PrivateRouteLayout.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.func]).isRequired
};

PrivateRouteLayout.defaultProps = {
    exact: false
};

export default PrivateRouteLayout;
