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
    const user = firebase.auth().currentUser
    return db.collection('events').add({
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: user.photoURL || null,
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null
        }),
        // in firestore we can't query an array of objects

        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
        // now we are able to query so that we can find which vents are user with that specific uid is attending
        // we just can query simple string base arrays in Firestore
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

// get photos from firestore
export function getUserPhotos(userUid) {
    return db.collection('users').doc(userUid).collection('photos')
}

export async function setMainPhoto(photo) {
    const user = firebase.auth().currentUser;
    try {
        await db.collection('users').doc(user.uid).update({
            photoURL: photo.url
        })
        // update the auth part of the user profile data
        return await user.updateProfile({
            photoURL: photo.url
        })
    } catch (error) {
        throw error
    }
}

export function deletePhotosFromCollection(photoId) {
    const userUid = firebase.auth().currentUser.uid;
    return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete()
}

export function addUserAttendance(event) {
    const user = firebase.auth().currentUser
    return db.collection('events').doc(event.id).update({
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null
        }),
        // in firestore we can't query an array of objects

        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
    })
}

// because we need to get an event document we're going to need to make this an asysnc function
export async function cancelUserAttendance(event) {
    const user = firebase.auth().currentUser
    try {
        const eventDoc = await db.collection('events').doc(event.id).get()
            return db.collection('events').doc(event.id).update({
            attendeeIds:firebase.firestore.FieldValue.arrayRemove(user.uid),
            attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid)
                //all the attendees apart from current user
        })
    }catch (error) {
        throw error
    }
}