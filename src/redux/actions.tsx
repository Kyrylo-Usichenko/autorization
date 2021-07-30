import axios from "axios";
import { AsyncAction } from '../index';

import {
    ActionsTypeEnum,
    loginInformationType,
    userInformationDispatchType,
    userInformationType
} from "./types";


export function showContentToPage(data: string) {
    return {
        type: ActionsTypeEnum.SHOW_CONTENT,
        data
    }
}
export function authSuccess(data: string) {
    return {
        type: ActionsTypeEnum.AUTH_SUCCESS,
        data
    }
}
export function showContent(tokenData: string) {
    return async (dispatch: (arg: userInformationDispatchType) => userInformationType) => {
        let ShowUrl = `http://142.93.134.108:1111/me`
        const response = await axios.get(ShowUrl, {
            headers: {
                Authorization: `Bearer ${tokenData}`
            }
        })
        const resData = response.data.body.message
        dispatch(showContentToPage(resData))
        saveUserInfo(JSON.stringify(resData))
    }
}
export function login(email: string, password: string) {
    return async (dispatch: (arg: any) => loginInformationType) => {

        const authData = {
            email, password
        }

        let logUrl = `http://142.93.134.108:1111/login?email=${email}&password=${password}`

        await axios.post(logUrl).then((res) => {

            if (res.data.statusCode === 200) {
                saveToken(JSON.stringify(res.data.body.access_token), JSON.stringify(res.data.body.refresh_token))
                dispatch(showContent(res.data.body.access_token))
                dispatch(authSuccess(res.data))
            } else {
                alert(res.data.message || 'user not found')
            }
        })
    }
}

function saveToken(access_token: string, refresh_token: string) {
    sessionStorage.setItem('Access_tokenData', JSON.stringify(access_token));
    sessionStorage.setItem('Refresh_tokenData', JSON.stringify(refresh_token));
}
function saveUserInfo(data: string) {
    sessionStorage.setItem('userInfo', JSON.stringify(data));
}
function refreshToken(token: string) {
    return async () => {
        let refreshUrl = `http://142.93.134.108:1111/refresh`
        await axios.post(refreshUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                const tokenData = res.data.body
                saveToken(JSON.stringify(tokenData.access_token), JSON.stringify(tokenData.refresh_token) );
            }
        });
    }
}

axios.interceptors.response.use((response) => { return response },

    ( response:any) => {
        if (response.statusCode === 401 || response.statusCode === 1004) {
            refreshToken(window.sessionStorage.refresh_token)
            return response
        }
        return response
    });


axios.interceptors.request.use(
    (config: object) => {

        refreshToken(window.sessionStorage.refresh_token)
        return config;
    },
    error => {
        Promise.reject(error)
    });



export const registration = (email: string, password: string): AsyncAction => async (
  dispatch,
  getState,
  {mainApi}
  ) => {
    try {
        const { message } = await mainApi.signUp({email, password});
        alert(message);
    } catch (e) {
        console.log(e)
    }
};

