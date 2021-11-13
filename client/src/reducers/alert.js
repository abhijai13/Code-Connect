import {SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = []

//checks which type of alert the new alert is and then operate on initial state
export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){

        //adds a new alert
        case SET_ALERT:
            return [...state, payload]
        
        //removes an alert
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload)
        default:
            return state
    }
}