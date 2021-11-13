import React, {Fragment,  useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { deleteProfile } from '../../actions/profile'

const Dashboard = (props) => {

    //Use this to when we need to call when the component loads/mounts
    useEffect(() => {
        props.getCurrentProfile()
    }, [])
    return (
        <div>
            {props.profile.loading && props.profile.profile === null ? <Spinner />:<Fragment>
                <h1 className = 'large'style = {{color:'#17a2b8'}}> Dashboard</h1>
                <p className = 'lead'>
                    <i className = "fas fa-user"></i>
                     {` `}Welcome { props.auth.user && props.auth.user.name}
                </p>
                {props.profile.profile !== null ? 
                    <Fragment> 
                        <DashboardActions/> 
                        <Experience experience={props.profile.profile.experience}/>
                        <Education education={props.profile.profile.education}/>

                        <button className='btn btn-danger' onClick={e => {
                            props.deleteProfile(props.deleteProfile)
                        }}>Delete My Account</button>
                    </Fragment> 
                : 
                    <Fragment> 
                        <p>You have not yet setup a profile. Please add some info</p>
                        <Link to= '/create-profile' className = "btn btn-primary my-1"> Create Profile</Link>
                    </Fragment> 
                }
            </Fragment> }
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, {getCurrentProfile, deleteProfile})(Dashboard)

