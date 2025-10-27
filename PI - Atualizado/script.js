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

                track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
                if(currentSlide) currentSlide.classList.remove('current-slide');
                if(targetSlide) targetSlide.classList.add('current-slide');
                if(currentDot) currentDot.classList.remove('current-slide');
                if(targetDot) targetDot.classList.add('current-slide');
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
        const slides = Array.from(track.children);
        const nextButton = eventsSlider.querySelector('.next-event');
        const prevButton = eventsSlider.querySelector('.prev-event');
        const container = eventsSlider.querySelector('.events-slider-container');

        if (track && slides.length > 0 && nextButton && prevButton && container) {
            let currentIndex = 0;

            const updateButtons = () => {
                prevButton.disabled = currentIndex === 0;
                const trackWidth = track.scrollWidth;
                const containerWidth = container.clientWidth;
                const maxScroll = trackWidth - containerWidth;
                const currentScroll = slides[currentIndex] ? slides[currentIndex].offsetLeft : 0;
                nextButton.disabled = currentScroll >= maxScroll - 1;
            };
            
            const moveToSlide = (index) => {
                if (index < 0 || index >= slides.length) return;
                const targetSlide = slides[index];
                if (!targetSlide) return;
                track.style.transform = `translateX(-${targetSlide.offsetLeft}px)`;
                currentIndex = index;
                updateButtons();
            };

            nextButton.addEventListener('click', () => {
                let nextIndex = currentIndex;
                let currentOffset = slides[currentIndex].offsetLeft;
                for (let i = currentIndex + 1; i < slides.length; i++) {
                    if (slides[i].offsetLeft > currentOffset) {
                        nextIndex = i;
                        break;
                    }
                }
                moveToSlide(nextIndex);
            });

            prevButton.addEventListener('click', () => {
                let prevIndex = currentIndex;
                let currentOffset = slides[currentIndex].offsetLeft;
                for (let i = currentIndex - 1; i >= 0; i--) {
                    if (slides[i].offsetLeft < currentOffset) {
                        prevIndex = i;
                        while(prevIndex > 0 && slides[prevIndex].offsetLeft + container.clientWidth > currentOffset){
                            prevIndex--;
                        }
                        break;
                    }
                }
                moveToSlide(prevIndex);
            });

            updateButtons();
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
                confirmButton.textContent = `Confirmar Doação de R$ ${amount}`;
            };

            amountOptions.forEach(button => {
                button.addEventListener('click', () => {
                    amountOptions.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    customAmountInput.value = '';
                    const amount = button.textContent.replace('R$ ', '');
                    updateButtonText(amount);
                });
            });

            customAmountInput.addEventListener('input', () => {
                amountOptions.forEach(btn => btn.classList.remove('active'));
                const amount = customAmountInput.value || '0';
                updateButtonText(amount);
            });
        }
    }
    
    // --- LÓGICA PARA AS ABAS DA PÁGINA DE LOGIN ---
    const tabsContainer = document.querySelector('.login-tabs');
    if (tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
        const formDoador = document.getElementById('form-doador');
        const formAdmin = document.getElementById('form-admin');

        if(tabButtons.length > 0 && formDoador && formAdmin) {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    if (button.dataset.form === 'doador') {
                        formDoador.classList.add('active');
                        formAdmin.classList.remove('active');
                    } else {
                        formDoador.classList.remove('active');
                        formAdmin.classList.add('active');
                    }
                });
            });
        }
    }
});