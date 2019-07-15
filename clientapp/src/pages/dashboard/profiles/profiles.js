import React, { useEffect } from 'react'
import proptypes from "prop-types"
import { connect } from "react-redux";
import * as Components from '../../../components'
import { getAllProfile } from "../../../actions/profile";
import ProfileItem from './profileItem'

const Profiles = ({ getAllProfile, profile: { profiles, loading } }) => {
    useEffect(() => {
        getAllProfile()
    }, [getAllProfile])


    return loading
        ? <Components.Spinner />
        : <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i>
                Browse and connect with developers
        </p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4> No profiles found ...</h4>}
            </div>
        </>
}

Profiles.propsTypes = {
    getAllProfile: proptypes.func.isRequired,
    profile: proptypes.object.isRequired
}

const mapState = state => ({
    profile: state.profile
})

export default connect(mapState, { getAllProfile })(Profiles)