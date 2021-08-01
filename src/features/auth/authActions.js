import {
    SIGN_IN_USER,
    SIGN_OUT_USER
} from "./authConstants";
import firebase from "../../app/config/firebase";


export const signInUser = (user) => {
    return {
        type: SIGN_IN_USER,
        payload: user
    }
};

export const verifyAuth = () => (dispatch) => {
    return firebase.auth().onAuthStateChanged(user => {
        if (user) {
            dispatch(signInUser(user))
        } else {
            dispatch(signOutUser())
        }
    })
    // we want to make sure that we're always verifying or listening t the Authentications State. so we need to dispatch
    //verifyAuth directly in our Store configuration
}

export const signOutUser = () => {
    return {
        type: SIGN_OUT_USER,

        // if the properties inside of an object matches the name of the parameter we don't need to use payload: payload
    }
};