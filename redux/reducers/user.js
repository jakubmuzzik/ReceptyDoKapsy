import {
    USER_STATE_CHANGE,
    CLEAR_DATA
} from '../actionTypes'

const INITIAL_STATE = {
    currentUser: null,
    createdRecipes: [],
    savedRecipes: []
}

export const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser ? action.currentUser : INITIAL_STATE
            }
        case CLEAR_DATA:
            return INITIAL_STATE
        default:
            return state
    }
}