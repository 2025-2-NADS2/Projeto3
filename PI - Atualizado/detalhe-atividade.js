// Espera o documento carregar para rodar o script
document.addEventListener("DOMContentLoaded", function() {

    // 1. Seleciona todos os elementos necessários
    const modalOverlay = document.getElementById('activity-modal');
    if (!modalOverlay) return; // Para de rodar se o modal não estiver na página

    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeModalBtn = document.getElementById('modal-close');
    
    // ATUALIZAÇÃO IMPORTANTE: Seleciona o link <a> que envolve o card
    const openModalLinks = document.querySelectorAll('.event-grid-card a');

    // Função para abrir o modal
    function openModal(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        
        const link = event.currentTarget; 
        
        // Pega os dados dos atributos data-
        const title = link.dataset.title;
        const imgSrc = link.dataset.img;
        const description = link.dataset.desc;

        // 2. Alimenta o modal com os dados do card clicado
        modalTitle.textContent = title;
        modalImage.src = imgSrc;
        modalImage.alt = title; 
        modalDescription.textContent = description;

        // 3. Mostra o modal e trava o scroll da página
        modalOverlay.classList.add('show');
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
    }

    // Função para fechar o modal
    function closeModal() {
        modalOverlay.classList.remove('show');
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    }

    // 4. Adiciona os Event Listeners
    openModalLinks.forEach(link => {
        link.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('show')) {
            closeModal();
        }
    });

});
