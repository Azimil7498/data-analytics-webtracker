// Theme management
const themeManager = {
  init() {
    this.applyTheme();
    this.setupThemeToggle();
  },

  applyTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      const toggle = document.getElementById("toggleTheme");
      if (toggle) toggle.checked = true;
    }
  },

  setupThemeToggle() {
    const toggle = document.getElementById("toggleTheme");
    if (toggle) {
      toggle.addEventListener("change", () => {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("theme", toggle.checked ? "light" : "dark");
      });
    }
  }
};

// Navigation management
const navigationManager = {
  init() {
    this.setupMobileMenu();
    this.setupScrollToTop();
    this.setupScrollSpy();
  },

  setupMobileMenu() {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.querySelector(".hamburger");

    if (hamburger) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
      });
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navLinks?.classList.contains("active") && 
          !e.target.closest(".navbar")) {
        navLinks.classList.remove("active");
        hamburger?.classList.remove("active");
      }
    });
  },

  setupScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (!scrollToTopBtn) return;

    let scrollThrottle;
    window.addEventListener("scroll", () => {
      if (!scrollThrottle) {
        scrollThrottle = setTimeout(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          scrollToTopBtn.style.display = scrollTop > 300 ? "block" : "none";
          scrollThrottle = null;
        }, 150);
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  },

  setupScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
          item.classList.add("active");
        }
      });
    });
  }
};

// Animation management
const animationManager = {
  init() {
    this.setupAOS();
    this.setupScrollAnimations();
  },

  setupAOS() {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-cubic"
    });

    // Apply AOS to dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          AOS.refresh();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  setupScrollAnimations() {
    const elements = document.querySelectorAll(".card, .cert-card, .profile-card, .hero, .course-section, .about-section, .dashboard, .todo-section");
    elements.forEach((el, index) => {
      el.setAttribute("data-aos", index % 2 === 0 ? "fade-up" : "fade-right");
      el.setAttribute("data-aos-delay", (index * 100).toString());
    });
  }
};

// Initialize all managers when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  themeManager.init();
  navigationManager.init();
  animationManager.init();
});

// Make toggleMenu globally available
window.toggleMenu = () => {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.querySelector(".hamburger");
  if (navLinks && hamburger) {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  }
};
