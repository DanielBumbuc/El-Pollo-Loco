/**
 * Opens the impressum overlay and updates button styling
 * Changes icon colors to highlight active state (#FFDC00)
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
 * Closes the impressum overlay and resets button styling
 * Changes icon colors back to default state (#654321)
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