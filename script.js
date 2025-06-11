
// Apply theme before DOMContentLoaded
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggleTheme");
    if (toggle) toggle.checked = true;
  });
}


"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const toggle = document.getElementById("toggleTheme");
  const body = document.body;

  // Toggle mobile nav menu
  function toggleMenu() {
    if (navLinks) {
      navLinks.classList.toggle("active");
    }
  }
  window.toggleMenu = toggleMenu; // Make it global for HTML onclick use

  // Show scroll-to-top button on scroll
  function handleScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollToTopBtn) {
      scrollToTopBtn.style.display = scrollTop > 300 ? "block" : "none";
    }
  }

  // Throttle scroll handler for performance
  let scrollThrottle;
  window.addEventListener("scroll", () => {
    if (!scrollThrottle) {
      scrollThrottle = setTimeout(() => {
        handleScroll();
        scrollThrottle = null;
      }, 150);
    }
  });

  // Scroll to top on button click
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Theme toggle (dark/light)
  if (toggle) {
    if (localStorage.getItem("theme") === "light") {
      body.classList.add("light-theme");
      toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
      } else {
        body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
      }
    });
  }
});
