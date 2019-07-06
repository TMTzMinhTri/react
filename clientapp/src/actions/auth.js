import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types"
import { setAlert } from './alert'
import axios from 'axios'

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password })
    try {
        const res = await axios.post('/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(element => {
                dispatch(setAlert(element.msg, "danger"))
            });
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}