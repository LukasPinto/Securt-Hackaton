import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyBALwG59LMwo554MyjJJt4zRMT8VTUo98g",
    authDomain: "securt-de9dc.firebaseapp.com",
    projectId: "securt-de9dc",
    storageBucket: "securt-de9dc.appspot.com",
    messagingSenderId: "888926158206",
    appId: "1:888926158206:web:8b7fb0f6218cbe24fc872f",
    measurementId: "G-GKE8VSG99T"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}