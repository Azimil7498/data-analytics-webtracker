// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        this.themeToggle.checked = savedTheme === 'dark';

        // Theme toggle event
        this.themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        this.navToggle.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navLinks.contains(e.target)) {
                this.navLinks.classList.remove('active');
                this.navToggle.classList.remove('active');
            }
        });

        // Close mobile menu when clicking a link
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });
    }
}

// Scroll to Top Button
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTopBtn');
        if (this.button) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new ScrollToTop();
}); 
fetch('https://your-backend.onrender.com/api/certificates', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Python Basics",
    platform: "Coursera"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
