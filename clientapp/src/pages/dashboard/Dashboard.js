import React, { useEffect } from 'react'
import { connect } from "react-redux";
import proptypes from "prop-types"
import { Link } from 'react-router-dom'

import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { Spinner } from "../HomePage/Spinner";
import DashboardAction from "./DashboardAction"

import Experience from "./Experience"
import Education from "./Education"

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return loading && profile === null
        ? <Spinner />
        : <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>{' '}
                Welcome{' '}{user && user.name}
            </p>
            {profile !== null
                ? <>
                    <DashboardAction />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-minus"> Delete my account</i>
                        </button>
                    </div>

                </>
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
    profile: proptypes.object.isRequired,
    deleteAccount: proptypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)