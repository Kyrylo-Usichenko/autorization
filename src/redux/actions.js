import axios from "axios";
import {AUTH_SUCCESS, SHOW_CONTENT, UPDATE_NEW_EMAIL, UPDATE_NEW_PASSWORD} from "./types";


export const updateEmailActionCreator = value => ({type: UPDATE_NEW_EMAIL, value})
export const updatePasswordActionCreator = value => ({type: UPDATE_NEW_PASSWORD, value})

function saveToken(access_token, refresh_token) {

    sessionStorage.setItem('Access_tokenData', JSON.stringify(access_token ));
    sessionStorage.setItem('Refresh_tokenData', JSON.stringify(refresh_token));
}

function saveUserInfo(data) {
    sessionStorage.setItem('userInfo', JSON.stringify(data));
}

export function authSuccess(data) {
    return {
        type: AUTH_SUCCESS,
        data
    }
}

export function showContentToPage(data) {
    return {
        type: SHOW_CONTENT,
        data
    }
}

export function showContent(data) {
    return async (dispatch) => {
        let ShowUrl = `http://142.93.134.108:1111/me`
        const response = await axios.get(ShowUrl, {
            headers: {
                Authorization: `Bearer ${data.body.access_token}`
            }
        })
        const resData = response.data
        dispatch(showContentToPage(resData.body.message))
        saveUserInfo(JSON.stringify(resData.body.message))
    }
}
function refreshToken(token) {
    return async () => {
        let refreshUrl = `http://142.93.134.108:1111/refresh`
        await axios.post(refreshUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                const tokenData = res.data.body
                saveToken(JSON.stringify(tokenData));
            }
        });
    }
}
axios.interceptors.response.use((response) => {

    return response
}, function (error, token, response) {
    if (error.response.statusCode === 401 || error.response.statusCode === 1004) {
        refreshToken(window.sessionStorage.refresh_token)
        return response
    }
    return response
});

axios.interceptors.request.use(
    (config, token) => {

        refreshToken(window.sessionStorage.refresh_token)
        return config;
    },
    error => {
        Promise.reject(error)
    });

export function login(email, password) {

    return async (dispatch) => {
        const authData = {
            email, password
        }

        let logUrl = `http://142.93.134.108:1111/login?email=${email}&password=${password}`

        await axios.post(logUrl, authData).then((res) => {

            if (res.data.statusCode === 200) {
                saveToken(JSON.stringify(res.data.body.access_token),JSON.stringify( res.data.body.refresh_token))
                dispatch(showContent(res.data))
                dispatch(authSuccess(res.data))
            } else {
                alert(res.data.message || 'user not found')
            }
        })

    }
}

export function registration(email, password) {
    return async () => {
        const authData = {
            email, password,
        }
        let regUrl = 'http://142.93.134.108:1111/sign_up'

        const response = await axios.post(regUrl, authData)
        const data = response.data
        alert(data.message)

    }
}