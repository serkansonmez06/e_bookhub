import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import { initializeApp } from "firebase-admin/app";
//get your config from console.firebase.com
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// initializeApp({
//   credential: applicationDefault(),
//   databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
// });

// const { initializeApp } = require("firebase-admin/app");
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const dbt = getDatabase();
// const ref = db.ref("server/saving-data/fireblog/posts");

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(firebaseConfig);
const auth = firebaseApp.auth();

export { auth };
export default { db };
