// this function work properly. Page active 
document.addEventListener("DOMContentLoaded", function () {
  const activePage = window.location.href;

  const navLinks = document.querySelectorAll('.navbar-collapse .navbar-nav .nav-item a');

  navLinks.forEach(link => {
    if (link.href === activePage) {
      link.classList.add('active');
    }
  });
});

fetch('./inc/head.html')
  .then(response => response.text())
  .then(content => {
    document.getElementById('head').innerHTML = content;
  });
fetch('./inc/nav.html')
  .then(response => response.text())
  .then(content => {
    document.getElementById('navigation').innerHTML = content;
  });
fetch('./inc/footer.html')
  .then(response => response.text())
  .then(content => {
    document.getElementById('footer').innerHTML = content;
  });


// Disable right-click
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     event.keyCode === 123 ||
//     ctrlShiftKey(e, 'I') ||
//     ctrlShiftKey(e, 'J') ||
//     ctrlShiftKey(e, 'C') ||
//     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
//   )
//     return false;
// };

// const activePage = window.location.href; // it is used for finding the location path of the current page
// console.log(activePage);
// const navLinks = document.querySelectorAll('.navbar-collapse .navbar-nav .nav-Item a').forEach(link => {
//   if (link.href.includes(`${activePage}`)) {
//     // console.log(link.href);
//     link.classList.add('active');
//     // console.log(activePage); // Corrected the variable name here
//   }
// });

// const activePage = window.location.href;
// console.log(activePage);
// const navLinks = document.querySelectorAll('.navbar-collapse .navbar-nav .nav-item a').forEach(link => {
//   if (link.href.toLowerCase() === activePage.toLowerCase()) {
//     link.classList.add('active');
//   }
// });