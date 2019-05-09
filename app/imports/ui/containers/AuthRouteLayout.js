import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const AuthRouteLayout = ({ path, exact, component, ...props }) => {
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
};

AuthRouteLayout.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.func]).isRequired
};

AuthRouteLayout.defaultProps = {
    exact: false
};

export default AuthRouteLayout;
