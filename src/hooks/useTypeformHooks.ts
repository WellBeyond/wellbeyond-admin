import firebase from "firebase/app";
import 'firebase/storage';
import {firebaseConfig} from "../FIREBASE_CONFIG";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}