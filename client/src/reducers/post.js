import { post } from "request"
import { DELETE_POST, GET_POSTS,  POST_ERROR, UPDATE_LIKE, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from "../actions/types"

const initialState = {
    posts: [],
    post:null,
    loading:true,
    error:{}
}


export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){

        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],   //a single s can lead to an untraceable error
                loading:false
            }
        case GET_POSTS:
            return {
                ...state,
                posts:payload,
                loading:false
            } 

        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }

        case POST_ERROR:
            return {
                ...state,
                loading:false,
                error:payload
            }
        
        case UPDATE_LIKE:
            return {
                ...state,
                posts:state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes} : post),
                loading: false
            }

        case DELETE_POST:
            return {
                ...state,
                posts:state.posts.filter(post => post._id !== payload.id ),
                loading: false
            }

        case ADD_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post, 
                    comments:payload
                },
                loading: false
            }
        
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: state.post.comments.filter(comment => comment._id !== payload.id)},
                loading:false
            }

        default:
            return state
    }
}