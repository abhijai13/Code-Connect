import axios from 'axios'
import {setAlert} from './alert'
import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKE, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from "./types";


//Get posts
export const getPosts = () => async dispatch => {

    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//Add Like/ remove like
export const addLike = (postId) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/like/${postId}`)

        dispatch({
            type: UPDATE_LIKE, 
            payload: {id: postId, likes: res.data}
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type:POST_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


//Add Delete Post
export const deletePost = (postId) => async dispatch => {

    try {
        const res = await axios.delete(`/api/posts/${postId}`)

        dispatch({
            type: DELETE_POST, 
            payload: {id: postId}
        })

        dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
        console.log(err)
        dispatch({
            type:POST_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


//Add Add Post
export const addPost = (formData) => async dispatch => {

    try {

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const res = await axios.post(`/api/posts`,formData, config)

        dispatch({
            type: ADD_POST, 
            payload: res.data
        })

        dispatch(setAlert('Post Added', 'success'))
    } catch (err) {
        console.log(err)

        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


//Get post
export const getPost = (id) => async dispatch => {

    try {
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


//Add Comment
export const addComment = (postId, formData) => async dispatch => {

    try {

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        console.log(formData)
        const res = await axios.post(`/api/posts/comment/${postId}`,formData, config)

        dispatch({
            type: ADD_COMMENT, 
            payload: res.data
        })

        dispatch(setAlert('Comment Added', 'success'))
    } catch (err) {
        console.log(err)

        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}


// Delete Comment
export const deleteComment = (postId ,commentId) => async dispatch => {

    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

        console.log(1)
        dispatch({
            type: REMOVE_COMMENT, 
            payload: {id: commentId}
        })

        dispatch(setAlert('Comment removed', 'success'))
    } catch (err) {
        console.log(1)
        // console.log(err)
        dispatch({
            type:POST_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}