import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import propsTypes from "prop-types"
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const Createprofile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubUsername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: ""
    })
    const {
        company,
        website,
        location,
        status,
        skills,
        githubUsername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram

    } = formData
    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const onchange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        console.log(history)
        e.preventDefault();
        createProfile(formData, history)
    }

    return <div
    ><h1 className="large text-primary">
            Create Your Profile
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make your
            profile stand out
  </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <select name="status" value={status} onChange={e => onchange(e)} >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text"
                >Give us an idea of where you are at in your career</small
                >
            </div>
            <div className="form-group">
                <input type="text" placeholder="Company" name="company" value={company} onChange={e => onchange(e)} />
                <small className="form-text"
                >Could be your own company or one you work for</small
                >
            </div>
            <div className="form-group">
                <input type="text" placeholder="Website" name="website" value={website} onChange={e => onchange(e)} />
                <small className="form-text"
                >Could be your own or a company website</small
                >
            </div>
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => onchange(e)} />
                <small className="form-text"
                >City & state suggested (eg. Boston, MA)</small
                >
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onchange(e)} />
                <small className="form-text"
                >Please use comma separated values (eg.
        HTML,CSS,JavaScript,PHP)</small
                >
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubUsername"
                    value={githubUsername}
                    onChange={e => onchange(e)}
                />
                <small className="form-text"
                >If you want your latest repos and a Github link, include your
        username</small
                >
            </div>
            <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onchange(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
            </div>

            <div className="my-2">
                <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                    Add Social Network Links
                </button>
                <span>Optional</span>
                {displaySocialInputs ? <React.Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onchange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onchange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onchange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onchange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onchange(e)} />
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
                </React.Fragment> : null}
            </div>


        </form>
    </div>
}


Createprofile.propsTypes = {
    createProfile: propsTypes.func.isRequired
}


export default connect(null, { createProfile })(withRouter(Createprofile))

