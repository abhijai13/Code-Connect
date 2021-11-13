import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = props => {
    useEffect(() => {
        props.getProfileById(props.match.params.id) //the id in url can be accessed by this
    }, [props.getProfileById, props.match.params.id])
    return (
        <Fragment>
            {props.profile.profile === null || props.profile.loading ? <Spinner/> : <Fragment>
                <Link to='/profiles' className='btn btn-light' >Back to profiles</Link>
                {props.auth.isAuthenticated && props.auth.loading === false && props.auth.user._id === props.profile.profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
                <div class="profile-grid my-1">
                    <ProfileTop profile={props.profile.profile}/>
                    <ProfileAbout profile={props.profile.profile}/>
                    <div className='profile-exp bg-white p-2'>
                        <h2 style = {{color:'#17a2b8'}}>Experience</h2>
                        {props.profile.profile.experience.length > 0 ? (<Fragment>
                            {props.profile.profile.experience.map(experience => (
                                <ProfileExperience  key={experience._id} experience = {experience}/>
                            ))}
                        </Fragment>) : (<h4>No Experience Credentials </h4>)}
                    </div>
                    <div class="profile-edu bg-white p-2" style={{border: '1px dotted grey'}}>
                        <h2 style = {{color:'#17a2b8'}}>Education</h2>
                        {props.profile.profile.education.length > 0 ? (<Fragment>
                            {props.profile.profile.education.map(education => (
                                <ProfileEducation  key={education._id} education = {education}/>
                            ))}
                        </Fragment>) : (<h4>No Education Credentials </h4>)}
                    </div>
                    {props.profile.profile.githubusername && (
                        <ProfileGithub username={props.profile.profile.githubusername}/>  
                    )}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile)
