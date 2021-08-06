// it just store our firebase and firestore queries

import firebase from "../config/firebase";
import cuid from "cuid";

const db = firebase.firestore()

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    // exists is a property that we get back we've asked snapshots

    // if exist:
    const data = snapshot.data();

    // if the data type is timestamp then we want to covert it into a JS date
    for (const prop in data) {
        // loop over all the properties inside an object
        if (data.hasOwnProperty(prop)) {
            // we don't want to deal with non properties like prototype methods of the object
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate()
            }
        }
    }

    return {
        ...data,
        id: snapshot.id
    }
}


const listenToEventsFromFirestore = () => {
    return db.collection('events').orderBy('date');
    // get or listen to data. here we listen
};
export default listenToEventsFromFirestore;

export function listenToEventFromFirestore(eventId) {
    return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event) {
    return db.collection('events').add({
        ...event,
        hostedBy: 'Jane',
        hostPhotoURL: 'https://randomuser.me/api/portraits/women/21.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: 'Jane',
            photoURL: 'https://randomuser.me/api/portraits/women/21.jpg',
        })
    })
}

export function updateEventInFirestore(event) {
    return db.collection('events').doc(event.id).update(event)
}

export function deleteEventInFirestore(eventId) {
    return db.collection('events').doc(eventId).delete()
}

export function cancelEventToggle(event) {
    return db.collection('events').doc(event.id).update({
        isCancelled: !event.isCancelled
    })
}

export function setUserProfileData(user) {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    // we use set because we want to use user id as document id
}

export const getUserProfile = (userId) => {
    return db.collection('users').doc(userId)
}

export async function updateUserProfile(profile) {
    const user = firebase.auth().currentUser;
    try {
        if (user.displayName !== profile.displayName) {
            await user.updateProfile({
                displayName: profile.displayName
            })
        }
        return await db.collection('users').doc(user.uid).update(profile);

    } catch (error) {
        throw error
    }
}

// upload user profile photo
export async function updateUserProfilePhoto(downloadURL, filename) {
    const user = firebase.auth().currentUser;
    const userDocRef = db.collection('users').doc(user.uid)
    //userDocRef: we want to see if the user already got a profile photo
    try {
        const userDoc = await userDocRef.get();
        //get the data from user doc
        if (!userDoc.data().photoURL) {
            await db.collection('users').doc(user.uid).update({
                photoURL: downloadURL
            });
            // update user firebase auth profile
            await user.updateProfile({
                photoURL: downloadURL
            })
        }
        // add the photo to the user photo collection inside the document
        return await db.collection('users').doc(user.uid).collection('photos').add({
            name: filename,
            url: downloadURL
        })
    } catch (error) {
        throw error
    }
}