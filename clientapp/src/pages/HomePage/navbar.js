import React from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import proptypes from 'prop-types'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a href="#!" onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>

        </ul>
    );
    const guestLink = (
        <ul>
            <li><a href="#!">Developers</a></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return <nav className="navbar bg-dark">
        <h1>
            <Link to="/">
                <i className="fas fa-code"></i> DevConnector
            </Link>
        </h1>
        {!loading && (
            <>
                {isAuthenticated ? authLinks : guestLink}
            </>
        )}

    </nav>
}
Navbar.propsTypes = {
    logout: proptypes.func.isRequired,
    auth: proptypes.object.isRequired
}

const mapdispatchtoprops = state => ({
    auth: state.auth
})

export default connect(mapdispatchtoprops, { logout })(Navbar)