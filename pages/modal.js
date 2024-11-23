import { showCases, getCase, removeCases, editCases, addNewCases, showCasesFiltered } from "../firebase/firebaseConfig.js";
 const renderCases = new Promise(showCases);





    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    

    // Função para abrir o modal com os dados corretos
    function openModal(caseId) {
        getCase(caseId).then(data => {
            if (data) {
                modalBody.innerHTML = `
                    <h2>Detalhes do Caso</h2>
                    <p><strong>Nome:</strong> ${data.nome}</p>
                    <p><strong>Idade:</strong> ${data.idade}</p>
                    <p><strong>Local:</strong> ${data.cidade}</p>
                    <p><strong>Data do Registro:</strong> ${data.data}</p>
                    <p><strong>Nível de Prioridade:</strong> ${data.urgente ? 'Alta' : 'Baixa'}</p>
                `;
                modalContainer.style.display = 'flex';
            } else {
                modalBody.innerHTML = '<p>Erro ao carregar os dados do caso.</p>';
            }
        });
        
    }
    

    function openEditModal(caseId) {
        getCase(caseId).then(data => {
            if (data) {
                modalBody.innerHTML = `
                    <h2>Editar Caso</h2>
                <p><strong>Nome:</strong> <input type="text" class="name-input" value="${data.nome}"></p>
                <p><strong>Idade:</strong> <input type="number" class="age-input" value="${data.idade}"></p>
                <p><strong>Local:</strong> <input type="text" class="place-input" value="${data.cidade}"></p>
                <p><strong>Data do Registro:</strong> <input type="date" class="date-input" value="${data.data}"></p>
                <p><strong>Nível de Prioridade (Dor):</strong> <input type="number" class="pain-input" value="${data.urgente ? 7 : 1}"></p>
                <button class="edit-case-btn">Editar</button>



                `;
                const nameInput = document.querySelector(".name-input");
                const ageInput = document.querySelector(".age-input");
                const placeInput = document.querySelector(".place-input");
                const dateInput = document.querySelector(".date-input");
                const painInput = document.querySelector(".pain-input");
                const editBtn = document.querySelector(".edit-case-btn");
                editBtn.onclick = null
                editBtn.addEventListener("click", function(){
                    const updatedName = nameInput.value;
                    const updatedAge = ageInput.value;
                    const updatedPlace = placeInput.value;
                    const updatedDate = dateInput.value;
                    const updatedPain = painInput.value;
                    console.log(caseId, updatedName, updatedAge, updatedPlace, updatedDate, updatedPain)
                    editCases(caseId, updatedName, updatedAge, updatedPlace, updatedDate, updatedPain)
                })
                modalContainer.style.display = 'flex';
            } else {
                modalBody.innerHTML = '<p>Erro ao carregar os dados do caso.</p>';
            }
        });
        
    }

    // Fecha o modal
    closeModal.addEventListener('click', function () {
        modalContainer.style.display = 'none';
    });

    // Adiciona os eventos aos botões
    export function placeFunctions() {
        // Create a MutationObserver to watch for DOM changes
        const observer = new MutationObserver(function (mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // When new nodes are added (like cases), attach event listeners
                    attachEventListeners();
                }
            }
        });
    
        const config = { childList: true, subtree: true };
        const targetNode = document.querySelector('.lista-casos'); // Parent node where cases are added
    
        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    
        // Initial call to attach event listeners to existing buttons
        attachEventListeners();
    }
    
    function attachEventListeners() {
        // View case buttons
        const viewButtons = document.querySelectorAll('.view-case-btn');
        viewButtons.forEach(function (button) {
            button.removeEventListener('click', handleViewButtonClick);
            button.addEventListener('click', handleViewButtonClick);
        });
    
        // Remove case buttons
        const removeButtons = document.querySelectorAll('.remove-case-btn');
        removeButtons.forEach(function (button) {
            button.removeEventListener('click', handleRemoveButtonClick);
            button.addEventListener('click', handleRemoveButtonClick);
        });
    
        // Edit case buttons
        const editButtons = document.querySelectorAll('.editMenu-case-btn');
        editButtons.forEach(function (button) {
            button.removeEventListener('click', handleEditButtonClick);
            button.addEventListener('click', handleEditButtonClick);
        });
    }
    
    function handleViewButtonClick() {
        const caseId = this.getAttribute('data-case-id');
        openModal(caseId);
    }
    
    function handleRemoveButtonClick() {
        const caseId = this.getAttribute('data-case-id');
        removeCases(caseId);
        placeFunctions(); // Rebind the events after removal
    }
    
    function handleEditButtonClick() {
        const caseId = this.getAttribute('data-case-id');
        openEditModal(caseId);
        placeFunctions(); // Rebind the events after editing
    }
    
    export function removeFunctions() {
        // View case buttons
        const viewButtons = document.querySelectorAll('.view-case-btn');
        viewButtons.forEach(function (button) {
            button.removeEventListener('click', handleViewButtonClick);
        });
    
        // Remove case buttons
        const removeButtons = document.querySelectorAll('.remove-case-btn');
        removeButtons.forEach(function (button) {
            button.removeEventListener('click', handleRemoveButtonClick);
        });
    
        // Edit case buttons
        const editButtons = document.querySelectorAll('.edit-case-btn');
        editButtons.forEach(function (button) {
            button.removeEventListener('click', handleEditButtonClick);
        });
    }
    



    const filterInput = document.querySelector("#filter-bar");
    filterInput.addEventListener("change", (e) => {
        e.preventDefault()
        filterCases(e.target.value)
    });
    function filterCases(text){
        if(text == ""){
            showCases();
        }
        showCasesFiltered(text);
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Recupera o estado da URL
    const state = getQueryParam('state');
    if (state) {
        filterInput.value = state
        showCasesFiltered(state); // Filtra os casos pelo estado
    }