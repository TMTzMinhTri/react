import React from 'react'
import propsTypes from "prop-types"
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
    alerts !== null && alerts.length > 0 && alerts.map(item =>
        <div key={item.id} className={`alert alert-${item.alertType}`}>
            {item.msg}
        </div>
    )

Alert.propsTypes = {
    alerts: propsTypes.array.isRequired
}
const mapdispatchtoprops = state => ({
    alerts: state.alert
})

export default connect(mapdispatchtoprops)(Alert)

