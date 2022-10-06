import * as firebase from "firebase/app";
import { getDatabase } from "firebase/database";

let config = {
  apiKey: "AIzaSyBPZCU6RjOrfd1puuwM5fD72rjXcJmAOXk",
  authDomain: "theopenbrain-ba247.firebaseapp.com",
  databaseURL: "https://theopenbrain-ba247-default-rtdb.firebaseio.com",
  projectId: "theopenbrain-ba247",
  storageBucket: "theopenbrain-ba247.appspot.com",
  messagingSenderId: "1068560499975",
  appId: "1:1068560499975:web:c6cf8ad6a33d1726bf31a2",
};

var firebaseApp = firebase.initializeApp(config);

const database = getDatabase(firebaseApp);

export default database;
