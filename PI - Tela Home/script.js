document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nav = document.querySelector('.carousel-nav');
    const dots = Array.from(nav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Função para mover para o slide desejado
    const moveToSlide = (currentSlide, targetSlide) => {
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        const amountToMove = targetIndex * slideWidth;
        
        track.style.transform = `translateX(-${amountToMove}px)`;
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // Função para atualizar as bolinhas de navegação
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };
    
    // Função para mostrar/esconder as setas de navegação
    const updateArrows = (targetIndex) => {
        if (targetIndex === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'block';
        } else if (targetIndex === slides.length - 1) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        }
    };

    // Quando clico no botão "próximo"
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = nav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        updateArrows(nextIndex);
    });

    // Quando clico no botão "anterior"
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = nav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        updateArrows(prevIndex);
    });

    // Quando clico em uma bolinha de navegação
    nav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = nav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        updateArrows(targetIndex);
    });
    
    // Inicializa a visibilidade das setas
    updateArrows(0);
});