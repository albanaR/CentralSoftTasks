
const form = document.querySelector('.email-form');
const emailInput = form.querySelector('input[type="email"]');
const submitButton = form.querySelector('.signup-button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('🛠️ Form submitted');

    // Show spinner
    submitButton.disabled = true;
    const originalHTML = submitButton.innerHTML;
    submitButton.innerHTML = `<span class="spinner"></span>`;

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const email = emailInput.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    console.log('Email entered:', email);
    console.log('Is valid email:', isValidEmail);

    if (isValidEmail) {
        showToast('Signed up successfully!', 'success');
    } else {
        showToast('Invalid email address.', 'error', 5000);
    }

    // Restore button
    submitButton.innerHTML = originalHTML;
    submitButton.disabled = false;
    form.reset();
});
