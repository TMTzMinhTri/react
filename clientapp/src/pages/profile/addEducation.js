import React, { useState } from 'react'
import { connect } from "react-redux";
import proptypes from "prop-types"
import { Link } from 'react-router-dom'

import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {


    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldOfStudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    })
    const [toDateDisable, toggleDisable] = useState(false)

    const { school, degree, fieldOfStudy, current, description, to, from } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    return <>
        <h1 class="large text-primary">
            Add your education
        </h1>
        <p class="lead">
            <i class="fas fa-code-branch"></i> Add any school
            positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={e => {
            e.preventDefault()
            addEducation(formData, history)
        }}>
            <div class="form-group">
                <input type="text" placeholder="* School" name="school" required value={school} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
                <input type="text" placeholder="* fieldOfStudy" name="fieldOfStudy" required value={fieldOfStudy} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
                <input type="text" placeholder="* degree" name="degree" required value={degree} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
                <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                    setFormData({ ...formData, current: !current })
                    toggleDisable(!toDateDisable)
                }} />
                    {" "}Current Job</p>
            </div>
            <div class="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisable ? 'disable' : ""} />
            </div>
            <div class="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description} onChange={e => onChange(e)}
                ></textarea>
            </div>
            <input type="submit" class="btn btn-primary my-1" />
            <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </>
}

AddEducation.propsTypes = {
    addEducation: proptypes.func.isRequired
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, { addEducation })(AddEducation)