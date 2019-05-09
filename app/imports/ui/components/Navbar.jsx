import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const Navbar = ({ location: { pathname } }) => {
    const getNavLinkClass = path => (pathname === path ? 'active' : '');
    const loggedIn = !!Meteor.userId();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Navbar w/ text
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${getNavLinkClass('/')}`}>
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Blogs
                            </a>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <ul className="navbar-nav mr-auto">
                            {!loggedIn && (
                                <Fragment>
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
                                </Fragment>
                            )}
                        </ul>
                    </span>
                </div>
            </nav>
        </div>
    );
};

export default withRouter(Navbar);
