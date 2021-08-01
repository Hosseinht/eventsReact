import firebase from "../config/firebase";


export function signInWithEmail(creds) {
    return  firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
    return  firebase.auth().signOut()
}

export async function registerInFirebase(creds) {
    // async because after we have registered the user then we can set some initials properties such as display name
    try {
        const result = await  firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password);
        return await result.user.updateProfile({
            displayName: creds.displayName
            // return? to use loading
        })
    }catch (error) {
        throw error
    }
}