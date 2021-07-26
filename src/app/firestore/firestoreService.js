import firebase from "../config/firebase";

const db = firebase.firestore()


const getEventsFromFirestore = (observer) => {
    return  db.collection('events').onSnapshot(observer)
    // get or listen to data. here we listen
};

export default getEventsFromFirestore;

// it just store our firebase and firestore queries