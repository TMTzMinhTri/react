import * as React from 'react'
import proptypes from "prop-types"
import { connect } from "react-redux";
import Moment from "react-moment";


const Education = ({ education }) => {
    const educations = education.map(item => (
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
            <h2 className="my-2">Education</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </>
    )
}
Education.propsTypes = {
    education: proptypes.array.isRequired
}

export default Education