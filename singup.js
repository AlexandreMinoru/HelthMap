
import { createAccount } from "./firebase/firebaseAuthenticationSetup.js";

function validateSignup(event) {
    event.preventDefault(); // Evita a recarga do formulário

    const fullname = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value;

    if (!fullname || !email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }
    if(password.length < 6){
        alert("A senha deve ter no mínimo 6 caracteres");
        return;
    }

    createAccount(email, password);
}

// Adiciona o evento no formulário em vez do botão
const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", validateSignup);
