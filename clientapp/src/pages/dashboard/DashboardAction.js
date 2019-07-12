import React from 'react'
import { Link } from "react-router-dom";
import propsTypes from "prop-types"
import { connect } from "react-redux";

const DashboardAction = () => {
    return <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
        <Link to="/add-experience" className="btn btn-light">
            <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
        <Link to="/add-education" className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary"></i> Add Education
            </Link>
    </div>
}

// Alert.propsTypes = {
//     alerts: propsTypes.array.isRequired
// }
// const mapdispatchtoprops = state => ({
//     alerts: state.alert
// })

export default connect(null)(DashboardAction)

