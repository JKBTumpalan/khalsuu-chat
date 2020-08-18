import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/functions'

// KhalsuuChat's Firebase configuration
export const authApp = firebase.initializeApp({
    apiKey: process.env.VUE_APP_AUTH_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_AUTH_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_AUTH_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_AUTH_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_AUTH_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_AUTH_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_AUTH_FIREBASE_MEASUREMENT_ID
});

export default firebase

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();