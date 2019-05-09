import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';

const Navbar = ({ logged, location: { pathname } }) => {
    const getNavLinkClass = path => {
        return pathname === path ? 'active' : '';
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-light fixed-top"
            id="mainNav"
        >
            <div className="container">
                <a className="navbar-brand" href="index.html">
                    SuperDataScience
                </a>
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
                        {logged && (
                            <React.Fragment>
                                <li
                                    className={`nav-item ${getNavLinkClass(
                                        '/blogs'
                                    )}`}
                                >
                                    <Link className="nav-link" to="/blogs">
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
                                    <Link className="nav-link" to="/">
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
    }).isRequired
};

Navbar.defaultProps = {
    logged: false
};

export default withRouter(Navbar);
