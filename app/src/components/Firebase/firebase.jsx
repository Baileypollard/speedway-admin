import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyBvwQMuheylWzhLWijCOWx1YQWXKm7F2Qk",
  authDomain: "riverside-speedway.firebaseapp.com",
  databaseURL: "https://riverside-speedway.firebaseio.com",
  projectId: "riverside-speedway",
  storageBucket: "riverside-speedway.appspot.com",
  messagingSenderId: "852613592898",
  appId: "1:852613592898:web:75785cead236f4dadf7adb"
};

class Firebase {

  constructor() {
    app.initializeApp(config);

    this.fieldValue = app.firestore.FieldValue;
    
    this.auth = app.auth();
    this.db = app.firestore();
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);


  doSignOut = () => this.auth.signOut();  


  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

    user = uid => this.db.doc(`users/${uid}`);
    users = () => this.db.collection('users');
    
    // *** Races API ***
    contestants = raceId => this.db.collection(`races/${raceId}/contestants`);
    contestant = (raceId,  contestantId) => this.db.doc(`races/${raceId}/contestants/${contestantId}`);

    races = () => this.db.collection('races');
}
export default Firebase;