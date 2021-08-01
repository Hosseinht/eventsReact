import {
    SIGN_IN_USER,
    SIGN_OUT_USER
} from "./authConstants";
import firebase from "../../app/config/firebase";


export const signInUser = (creds) => async (dispatch) => {
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
        dispatch({type: SIGN_IN_USER, payload:result.user})
    } catch (error) {
        throw error
        // because this is a form that we're using to login the user.
        // then we're going to throw the error we get back to the form itself
    }
};

export const signOutUser = () => {
    return {
        type: SIGN_OUT_USER,

        // if the properties inside of an object matches the name of the parameter we don't need to use payload: payload
    }
};