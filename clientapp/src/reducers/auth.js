import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOG_OUT } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,

            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }


        default:
            return state
    }
}