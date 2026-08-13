document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
});
 
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === '' || password === '') {
            event.preventDefault();
            alert('Bitte füllen Sie alle Felder aus.');
        }
    });