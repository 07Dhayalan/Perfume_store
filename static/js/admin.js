// Highlight clicked nav item
const navItems = document.querySelectorAll('.nav li');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Optional: simulate notification blink effect
const notification = document.querySelector('.notification');

notification.addEventListener('click', () => {
  alert('You have no new notifications.');
});
