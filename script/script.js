document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  let scrollTimeout;
  const body = document.body;
  const scrollbarStyle = document.createElement('style');
  document.head.appendChild(scrollbarStyle);

  function showScrollbar() {
    scrollbarStyle.innerHTML = 'body::-webkit-scrollbar { opacity: 1; }';
  }

  function hideScrollbar() {
    scrollbarStyle.innerHTML = 'body::-webkit-scrollbar { opacity: 0; }';
  }

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Clear the previous timeout
    clearTimeout(scrollTimeout);

    if (currentScroll > lastScrollTop || currentScroll === 0) {
      // User is scrolling down or is at the top, show scrollbar after a delay
      setTimeout(showScrollbar, 200); // Show scrollbar after 200ms
    } else {
      // User is scrolling up, show scrollbar after a delay
      setTimeout(showScrollbar, 200); // Show scrollbar after 200ms
    }

    // Set a new timeout to hide the scrollbar after 1 second of no scrolling
    scrollTimeout = setTimeout(hideScrollbar, 1000); // Hide scrollbar after 1000ms

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  });

  // Initially hide the scrollbar
  hideScrollbar();
});