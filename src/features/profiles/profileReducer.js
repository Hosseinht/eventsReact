import {LISTEN_TO_CURRENT_USER_PROFILE} from "./profileConsts";

const initialState = {
    currentUserProfile: null
}

export const profileReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case LISTEN_TO_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: payload
            }
        default:
            return state
    }


};
