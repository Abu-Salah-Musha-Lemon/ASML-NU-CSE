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
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};