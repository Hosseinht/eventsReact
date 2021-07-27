import firebase from "../config/firebase";

const db = firebase.firestore()

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    // exists is a property that we get back we've asked snapshots

    // if exist:
    const data = snapshot.data();

    // if the data type is timestamp then we want to covert it into a JS date
    for (const prop in data){
        // loop over all the properties inside an object
        if (data.hasOwnProperty(prop)){
            // we don't want to deal with non properties like prototype methods of the object
            if (data[prop] instanceof firebase.firestore.Timestamp){
                data[prop] = data[prop].toDate()
            }
        }
    }

    return {
        ...data,
        id: snapshot.id
    }
}


const getEventsFromFirestore = (observer) => {
    return db.collection('events').onSnapshot(observer)
    // get or listen to data. here we listen
};

export default getEventsFromFirestore;

// it just store our firebase and firestore queries