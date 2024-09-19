document.addEventListener('DOMContentLoaded', function () {
    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Dados fictícios para os modais
    const caseData = {
        1: { nome: 'João Silva', idade: 32, local: 'São Paulo', data: '12/08/2024', prioridade: 'Alta' },
        2: { nome: 'Maria Oliveira', idade: 45, local: 'Rio de Janeiro', data: '15/08/2024', prioridade: 'Média' }
    };

    // Função para abrir o modal com os dados corretos
    function openModal(caseId) {
        const data = caseData[caseId];
        modalBody.innerHTML = `
            <h2>Detalhes do Caso</h2>
            <p><strong>Nome:</strong> ${data.nome}</p>
            <p><strong>Idade:</strong> ${data.idade}</p>
            <p><strong>Local:</strong> ${data.local}</p>
            <p><strong>Data do Registro:</strong> ${data.data}</p>
            <p><strong>Nível de Prioridade:</strong> ${data.prioridade}</p>
        `;
        modalContainer.style.display = 'flex';
    }

    // Fecha o modal
    closeModal.addEventListener('click', function () {
        modalContainer.style.display = 'none';
    });

    // Adiciona os eventos aos botões
    document.querySelectorAll('.view-case-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            const caseId = this.getAttribute('data-case-id');
            openModal(caseId);
        });
    });
});
