import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "eaavents.firebaseapp.com",
    projectId: "eaavents",
    storageBucket: "eaavents.appspot.com",
    messagingSenderId: "456181188536",
    appId: "1:456181188536:web:646aad0dada6ab0fc6b14d",
    measurementId: "G-YFPX4X5HVE"

}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase;