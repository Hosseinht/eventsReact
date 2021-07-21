import {
    SIGN_IN_USER,
    SIGN_OUT_USER
} from "./authConstants";

export const signInUser = (payload) => {
    return {
        type: SIGN_IN_USER,
        payload
        // if the properties inside of an object matches the name of the parameter we don't need to use payload: payload
    }
};

export const signOutUser = () => {
    return {
        type: SIGN_OUT_USER,

        // if the properties inside of an object matches the name of the parameter we don't need to use payload: payload
    }
};