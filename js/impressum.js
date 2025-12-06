/**
 * Opens the impressum overlay
 */
function openImpressum() {
    const overlay = document.getElementById('impressumOverlay');
    const button = document.querySelector('.impressum-btn');
    const iconElements = button.querySelectorAll('circle, rect');
    if (overlay) {
        overlay.classList.remove('d-none');
        iconElements.forEach(element => {
            element.setAttribute('fill', '#FFDC00');
        });
    }
}

/**
 * Closes the impressum overlay
 */
function closeImpressum() {
    const overlay = document.getElementById('impressumOverlay');
    const button = document.querySelector('.impressum-btn');
    const iconElements = button.querySelectorAll('circle, rect');
    if (overlay) {
        overlay.classList.add('d-none');
        iconElements.forEach(element => {
            element.setAttribute('fill', '#654321');
        });
    }
}