import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'



const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => !auth.isAuthenticated && !auth.loading
            ? <Redirect to="/login" />
            : <Component {...props} />}
    />
)

PrivateRoute.propsTypes = {
    auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)