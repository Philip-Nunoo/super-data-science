import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import { Roles } from 'meteor/alanning:roles';

const Navbar = ({ logged, userId, location: { pathname } }) => {
    const getNavLinkClass = path => {
        return pathname === path ? 'active' : '';
    };

    const fixedTop = pathname === '/blog' || pathname === '/admin/users';
    const isAdmin = Roles.userIsInRole(userId, 'admin');

    return (
        <nav
            className={classnames(
                'fixed-top navbar navbar-expand-lg navbar-light',
                {
                    solid: fixedTop
                }
            )}
            id="mainNav"
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    SuperDataScience
                </Link>
                <button
                    className="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    Menu
                    <i className="fas fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item ${getNavLinkClass('/')}`}>
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {isAdmin && (
                            <li
                                className={`nav-item ${getNavLinkClass(
                                    '/admin/users'
                                )}`}
                            >
                                <Link className="nav-link" to="/admin/users">
                                    Users
                                </Link>
                            </li>
                        )}
                        {logged && (
                            <React.Fragment>
                                <li
                                    className={`nav-item ${getNavLinkClass(
                                        '/blog'
                                    )}`}
                                >
                                    <Link className="nav-link" to="/blog">
                                        Blogs
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="/"
                                        className="nav-link"
                                        onClick={() => Meteor.logout()}
                                    >
                                        Sign out
                                    </a>
                                </li>
                            </React.Fragment>
                        )}
                        {!logged && (
                            <React.Fragment>
                                <li
                                    className={`nav-item ${getNavLinkClass(
                                        '/login'
                                    )}`}
                                >
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li
                                    className={`nav-item ${getNavLinkClass(
                                        '/signup'
                                    )}`}
                                >
                                    <Link className="nav-link" to="/signup">
                                        Signup
                                    </Link>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logged: PropTypes.bool,
    location: PropTypes.shape({
        pathname: PropTypes.string
    }).isRequired,
    userId: PropTypes.string
};

Navbar.defaultProps = {
    logged: false,
    userId: null
};

export default withRouter(Navbar);
