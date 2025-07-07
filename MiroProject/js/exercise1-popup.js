// exercise1-popup.js
console.log('exercise1-popup.js loaded');

// Create toast container
(function createToastContainer() {
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        console.log('Toast container created');
    }
})();

// Show toast function
function showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) {
        console.error('Toast container not found');
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}

// Expose globally if needed
window.showToast = showToast;

// Hook the existing sign-up form
const form = document.querySelector('.email-form');
if (!form) {
    console.warn('.email-form not found');
} else {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Sign-up form submitted');

        try {
            // Simulate API call or handle your form logic here
            await new Promise(r => setTimeout(r, 500));

            // Show success toast
            showToast('Signed up successfully!', 'success');
            form.reset(); // optional: clear input
        } catch (error) {
            // Show error toast
            showToast('Something went wrong. Please try again.', 'error', 5000);
        }
    });
}
