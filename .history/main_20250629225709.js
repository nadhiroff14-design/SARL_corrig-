document.addEventListener('DOMContentLoaded', function() {
    // Initialisation AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });

    // LazyLoad
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

    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinksItems.forEach(item => {
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
        header.classList.toggle('scrolled', window.scrollY > 100);
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            backToTopBtn.classList.toggle('active', window.scrollY > 300);
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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

    // Initialisation de la carte
    if (document.getElementById('map')) {
        initMap();
    }

    function initMap() {
        const rgzLocation = { lat: 6.3698483, lng: 2.4113857 };
        const map = L.map('map').setView(rgzLocation, 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);
        
        const customIcon = L.icon({
            iconUrl: 'RGZ.jpg',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        
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

    // Animation des compteurs
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
    
    // Détection du scroll pour les animations
    function handleScrollAnimations() {
        animateTimeline();
        
        // Animation des compteurs
        const statsSection = document.querySelector('.stats-section');
        if (statsSection && isElementInViewport(statsSection)) {
            animateCounters();
        }
    }
    
    // Initialisation au chargement
    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);
});

// Fonction pour vérifier si un élément est dans le viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
    );
}

// Animation de la timeline
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