const burger = document.getElementById('burger-menu');
const navbar = document.querySelector('.navbar');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navbar.classList.toggle('open');
});