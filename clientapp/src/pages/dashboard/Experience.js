import * as React from 'react'
import proptypes from "prop-types"
import { connect } from "react-redux";
import Moment from "react-moment";


const Experience = ({ experience }) => {
    const experiences = experience.map(item => (
        <tr key={item._id}>
            <td>{item.company}</td>
            <td>{item.title}</td>
            <td>
                <Moment format="DD/MM/YYYY">{item.from}</Moment> - {item.to === null ? "Now" : <Moment format="DD/MM/YYYY">{item.to}</Moment>}
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))
    return (
        <>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Year</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </>
    )
}
Experience.propsTypes = {
    experience: proptypes.array.isRequired
}

export default Experience