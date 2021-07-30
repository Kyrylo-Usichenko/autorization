import axios from "axios";
import { AsyncAction } from '../index';

import {
    ActionsTypeEnum,
    userInformationDispatchType,
    userInformationType
} from "./types";


export function showContentToPage(data: string) {
    return {
        type: ActionsTypeEnum.SHOW_CONTENT,
        data
    }
}
export function authSuccess(statusCode: number) {
    return {
        type: ActionsTypeEnum.AUTH_SUCCESS,
        statusCode
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
// export function login(email: string, password: string) {
//     return async (dispatch: (arg: any) => loginInformationType) => {
//
//         const authData = {
//             email, password
//         }
//
//         let logUrl = `http://142.93.134.108:1111/login?email=${email}&password=${password}`
//
//         await axios.post(logUrl).then((res) => {
//
//             if (res.data.statusCode === 200) {
//                 saveToken(JSON.stringify(res.data.body.access_token), JSON.stringify(res.data.body.refresh_token))
//                 dispatch(showContent(res.data.body.access_token))
//                 dispatch(authSuccess(res.data))
//             } else {
//                 alert(res.data.message || 'user not found')
//             }
//         })
//     }
// }
export const login = (email: string, password: string): AsyncAction => async (
    dispatch,
    getState,
    {mainApi}
) => {

    try {
        const response = await mainApi.login({email , password});
        const {statusCode,  body} = response;
        const {access_token, refresh_token} = body;

        if (statusCode === 200) {
            saveToken(JSON.stringify(access_token), JSON.stringify(refresh_token));
            dispatch(showContent(access_token));
            dispatch(authSuccess(statusCode))
        } else {
            alert( 'user not found');
        }
    } catch (e) {
        console.log(e)
    }
};

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

function saveToken(access_token: string, refresh_token: string) {
    sessionStorage.setItem('Access_tokenData', JSON.stringify(access_token));
    sessionStorage.setItem('Refresh_tokenData', JSON.stringify(refresh_token));
}
function saveUserInfo(data: string) {
    sessionStorage.setItem('userInfo', JSON.stringify(data));
}
export function refreshToken(token: string) {
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







