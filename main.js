// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.querySelector('.lg\\:hidden[role="dialog"]');
    const closeMenuButton = document.getElementById('mobile-menu-close');

    // Hide menu by default
    if (mobileMenu) {
        mobileMenu.style.display = 'none';
    }

    // Toggle menu
    function toggleMenu() {
        if (!mobileMenu) return;
        
        if (mobileMenu.style.display === 'none') {
            mobileMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Event listeners
    mobileMenuButton?.addEventListener('click', toggleMenu);
    closeMenuButton?.addEventListener('click', toggleMenu);

    // Close menu when clicking navigation links
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });

    // Feature image switching
    const featureScreen = document.getElementById('feature-screen');
    const featureButtons = document.querySelectorAll('.feature-button');
    
    featureButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all buttons
            featureButtons.forEach(btn => btn.classList.remove('bg-white/10'));
            
            // Add active state to clicked button
            button.classList.add('bg-white/10');
            
            // Update the image with fade effect
            featureScreen.style.opacity = '0';
            setTimeout(() => {
                featureScreen.src = button.dataset.screen;
                featureScreen.style.opacity = '1';
            }, 300);
        });
    });

    // Set initial active state
    featureButtons[0].classList.add('bg-white/10');
}); 