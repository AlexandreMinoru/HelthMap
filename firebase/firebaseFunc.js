// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase, set, get, update, remove, ref, child, push, onValue} 
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiFkCPD0eirecOL7iL4XXh83nMBjWPAqA",
  authDomain: "dengue-d93d8.firebaseapp.com",
  projectId: "dengue-d93d8",
  storageBucket: "dengue-d93d8.appspot.com",
  messagingSenderId: "120494002683",
  appId: "1:120494002683:web:24a84fcd7f2d2314217b5e",
  measurementId: "G-44VLPVHSW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//getDatabase
const db = getDatabase();
const casosRef = ref(db, "casos/");



export function addNewCases(nome, idade, cidade, data, dor){
    var urgente = true;
    if(dor >= 7){
         urgente = true;
    }else{
         urgente = false;
    }

    const newCasoRef = push(casosRef);
    set(newCasoRef, {
        nome:nome,
        idade:idade,
        cidade: cidade,
        data: data,
        urgente:urgente
    });
}