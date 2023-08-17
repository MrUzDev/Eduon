import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
 

const config = {
  apiKey: "AIzaSyAGrqtE-xxTy9_w-KL29FqEXgz0nazBoyI",
  authDomain: "eduonchat-c471f.firebaseapp.com",
  projectId: "eduonchat-c471f",
  storageBucket: "eduonchat-c471f.appspot.com",
  messagingSenderId: "184531286740",
  appId: "1:184531286740:web:b5c02fbcd47b84abd71941",
  measurementId: "G-BKNY4B5WBB"
};
 
export const app = firebase.initializeApp(config)
export const db = getFirestore()
export const myFirestore = firebase.firestore();
export const firebasee = firebase



// import firebase from "firebase";
// import {getFirestore} from 'firebase/firestore'

// const config = {
//   apiKey: "AIzaSyCNG5csN1yIk7B8lRhsZCg-A4inXVMy5NA",
//   authDomain: "superchat-6e308.firebaseapp.com",
//   projectId: "superchat-6e308",
//   storageBucket: "superchat-6e308.appspot.com",
//   messagingSenderId: "185564842231",
//   appId: "1:185564842231:web:e16a25eb7a58b15037abf2",
//   measurementId: "G-BVH8F8NB7Z",
// };
// firebase.initializeApp(config);
// firebase.firestore().settings({
//   timestampsInSnapshots: true,
// });

// export const myFirebase = firebase;
// export const myStorage = firebase.storage();