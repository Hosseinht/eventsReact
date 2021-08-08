import {
    LISTEN_TO_CURRENT_USER_PROFILE,
    LISTEN_TO_SELECTED_USER_PROFILE,
    LISTEN_TO_USER_PHOTOS,
    LISTEN_TO_USER_EVENTS
} from "./profileConsts";

const initialState = {
    currentUserProfile: null,
    selectedUserProfile: null,
    photos: [],
};


export const profileReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case LISTEN_TO_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: payload,
            }
        case LISTEN_TO_SELECTED_USER_PROFILE:
            return {
                ...state,
                selectedUserProfile: payload
            }
        case LISTEN_TO_USER_PHOTOS:
            return {
                ...state,
                photos: payload
            }
        default:
            return state
    }


};
