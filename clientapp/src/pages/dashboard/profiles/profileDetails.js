import React, { useEffect } from 'react'
import proptypes from "prop-types"
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import * as Components from '../../../components'
import { getProfileByID } from "../../../actions/profile";

const ProfileDetails = ({ match, getProfileByID, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileByID(match.params.id)
    }, [getProfileByID])
    return <>
        {profile === null || loading
            ? <Components.Spinner />
            : <>
                <Link to="/profiles" className="btn btn-light">Back</Link>
                {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === profile.user_id && (
                        <Link to="/edit-profile" className="btn btn-dark"> Edit profile</Link>
                    )}
            </>}
    </>
}

ProfileDetails.propsTypes = {
    profile: proptypes.object.isRequired,
    auth: proptypes.object.isRequired,
    getProfileByID: proptypes.func.isRequired
}

const mapState = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapState, { getProfileByID })(ProfileDetails)