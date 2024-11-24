// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiFkCPD0eirecOL7iL4XXh83nMBjWPAqA",
  authDomain: "dengue-d93d8.firebaseapp.com",
  databaseURL: "https://dengue-d93d8-default-rtdb.firebaseio.com",
  projectId: "dengue-d93d8",
  storageBucket: "dengue-d93d8.firebasestorage.app",
  messagingSenderId: "120494002683",
  appId: "1:120494002683:web:24a84fcd7f2d2314217b5e",
  measurementId: "G-44VLPVHSW3"
};

// Initialize Firebase



export function createAccount(email, password){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth,email,password).then((userCredential) =>{
        alert("Conta criada com sucesso")
    }).catch((error) =>{
        const errorMessage = error.message;
        alert(errorMessage)
    })
}

export function login(email, password){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password).then((userCredential) =>{
        return true;
    }).catch((error) =>{
        const errorMessage = error.message;
        alert("Email/senha errados")
    })
}