// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase, set, get, update, remove, ref, child, push, onValue} 
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js"
import { placeFunctions } from "../pages/modal.js";
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

export function removeCases(casoId){
    remove(ref(db, "casos/" + casoId)).then(() =>{
        alert("Caso removido com sucesso")
    }).catch((error) =>{
        alert(error);
    })
}

export function editCases(id, nome, idade, cidade, data, dor){
    var urgencia = true;
    if(dor >= 7){
        urgencia = true
    }else{
        urgencia = false;
    }
    update(ref(db, "casos/" + id), {
        nome: nome,
        idade: idade,
        cidade: cidade,
        data: data,
        urgente: urgencia
    }).then(() =>{
        alert("Dados atualizados com sucesso")
    }).catch((error) =>{
        alert(error);
    })
}

export function showCases(){

    onValue(casosRef, (snapshot) => {
        // Limpar a lista de casos na tela
        const casosList = document.getElementsByClassName("lista-casos")[0];
        casosList.innerHTML = "";
        
    
        // Iterar sobre os dados do snapshot
        snapshot.forEach((childSnapshot) => {
        const caso = childSnapshot.val();
        const caseId = childSnapshot.key
        // Criar um elemento HTML para cada caso
        const casoElement = document.createElement("div");
        casoElement.innerHTML = `
            <div class="outbreak-case" data-case-id="1">
            <p>Surto de Dengue - ${caso.cidade}</p>
            <button class="view-case-btn" data-case-id="${caseId}">Ver Detalhes</button>
            <button class="editMenu-case-btn" data-case-id="${caseId}">Editar</button>
            <button class="remove-case-btn" data-case-id="${caseId}">Remover</button>
        </div>

        `;
    
        // Adicionar o elemento HTML à lista de casos
        casosList.appendChild(casoElement);
        });
    });
    try{
        removeFunctions();
    }catch(e){
        
    }
    placeFunctions();
}

export function getCase(key){
    const refCase = ref(db, "casos/" + key);
    return get(refCase).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();  // Retorna os dados do caso
        } else {
            console.error("Caso não encontrado!");
            return null;
        }
    }).catch((error) => {
        console.error("Erro ao buscar o caso:", error);
    });
}

