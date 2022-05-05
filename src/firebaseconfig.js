import firebase from "firebase/compat/app";
// import "firebase/compat/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfPtIVBrJIgP9jaUVHymMNQuqP19Nz1Gg",
  authDomain: "clipart-7c32f.firebaseapp.com",
  databaseURL: "https://clipart-7c32f-default-rtdb.firebaseio.com/",
  projectId: "clipart-7c32f",
  storageBucket: "clipart-7c32f.appspot.com",
  messagingSenderId: "573422565712",
  appId: "1:573422565712:web:c504579b4c8e5a7f07d455",
  measurementId: "G-8SKD42CXDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// const storage = firebase.storage();
// export { firebase, storage as default };
