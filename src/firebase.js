import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyADcg8l6qE1SNYHT2-u5pt6utAzf-1ZdA8",
  authDomain: "react-todo-ist.firebaseapp.com",
  databaseURL: "https://react-todo-ist.firebaseio.com",
  projectId: "react-todo-ist",
  storageBucket: "react-todo-ist.appspot.com",
  messagingSenderId: "231196868124",
  appId: "1:231196868124:web:5559ace2725c9b613629d9",
  measurementId: "G-GEGG6MM9X9"
});

export { firebaseConfig as firebase };
