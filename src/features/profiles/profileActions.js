import {LISTEN_TO_CURRENT_USER_PROFILE} from "./profileConsts";


export const listenToCurrentProfile = (profile) => {
    return {
        type:LISTEN_TO_CURRENT_USER_PROFILE,
        payload: profile
    }
};


