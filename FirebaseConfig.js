import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import "@firebase/firestore";

// need to run: npm install --save firebase
// We will use the JS SDK with React Native

const firebaseConfig = {
  apiKey: "AIzaSyA0xy9FQiEvgqT5hnBwvg6o6Gt6lOcXJIg",
  authDomain: "reactapp-ddae3.firebaseapp.com",
  databaseURL: "https://reactapp-ddae3-default-rtdb.firebaseio.com",
  projectId: "reactapp-ddae3",
  storageBucket: "reactapp-ddae3.appspot.com",
  messagingSenderId: "691408446823",
  appId: "1:691408446823:web:564859d676f5bd5cbbfbc2",
};

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized, use that one
}

export const db = app.database();
export const firestore = firebase.firestore(app);
export const auth = app.auth();
