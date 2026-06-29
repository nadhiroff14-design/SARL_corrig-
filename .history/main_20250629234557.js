document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });

    // Initialize LazyLoad for images
    const lazyLoadInstance = new LazyLoad({
        elements_selector: "[loading=lazy]",
        threshold: 100
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
    }

    // Pricing Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Initialize Map
    function initMap() {
        // Coordinates for RGZ SARL in Cotonou
        const rgzLocation = { lat: 6.3698483, lng: 2.4113857 };
        const map = L.map('map').setView(rgzLocation, 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);
        
        // Custom icon
        const customIcon = L.icon({
            iconUrl: 'RGZ.jpg',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        
        // Add marker with custom icon
        L.marker(rgzLocation, { icon: customIcon }).addTo(map)
            .bindPopup(`
                <div style="text-align: center;">
                    <h3 style="margin: 5px 0; color: #2a9d8f;">RGZ SARL</h3>
                    <p style="margin: 5px 0;">N°937 Gbegamey 4-Etoile rouge<br>03 BP 4154 Jéricho</p>
                    <div>
                        <p style="margin: 5px 0;">Cotonou, Bénin</p>
                        <a href="#contact" style="color: #2a9d8f; font-weight: bold;">Prendre RDV</a>
                    </div>
                </div>
            `)
            .openPopup();
    }
    
    // Initialize map when DOM is loaded
    if (document.getElementById('map')) {
        initMap();
    }

    // Smooth scrolling for anchor links with offset for fixed header
       // Smooth Scrolling avec compensation pour la navbar fixe
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = window.innerWidth > 768 ? 80 : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll show a success message
            showNotification('success', 'Merci pour votre message! Notre équipe vous contactera dans les plus brefs délais.');
            
            // Reset form
            this.reset();
            
            // You would typically have an AJAX call here:
            /*
            fetch('process-form.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues)
            })
            .then(response => response.json())
            .then(data => {
                showNotification('success', data.message);
                this.reset();
            })
            .catch(error => {
                showNotification('error', 'Une erreur est survenue. Veuillez réessayer.');
            });
            */
        });
    }

    // Enterprise form handling
    const enterpriseForm = document.getElementById('enterpriseForm');
    if (enterpriseForm) {
        enterpriseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Show success message
            showNotification('success', 'Votre demande a bien été envoyée. Un conseiller vous contactera pour une étude personnalisée.');
            
            // Reset form
            this.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to a mailing service
            showNotification('success', 'Merci de vous être abonné avec l\'email ' + email + '!');
            
            // Reset form
            this.reset();
        });
    }

    // Testimonials slider navigation
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
            testimonialSlider.style.cursor = 'grabbing';
            testimonialSlider.style.scrollBehavior = 'auto';
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.style.cursor = 'grab';
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.style.cursor = 'grab';
            testimonialSlider.style.scrollBehavior = 'smooth';
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        testimonialSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
            testimonialSlider.style.scrollBehavior = 'auto';
        });
        
        testimonialSlider.addEventListener('touchend', () => {
            isDown = false;
            testimonialSlider.style.scrollBehavior = 'smooth';
        });
        
        testimonialSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Auto-scroll testimonials
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (!isDown) {
                    testimonialSlider.scrollBy({
                        left: 350,
                        behavior: 'smooth'
                    });
                    
                    // Reset to first item if at end
                    if (testimonialSlider.scrollLeft + testimonialSlider.offsetWidth >= testimonialSlider.scrollWidth - 50) {
                        setTimeout(() => {
                            testimonialSlider.scrollTo({
                                left: 0,
                                behavior: 'auto'
                            });
                        }, 1000);
                    }
                }
            }, 5000);
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Start auto-scroll when mouse leaves slider
        testimonialSlider.addEventListener('mouseenter', stopAutoScroll);
        testimonialSlider.addEventListener('mouseleave', startAutoScroll);
        
        // Start auto-scroll initially
        startAutoScroll();
    }

    // Animate stats counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Initialize counters when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Timeline animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                if (isElementInViewport(item)) {
                    item.classList.add('animated');
                }
            }, index * 200);
        });
    }
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    }
    
    // Event listeners for animations
    window.addEventListener('scroll', animateTimeline);
    window.addEventListener('load', animateTimeline);

    // Show notification function
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <p>${message}</p>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Add notification styles dynamically
    const notificationStyles = document.createElement('style');
    notificationStyles.innerHTML = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #fff;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            max-width: 350px;
            z-index: 9999;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .notification p {
            margin: 0;
            font-size: 14px;
        }
        
        .notification-success {
            border-left: 4px solid #2a9d8f;
        }
        
        .notification-error {
            border-left: 4px solid #e76f51;
        }
        
        .close-notification {
            background: none;
            border: none;
            cursor: pointer;
            color: #777;
            font-size: 16px;
            padding: 0;
        }
    `;
    document.head.appendChild(notificationStyles);

    // Disable right-click for images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            showNotification('error', 'Les images sont protégées par copyright.');
        }
    });

    // Add active class to current section in navigation
    function highlightNav() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (pageYOffset >= (sectionTop - 200) && pageYOffset < (sectionTop + sectionHeight - 200)) {
                currentSection = sectionId;
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    window.addEventListener('load', highlightNav);

    // Add current year to footer
    const yearElement = document.querySelector('.footer-copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }

    // Add no-scroll class when mobile menu is open
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.classList.contains('no-scroll')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

function animateCount(el, end) {
  let start = 0;
  const duration = 2000;
  const stepTime = Math.max(20, Math.floor(duration / end));
  const timer = setInterval(() => {
    start++;
    el.textContent = start;
    if (start >= end) clearInterval(timer);
  }, stepTime);
}

document.addEventListener('DOMContentLoaded', () => {
  // Vérifie si l’animation a déjà été jouée
  const alreadyAnimated = sessionStorage.getItem('heroAnimated');

  if (!alreadyAnimated) {
    // Joue l'animation visuelle
    document.querySelector('.hero-content').classList.add('animate-fadeInUp');

    // Lance les compteurs
    document.querySelectorAll('.stat-number').forEach(span => {
      const target = parseInt(span.getAttribute('data-count'), 10);
      animateCount(span, target);
    });

    // Marque comme déjà joué pour cette session
    sessionStorage.setItem('heroAnimated', 'true');
  } else {
    // Si déjà animé, afficher directement les bons chiffres
    document.querySelectorAll('.stat-number').forEach(span => {
      const target = parseInt(span.getAttribute('data-count'), 10);
      span.textContent = target;
    });
  }
});



function initFAQAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (!accordionItems.length) return;

    // Animation d'entrée de la section
    gsap.from('.faq-accordion', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#faq',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    accordionItems.forEach((item, index) => {
        const btn = item.querySelector('.accordion-btn');
        const content = item.querySelector('.accordion-content');
        const innerContent = item.querySelector('.accordion-content-inner');
        const icon = btn.querySelector('i');

        // Animation d'entrée des items
        gsap.from(item, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });

        btn.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Fermer tous les autres items
            if (!isActive) {
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        closeAccordion(otherItem);
                    }
                });
            }

            // Basculer l'état actuel
            if (isActive) {
                closeAccordion(item);
            } else {
                openAccordion(item);
            }
        });

        function openAccordion(element) {
            element.classList.add('active');
            
            // Animation GSAP pour l'ouverture
            gsap.to(content, {
                maxHeight: content.scrollHeight + 'px',
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.to(innerContent, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });
                }
            });
            
            gsap.to(icon, {
                rotate: 180,
                duration: 0.3
            });
            
            // Animation 3D subtile
            gsap.to(element, {
                rotateX: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        }

        function closeAccordion(element) {
            element.classList.remove('active');
            
            // Animation GSAP pour la fermeture
            gsap.to(innerContent, {
                opacity: 0,
                y: -10,
                duration: 0.2
            });
            
            gsap.to(content, {
                maxHeight: 0,
                duration: 0.4,
                delay: 0.1,
                ease: 'power2.in'
            });
            
            gsap.to(icon, {
                rotate: 0,
                duration: 0.3
            });
            
            // Reset animation 3D
            gsap.to(element, {
                rotateX: 0,
                duration: 0.3
            });
        }
    });

    // Animation du bouton CTA
    gsap.from('.faq-cta a', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: '.faq-cta',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}

// Initialiser la FAQ quand le DOM est prêt
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier que GSAP est chargé
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initFAQAccordion();
    } else {
        console.error('GSAP is not loaded');
        // Fallback basique si GSAP n'est pas disponible
        document.querySelectorAll('.accordion-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.accordion-item');
                item.classList.toggle('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = item.classList.contains('active') 
                    ? content.scrollHeight + 'px' 
                    : '0';
            });
        });
    }
});