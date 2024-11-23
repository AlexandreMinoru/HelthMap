import {addNewCases} from "../firebase/firebaseFunc.js"
        // Lógica para selecionar o nível de dor
        const painButtons = document.querySelectorAll("#pain-level button");
        const painInput = document.getElementById("pain-level-input");

        painButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Remover seleção de outros botões
                painButtons.forEach(btn => btn.classList.remove("selected"));
                // Marcar o botão clicado
                button.classList.add("selected");
                // Atualizar o valor do input oculto
                painInput.value = button.dataset.pain;
            });
        });

        // Submissão do formulário
        document.getElementById("case-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            addNewCases(data.patientName, data.age, data.state, data.date, data.painLevel)
            console.log("Dados do Caso:", data);

            alert("Caso criado com sucesso!");
            e.target.reset(); // Limpar o formulário
            painButtons.forEach(btn => btn.classList.remove("selected")); // Resetar nível de dor
        });