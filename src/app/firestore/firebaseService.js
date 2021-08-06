import firebase from "../config/firebase";
import {setUserProfileData} from "./firestoreService";
import {toast} from "react-toastify";


export function signInWithEmail(creds) {
    return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
    return firebase.auth().signOut()
}

export async function registerInFirebase(creds) {
    // async because after we have registered the user then we can set some initials properties such as display name
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password);
        await result.user.updateProfile({
            displayName: creds.displayName
            // return? to use loading
        });
        return await setUserProfileData(result.user)
    } catch (error) {
        throw error
    }
}

export async function socialLogin(selectedProvider) {
    let provider;
    if (selectedProvider === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider()
    }
    if (selectedProvider === 'google') {
        provider = new firebase.auth.GoogleAuthProvider()
    }
    try {
        const result = await firebase.auth().signInWithPopup(provider)
        console.log(result)
        if (result.additionalUserInfo.isNewUser) {
            await setUserProfileData(result.user)
        }
    } catch (error) {
        toast.error = error.message
    }
}

export function updateUserPassword(creds) {
    const user = firebase.auth().currentUser;
    // this is synchronous. this is not something we need to go up to Firebase and retrieve back from the cloude
    // this is stored in local storage
    return user.updatePassword(creds.newPassword1)

}

// Upload Image
export function uploadToFirebaseStorage(file, filename) {
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref()
    return storageRef.child(`${user.uid}/user_images/${filename}`).put(file)
    // put, upload the file
}

export function deleteFromFirebaseStorage(filename) {
    const userUid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref()
    // get a reference to the individual photo itself
    const photoRef = storageRef.child(`${userUid}/user_images/${filename}`)
    return photoRef.delete()
    // this part delete from storage but we need to delete from the firebase database. Next:firestoreServices
}