// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";
import 'firebase/firestore' 

const config = {
  apiKey: "AIzaSyBvwQMuheylWzhLWijCOWx1YQWXKm7F2Qk",
  authDomain: "riverside-speedway.firebaseapp.com",
  databaseURL: "https://riverside-speedway.firebaseio.com",
  projectId: "riverside-speedway",
  storageBucket: "riverside-speedway.appspot.com",
  messagingSenderId: "852613592898",
  appId: "1:852613592898:web:75785cead236f4dadf7adb"
};

firebase.initializeApp(config);
firebase.firestore();

// Finally, export it to use it throughout your app
export default firebase;