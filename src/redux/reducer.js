import {AUTH_SUCCESS, SHOW_CONTENT, UPDATE_NEW_EMAIL, UPDATE_NEW_PASSWORD} from "./types";

const initialState = {
    email: '',
    password: '',
    data:null,
    message:null,

}


function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, data: action.data,
            }
        case UPDATE_NEW_EMAIL:
            return {
                ...state,
                email: action.value
            }

        case UPDATE_NEW_PASSWORD:
            return {
                ...state,
                password: action.value
            }

        case SHOW_CONTENT:
            return {
                ...state, message: action.data
            }
        default:
            return state

    }
}



export default reducer