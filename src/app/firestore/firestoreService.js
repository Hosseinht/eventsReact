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
        email:user.email,
        createdAt : firebase.firestore.FieldValue.serverTimestamp()
    })
    // we use set because we want to use user id as document id

}