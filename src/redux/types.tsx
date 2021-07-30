
export enum ActionsTypeEnum {
    SHOW_CONTENT = 'SHOW-CONTENT',
    AUTH_SUCCESS = 'AUTH-SUCCESS',
}

export type ActionsType = AuthSuccessType | ShowContentToPageType

export type ShowContentToPageType = {
    type: ActionsTypeEnum.SHOW_CONTENT
    data: string
}

export type AuthSuccessType = {
    type: ActionsTypeEnum.AUTH_SUCCESS
    statusCode: number
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







