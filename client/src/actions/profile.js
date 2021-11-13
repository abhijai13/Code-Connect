import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_ACCOUNT, CLEAR_PROFILE, GET_PROFILES, GET_REPOS } from "./types";

//GET Current user's proflle
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile')

        dispatch({
            type:GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//get all profiles
export const getProfileById = (userid) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userid}`)

        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


//get github repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)

        dispatch({
            type:GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


// Create/Update a profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers :{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config)

        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert(edit?'Profile Updated':'Profile Created', 'primary'))

        //redirecting in action is different. We cannot use <redirect> instead we use this
        if(!edit){
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//Add exp
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers :{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config)

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert('Experience added successfully', 'primary'))

        //redirecting in action is different. We cannot use <redirect> instead we use this
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


//Add edu
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers :{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config)

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert('Education added successfully', 'primary'))

        //redirecting in action is different. We cannot use <redirect> instead we use this
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


//Delete edu
export const deleteEducation = (id) => async dispatch => {
    try {

        const res = await axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert('Education deleted successfully', 'primary'))

        //redirecting in action is different. We cannot use <redirect> instead we use this
        // history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


//Delete edu
export const deleteExperience = (id) => async dispatch => {
    try {
        
        const res = await axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert('Experience deleted successfully', 'primary'))

        //redirecting in action is different. We cannot use <redirect> instead we use this
        // history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//Delete Account
export const deleteProfile = () => async dispatch => {
    if(window.confirm('Are you sure you want to DELETE your account? This can NOT be undone.')){
        try{
            const res = await axios.delete(`/api/profile`)

            dispatch({
                type: CLEAR_PROFILE,
            })

            dispatch({
                type: DELETE_ACCOUNT,
            })

            dispatch(setAlert('Your Account has been permanently deleted'))

        }catch(err){
            const errors = err.response.data.errors
            if(errors){
                errors.forEach(error => {
                    dispatch(setAlert(error.msg, 'danger'))
                });
            }
            dispatch({
                type:PROFILE_ERROR,
                payload: {msg:err.response.statusText, status: err.response.status}
            })
        }
    }
    
}