import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "YOUR KEY HERE",
    authDomain: "YOUR KEY HERE",
    databaseURL: "YOUR KEY HERE",
    projectId: "YOUR KEY HERE",
    storageBucket: "YOUR KEY HERE",
    messagingSenderId: "YOUR KEY HERE",
    appId: "YOUR KEY HERE"
};

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export default firebase