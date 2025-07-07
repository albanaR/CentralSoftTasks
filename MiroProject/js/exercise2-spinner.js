// exercise2-spinner.js

document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('loading-spinner');
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Show spinner
            spinner.classList.remove('hidden');

            // Simulate loading (e.g., API call delay)
            setTimeout(() => {
                spinner.classList.add('hidden');
            }, 2000); // 2 seconds for demonstration
        });
    });
});
