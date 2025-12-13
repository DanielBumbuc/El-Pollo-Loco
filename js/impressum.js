/**
 * Opens the impressum dialog and updates button styling
 * Changes icon colors to highlight active state (#FFDC00)
 */
function openImpressum() {
    const dialog = validateDialog();
    if (!dialog) return;
    showDialog(dialog);
    updateIconsActive();
}

/**
 * Validates and retrieves the dialog element
 * @returns {HTMLElement|null} Dialog element or null if not found
 */
function validateDialog() {
    const dialog = document.getElementById('impressumDialog');
    if (!dialog && document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', openImpressum);
        return null;
    }
    return dialog;
}

/**
 * Shows the dialog using showModal or fallback display
 * @param {HTMLElement} dialog - The dialog element to show
 */
function showDialog(dialog) {
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        dialog.style.display = 'block';
    }
}

/**
 * Updates button icon styling to active state
 * Changes icon colors to highlight active state (#FFDC00)
 */
function updateIconsActive() {
    const button = document.querySelector('.impressum-btn');
    const iconElements = button ? button.querySelectorAll('circle, rect') : [];
    iconElements.forEach(element => {
        element.setAttribute('fill', '#FFDC00');
    });
}

/**
 * Closes the impressum dialog and resets button styling
 * Changes icon colors back to default state (#654321)
 */
function closeImpressum() {
    const dialog = document.getElementById('impressumDialog');
    const button = document.querySelector('.impressum-btn');
    const iconElements = button ? button.querySelectorAll('circle, rect') : [];
    if (dialog) {
        if (typeof dialog.close === 'function') {
            dialog.close();
        } else {
            dialog.style.display = 'none';
        }
        iconElements.forEach(element => {
            element.setAttribute('fill', '#654321');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('impressumDialog');
    if (dialog) {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                closeImpressum();
            }
        });
    }
});