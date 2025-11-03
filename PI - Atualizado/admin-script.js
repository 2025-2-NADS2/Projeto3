/* * Script para o menu mobile do PAINEL ADMIN e DOADOR
 */
document.addEventListener('DOMContentLoaded', () => {

    const toggleButton = document.getElementById('mobile-toggle');
    const adminLayout = document.querySelector('.admin-layout');

    if (toggleButton && adminLayout) {
        toggleButton.addEventListener('click', () => {
            // Adiciona ou remove a classe que mostra/esconde o menu
            adminLayout.classList.toggle('sidebar-open');
        });
    }
});