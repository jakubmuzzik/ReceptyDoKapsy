import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'
require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyCupo4P80iUoFaUUAXOPHBop7sxaphnKXE",
    authDomain: "receptydokapsy.firebaseapp.com",
    projectId: "receptydokapsy",
    storageBucket: "receptydokapsy.appspot.com",
    messagingSenderId: "620283674556",
    appId: "1:620283674556:web:a2cf4deda47c441e0e35b9"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }