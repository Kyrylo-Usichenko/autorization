export const UPDATE_NEW_EMAIL = 'UPDATE-NEW-EMAIL'
export const UPDATE_NEW_PASSWORD = 'UPDATE-NEW-PASSWORD'
export const SHOW_CONTENT = 'SHOW-CONTENT'
export const AUTH_SUCCESS = 'AUTH-SUCCESS'

export type ActionsType = UpdateEmailActionCreatorType | UpdatePasswordActionCreatorType | AuthSuccessType | ShowContentToPageType
export type UpdateEmailActionCreatorType = {
    type: typeof UPDATE_NEW_EMAIL
    value: string
}
export type UpdatePasswordActionCreatorType = {
    type: typeof UPDATE_NEW_PASSWORD
    value: string
}
export type ShowContentToPageType = {
    type: typeof SHOW_CONTENT
    data: string
}
export type AuthSuccessType = {
    type: typeof AUTH_SUCCESS
    data: string
}
export type userInformationType = {
    body:BodyType
    statusCode: number
}
export type userInformationDispatchType = {
    type: string
    data: string
}
export type loginInformationType = {
    body: loginBodyType
    statusCode: number
}

type BodyType = {
    message:string
    status:string
}
type loginBodyType = {
    access_token:string
    refresh_token:string
}







