import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className = {`alert alert-${alert.alertType}`}> 
        {alert.msg}
    </div>
))

//alert array as properties. it is the same one as the initial state in reducers/alert.js
Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

//state has all the states like alert, auth , etc declared in different reducers
const mapStateToProps = state => ({
    alerts: state.alert
})

//mapStateToProps recieve state from redux state and the map it to alerts in object. 
//this is then passed into props of the connected component
export default connect(mapStateToProps)(Alert)
