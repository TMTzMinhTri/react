import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import propTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        const token = localStorage.getItem('token')
        let path = `/dashboard/${token}`
        return <Redirect to={path} />
    }
    return <section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Developer Connector</h1>
                <p className="lead">
                    Create a developer profile/portfolio, share posts and get help from
                    other developers
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-light">Login</Link>
                </div>
            </div>
        </div>
    </section>
}

Landing.propsTypes = {
    isAuthenticated: propTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth
})

export default connect(mapStateToProps)(Landing)