// it just store our firebase and firestore queries

import firebase from "../config/firebase";

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


const listenToEventsFromFirestore = (predicate) => {
    const user = firebase.auth().currentUser;
    let eventsRef = db.collection('events').orderBy('date');

    switch (predicate.get('filter')) {
        case 'isGoing':
            return eventsRef
                // specify queries
                //if the user going to event
                //array-contains: get the user or the event that currently logged in user is present in the attendeeIds of this particular event
                // user.uid is what is we are looking for
                .where('attendeeIds', "array-contains", user.uid)
                .where('date', '>=', predicate.get('startDate'))
        // where then we specify the field that we wat to query on
        case 'isHosting':
            return eventsRef
                .where('hostUid', '==', user.uid)
                .where('date', '>=', predicate.get('startDate'))
        default:
            return eventsRef
                .where('date', '>=', predicate.get('startDate'))
    }
};
export default listenToEventsFromFirestore;

export function listenToEventFromFirestore(eventId) {
    return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event) {
    const user = firebase.auth().currentUser;
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
    const userDocRef = db.collection('users').doc(user.uid);
    //userDocRef: we want to see if the user already got a profile photo
    try {
        const userDoc = await userDocRef.get();
        //get the data from user doc
        if (!userDoc.data().photoURL) {
            await db.collection('users').doc(user.uid).update({
                photoURL: downloadURL,
            });
            // update user firebase auth profile
            await user.updateProfile({
                photoURL: downloadURL,
            });
        }

        // add the photo to the user photo collection inside the document
        return await db.collection('users').doc(user.uid).collection('photos').add({
            name: filename,
            url: downloadURL,
        });
    } catch (error) {
        throw error
    }
}

// get photos from firestore
export function getUserPhotos(userUid) {
    return db.collection('users').doc(userUid).collection('photos');
}

// update the auth part of the user profile data
export async function setMainPhoto(photo) {
    const user = firebase.auth().currentUser;
    try {
        await db.collection('users').doc(user.uid).update({
            photoURL: photo.url,
        });
        return await user.updateProfile({
            photoURL: photo.url,
        });

    } catch (error) {
        throw error;
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
            attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
            attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid)
            //all the attendees apart from current user
        })
    } catch (error) {
        throw error
    }
}

export function getUserEventQuery(activeTab, userUid) {
    let eventsRef = db.collection('events')
    const today = new Date()
    switch (activeTab) {
        case 'past events':
            return eventsRef
                .where('attendeeIds', 'array-contains', userUid)
                .where('date', '<=', today)
                .orderBy('date', 'desc')
        case 'hosting':
            return eventsRef
                .where('hostUid', '==', userUid)
                .orderBy('date')
        default:
            return eventsRef
                .where('attendeeIds', 'array-contains', userUid)
                .where('date', '>=', today)
                .orderBy('date')
    }
}

export async function followUser(profile) {
    const user = firebase.auth().currentUser;
    try {
        await db.collection('following').doc(user.uid).collection('userFollowing').doc(profile.id).set({
            displayName: profile.displayName,
            photoURL: profile.photoURL,
            uid: profile.id
        })
        // currently logged in user tht is following the user(profile) that passed in followUser
        await db.collection('following').doc(profile.id).collection('userFollowers').doc(user.uid).set({
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid
        })
        // counting
        await db.collection('users').doc(user.uid).update({
            followingCount: firebase.firestore.FieldValue.increment(1)
        })
        return await db.collection('users').doc(profile.id).update({
            followerCount: firebase.firestore.FieldValue.increment(1)
        })
        // return? because we will use lading indicator
    } catch (error) {
        throw error
    }
}

export async function unfollowUser(profile) {
    const user = firebase.auth().currentUser;
    try {
        await db.collection('following').doc(user.uid).collection('userFollowing').doc(profile.id).delete()
        await db.collection('following').doc(profile.id).collection('userFollowers').doc(user.uid).delete()
        await db.collection('users').doc(user.uid).update({
            followingCount: firebase.firestore.FieldValue.increment(-1)
        })
        return await db.collection('users').doc(profile.id).update({
            followerCount: firebase.firestore.FieldValue.increment(-1)
        })
    } catch (error) {
        throw error
    }
}

export function getFollowersCollection(profileId) {
    return db.collection('following').doc(profileId).collection('userFollowers')
}

export function getFollowingCollection(profileId) {
    return db.collection('following').doc(profileId).collection('userFollowing')
}
