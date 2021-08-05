import {LISTEN_TO_CURRENT_USER_PROFILE, LISTEN_TO_SELECTED_USER_PROFILE} from "./profileConsts";


export const listenToCurrentUserProfile = (profile) => {
    return {
        type:LISTEN_TO_CURRENT_USER_PROFILE,
        payload: profile
    }
};


export const listenToSelectedProfile = (profile) => {
    return {
        type:LISTEN_TO_SELECTED_USER_PROFILE,
        payload: profile
    }
};