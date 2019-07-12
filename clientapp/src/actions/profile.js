import axios from 'axios'
import { setAlert } from "./alert";
import { PROFILE_ERROR, GET_PROFILE } from "./types";

//get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//create and update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const res = await axios.post('/api/profile', formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? "Profile updated" : "Profile created"))
        if (!edit) {
            history.push('/dashboard')
        }
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(element => {
                dispatch(setAlert(element.msg, 'danger'))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }

}