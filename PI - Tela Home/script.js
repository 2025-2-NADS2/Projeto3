// // Seleciona os elementos do HTML
// const track = document.querySelector('.carousel-track');
// const slides = Array.from(track.children);
// const nextButton = document.querySelector('.carousel-button.next');
// const prevButton = document.querySelector('.carousel-button.prev');
// const dotsNav = document.querySelector('.carousel-nav');
// const dots = Array.from(dotsNav.children);

// // Pega a largura do primeiro slide para saber o quanto mover
// const slideWidth = slides[0].getBoundingClientRect().width;
// let currentIndex = 0;

// // Função principal que move para o slide desejado
// const moveToSlide = (targetIndex) => {
// // Move o trilho para a posição correta
//   track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;

//   // Atualiza a classe 'current-slide' no pontinho de navegação
// const currentDot = dots[currentIndex];
// const targetDot = dots[targetIndex];
// currentDot.classList.remove('current-slide');
// targetDot.classList.add('current-slide');

//   // Guarda o novo índice atual
//   currentIndex = targetIndex;
// };

// // Quando clicar na seta "próximo"
// nextButton.addEventListener('click', () => {
//   let nextIndex = currentIndex + 1;
//   // Se passar do último slide, volta para o primeiro
//   if (nextIndex >= slides.length) {
//     nextIndex = 0;
//   }
//   moveToSlide(nextIndex);
// });

// // Quando clicar na seta "anterior"
// prevButton.addEventListener('click', () => {
//   let prevIndex = currentIndex - 1;
//   // Se estiver no primeiro slide e clicar para voltar, vai para o último
//   if (prevIndex < 0) {
//     prevIndex = slides.length - 1;
//   }
//   moveToSlide(prevIndex);
// });
