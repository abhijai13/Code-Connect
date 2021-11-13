import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile : {
    status, 
    company, 
    location,
    website,
    social,
    user : { name, avatar}
}}) => {
    return (
        <div class="profile-top p-2" style = {{backgroundColor: '#17a2b8'}}>
          <img
            class="round-img my-1"
            src={avatar}
            alt=""
          />

          <h1 class="large" style={{color:'white'}}>{name}</h1>
          <p class="lead" style={{color:'white'}}>{status} {company && <span> at {company} </span>}</p>
          <p style={{color:'white'}}>{location && <span> {location}</span>}</p>
          <div class="icons my-1">
            {
                website && (
                <a href={website} target='_blank' rel='noopener noreferrer'>
                <i class="fas fa-globe fa-2x"></i>
                </a>)
            }

            {
                social && social.twitter && (
                    <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
                    <i class="fab fa-twitter fa-2x"></i>
                    </a>
                )
            }

            {
                social && social.facebook && (
                    <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
                    <i class="fab fa-facebook fa-2x"></i>
                    </a>
                )
            }
            
            {
                social && social.linkedin && (
                    <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
                    <i class="fab fa-linkedin fa-2x"></i>
                    </a>
                )
            }
            
            {
                social && social.instagram && (
                    <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
                    <i class="fab fa-instagram fa-2x"></i>
                    </a>
                )
            }
            
            
          </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileTop
