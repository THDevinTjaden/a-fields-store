// ===== COMPONENT LOADER =====
// Loads reusable components (navbar, footer) into pages

class ComponentLoader {
    constructor() {
        this.components = {};
        this.loadedComponents = new Set();
    }

    // Load a component from file
    async loadComponent(name, selector) {
        if (this.loadedComponents.has(name)) {
            return;
        }

        try {
            const response = await fetch(`./components/${name}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load ${name} component`);
            }
            
            const html = await response.text();
            this.components[name] = html;
            
            // Insert the component into the page
            const targetElement = document.querySelector(selector);
            if (targetElement) {
                targetElement.innerHTML = html;
                this.loadedComponents.add(name);
                
                // Initialize component-specific functionality
                this.initializeComponent(name);
            }
        } catch (error) {
            console.error(`Error loading ${name} component:`, error);
        }
    }

    // Initialize component-specific functionality
    initializeComponent(name) {
        switch (name) {
            case 'navbar':
                this.initializeNavbar();
                break;
            case 'footer':
                this.initializeFooter();
                break;
        }
    }

    // Initialize navbar functionality
    initializeNavbar() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }

        // Highlight current page in navigation
        this.highlightCurrentPage();
    }

    // Initialize footer functionality
    initializeFooter() {
        // Add any footer-specific functionality here
        console.log('Footer component loaded');
    }

    // Highlight current page in navigation
    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Load all components for a page
    async loadAllComponents() {
        await Promise.all([
            this.loadComponent('navbar', '#navbar-placeholder'),
            this.loadComponent('footer', '#footer-placeholder')
        ]);
    }
}

// ===== GLOBAL COMPONENT LOADER =====
window.componentLoader = new ComponentLoader();

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load components if placeholders exist
    if (document.getElementById('navbar-placeholder') || document.getElementById('footer-placeholder')) {
        window.componentLoader.loadAllComponents();
    }
});

// ===== UTILITY FUNCTIONS =====

// Function to manually load a component
function loadComponent(name, selector) {
    return window.componentLoader.loadComponent(name, selector);
}

// Function to check if component is loaded
function isComponentLoaded(name) {
    return window.componentLoader.loadedComponents.has(name);
}

// Export for use in other scripts
window.ComponentLoader = ComponentLoader; 