import React, { useEffect } from 'react'
import { connect } from "react-redux";
import proptypes from "prop-types"
import { Link } from 'react-router-dom'

import { getCurrentProfile } from "../../actions/profile";
import { Spinner } from "../HomePage/Spinner";


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [])
    console.log(user)
    return loading && profile === null
        ? <Spinner />
        : <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>{' '}
                Welcome{' '}{user && user.name}
            </p>
            {profile !== null
                ? <>has</>
                : <>
                    <p>Please add some info</p>
                    <Link to="/create-profile" className="btn btn-primary">
                        create profile
                    </Link>
                </>
            }
        </>
}

Dashboard.propsTypes = {
    getCurrentProfile: proptypes.func.isRequired,
    auth: proptypes.object.isRequired,
    profile: proptypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)