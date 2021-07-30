import { ActionsType, ActionsTypeEnum } from "./types";

export type InitialStateTypes = {
    email: string,
    password: string,
    data: any,
    message: string | null,
}

const initialState: InitialStateTypes = {
    email: '',
    password: '',
    data: null,
    message: null,

}

function reducer(state= initialState, action: ActionsType) {
    switch (action.type) {
        case ActionsTypeEnum.AUTH_SUCCESS:
            return {
                ...state,
                data: action.statusCode,

            }

        case ActionsTypeEnum.SHOW_CONTENT:
            return {
                ...state,
                message: action.data
            }
        default:
            return state

    }
}

export default reducer
