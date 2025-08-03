 
        document.addEventListener('DOMContentLoaded', function() {
            // Get all navigation links
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');
            const hamburger = document.querySelector('.hamburger');
            const mobileNav = document.querySelector('.mobile-nav');
            const closeBtn = document.querySelector('.close-btn');
            const overlay = document.querySelector('.overlay');
            
            // Function to show a specific section
            function showSection(sectionId) {
                // Hide all sections
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show the target section
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // Update URL hash without adding to history (we'll handle history separately)
                    if (window.location.hash !== `#${sectionId}`) {
                        history.replaceState({ section: sectionId }, '', `#${sectionId}`);
                    }
                    
                    // Scroll to top of the section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Close mobile menu if open
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
            }
            
            // Add click event listeners to each link
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get the target section from data attribute
                    const targetSection = this.getAttribute('data-section');
                    
                    // Add to browser history
                    history.pushState({ section: targetSection }, '', `#${targetSection}`);
                    
                    // Show the section
                    showSection(targetSection);
                });
            });
            
            // Handle back/forward navigation
            window.addEventListener('popstate', function(event) {
                // Get the section from history state or from URL hash
                const sectionId = (event.state && event.state.section) || 
                                 window.location.hash.substring(1);
                
                if (sectionId) {
                    showSection(sectionId);
                } else {
                    // Default to home if no hash
                    showSection('home');
                }
            });
            
            // Check URL hash on page load
            function initialize() {
                const hash = window.location.hash.substring(1);
                if (hash && document.getElementById(hash)) {
                    showSection(hash);
                } else {
                    // Default to home section
                    history.replaceState({ section: 'home' }, '', '#home');
                    showSection('home');
                }
            }
            
            // Initialize the page
            initialize();
            
            // Smooth scrolling for anchor links within the same section
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href !== '#home' && href !== '#about' && 
                        href !== '#portfolio' && href !== '#contact') {
                        e.preventDefault();
                        document.querySelector(href).scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Mobile menu toggle
            hamburger.addEventListener('click', function() {
                mobileNav.classList.add('active');
                overlay.classList.add('active');
            });
            
            closeBtn.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            overlay.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
            });
        });
