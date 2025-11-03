// Adiciona um listener que espera todo o HTML ser carregado
document.addEventListener('DOMContentLoaded', function () {

    // --- LÓGICA PARA O CARROSSEL PRINCIPAL (HERO) ---
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        const track = heroCarousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = heroCarousel.querySelector('.carousel-button.next');
        const prevButton = heroCarousel.querySelector('.carousel-button.prev');
        const dotsNav = heroCarousel.querySelector('.carousel-nav');
        
        if (track && slides.length > 0 && nextButton && prevButton && dotsNav) {
            const dots = Array.from(dotsNav.children);
            // Corrigido para slides[0] apenas se slides.length > 0
            const slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
            
            const setSlidePosition = (slide, index) => { slide.style.left = slideWidth * index + 'px'; };
            slides.forEach(setSlidePosition);

            let currentIndex = 0;
            if (slides[currentIndex]) slides[currentIndex].classList.add('current-slide');
            if (dots[currentIndex]) dots[currentIndex].classList.add('current-slide');

            const moveToSlide = (targetIndex) => {
                if(slides.length === 0) return;
                const currentSlide = slides[currentIndex];
                const targetSlide = slides[targetIndex];
                const currentDot = dots[currentIndex];
                const targetDot = dots[targetIndex];

                // Verifica se os elementos existem antes de acessar style ou classList
                if(targetSlide) {
                    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
                    targetSlide.classList.add('current-slide');
                }
                if(currentSlide) currentSlide.classList.remove('current-slide');
                if(targetDot) targetDot.classList.add('current-slide');
                if(currentDot) currentDot.classList.remove('current-slide');
                
                currentIndex = targetIndex;
            };

            const nextAction = () => {
                const nextIndex = (currentIndex + 1) % slides.length;
                moveToSlide(nextIndex);
            };

            const prevAction = () => {
                 const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                moveToSlide(prevIndex);
            };

            let slideInterval;
            const startInterval = () => {
                slideInterval = setInterval(nextAction, 5000); // 5 segundos
            };
            const resetInterval = () => {
                clearInterval(slideInterval);
                startInterval();
            };

            nextButton.addEventListener('click', () => { nextAction(); resetInterval(); });
            prevButton.addEventListener('click', () => { prevAction(); resetInterval(); });

            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('button');
                if (!targetDot) return;
                const targetIndex = dots.findIndex(dot => dot === targetDot);
                moveToSlide(targetIndex);
                resetInterval();
            });
            
            startInterval();
        }
    }

    // --- LÓGICA PARA O CARROSSEL DE EVENTOS ---
    const eventsSlider = document.querySelector('.events-slider-section');
    if (eventsSlider) {
        const track = eventsSlider.querySelector('.events-slider-track');
        const container = eventsSlider.querySelector('.events-slider-container');
        
        // Verificação mais robusta
        if (track && container) {
            const slides = Array.from(track.children);
            const nextButton = eventsSlider.querySelector('.next-event');
            const prevButton = eventsSlider.querySelector('.prev-event');

            if (slides.length > 0 && nextButton && prevButton) {
                let currentIndex = 0;

                const updateButtons = () => {
                    prevButton.disabled = currentIndex === 0;
                    
                    // Cálculo de visibilidade do último slide
                    const trackWidth = track.scrollWidth;
                    const containerWidth = container.clientWidth;
                    const maxScroll = trackWidth - containerWidth;
                    
                    // Encontra o offset do último slide
                    const lastSlide = slides[slides.length - 1];
                    const lastSlideOffset = lastSlide.offsetLeft + lastSlide.clientWidth;
                    
                    // Desabilita "next" se o fim do último slide já estiver visível
                    // ou se o scroll máximo for atingido
                    nextButton.disabled = (lastSlideOffset <= containerWidth + track.scrollLeft) || (track.scrollLeft >= maxScroll - 1);
                };

                const moveToSlide = (index) => {
                    if (index < 0 || index >= slides.length) return;
                    
                    // Encontra o slide alvo
                    const targetSlide = slides[index];
                    if (!targetSlide) return;
                    
                    // Calcula a posição de scroll
                    let newScrollLeft = targetSlide.offsetLeft;
                    
                    // Garante que não ultrapasse o limite máximo
                    const trackWidth = track.scrollWidth;
                    const containerWidth = container.clientWidth;
                    const maxScroll = trackWidth - containerWidth;
                    
                    if (newScrollLeft > maxScroll) {
                        newScrollLeft = maxScroll;
                        // Ajusta o currentIndex para o último slide visível
                        for(let i = slides.length - 1; i >= 0; i--) {
                            if(slides[i].offsetLeft <= maxScroll) {
                                currentIndex = i;
                                break;
                            }
                        }
                    } else {
                         currentIndex = index;
                    }

                    track.style.transform = `translateX(-${newScrollLeft}px)`;
                    updateButtons();
                };

                nextButton.addEventListener('click', () => {
                    let nextIndex = currentIndex + 1;
                    // Encontra o próximo slide que está (pelo menos parcialmente) fora da vista
                    while(nextIndex < slides.length - 1 && slides[nextIndex].offsetLeft < (container.clientWidth + (slides[currentIndex].offsetLeft || 0))) {
                        if(slides[nextIndex].offsetLeft + slides[nextIndex].clientWidth > container.clientWidth + (slides[currentIndex].offsetLeft || 0)) {
                            break;
                        }
                        nextIndex++;
                    }
                    moveToSlide(nextIndex);
                });

                prevButton.addEventListener('click', () => {
                    let prevIndex = currentIndex - 1;
                    // Encontra o slide anterior que se tornará o primeiro
                    while(prevIndex > 0 && slides[prevIndex].offsetLeft + container.clientWidth > (slides[currentIndex].offsetLeft || 0)) {
                        prevIndex--;
                    }
                    moveToSlide(prevIndex);
                });

                updateButtons();
                window.addEventListener('resize', updateButtons); // Atualiza botões no resize
            }
        }
    }


    // --- LÓGICA PARA A PÁGINA DE DOAÇÃO ---
    const donationPage = document.querySelector('.donation-page-section');
    if (donationPage) {
        const amountOptions = donationPage.querySelectorAll('.amount-option');
        const customAmountInput = donationPage.querySelector('#custom-amount');
        const confirmButton = donationPage.querySelector('.btn-full');

        if (amountOptions.length > 0 && customAmountInput && confirmButton) {
            const updateButtonText = (amount) => {
                // Formata o valor para ter certeza
                let formattedAmount = parseFloat(amount.replace(',', '.')).toFixed(2);
                if (isNaN(formattedAmount) || formattedAmount <= 0) {
                    confirmButton.textContent = 'Confirmar Doação';
                } else {
                    confirmButton.textContent = `Confirmar Doação de R$ ${formattedAmount.replace('.', ',')}`;
                }
            };

            amountOptions.forEach(button => {
                button.addEventListener('click', () => {
                    amountOptions.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    customAmountInput.value = ''; // Limpa o campo customizado
                    const amount = button.textContent.replace('R$ ', '');
                    updateButtonText(amount);
                });
            });

            customAmountInput.addEventListener('input', () => {
                amountOptions.forEach(btn => btn.classList.remove('active')); // Desmarca botões
                const amount = customAmountInput.value || '0';
                updateButtonText(amount);
            });

            // Inicia o texto do botão com o valor padrão
            const initialActive = donationPage.querySelector('.amount-option.active');
            if (initialActive) {
                updateButtonText(initialActive.textContent.replace('R$ ', ''));
            }
        }
    }
    
    // --- LÓGICA PARA AS ABAS DA PÁGINA DE LOGIN ---
    const tabsContainer = document.querySelector('.login-tabs');
    if (tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
        const loginForms = document.querySelectorAll('.login-form');

        if(tabButtons.length > 0 && loginForms.length > 0) {
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    
                    // Pega o alvo do botão (ex: 'doador' ou 'admin')
                    const formName = button.dataset.form; // 'doador'
                    const targetForm = document.getElementById('form-' + formName); // '#form-doador'

                    // 1. Remove 'active' de todos os botões e forms
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    loginForms.forEach(form => form.classList.remove('active'));

                    // 2. Adiciona 'active' apenas no botão clicado
                    button.classList.add('active');
                    
                    // 3. Adiciona 'active' apenas no formulário alvo
                    if (targetForm) {
                        targetForm.classList.add('active');
                    }
                });
            });
        }
    }
}); // FIM DO DOMCONTENTLOADED