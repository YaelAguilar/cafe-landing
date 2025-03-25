document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;
            
            console.log('Form submitted:', { nombre, email, telefono, mensaje });
            
            alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
            
            contactForm.reset();
        });
    }
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            console.log('Newsletter subscription:', email);
            
            alert('¡Gracias por suscribirte a nuestro boletín!');
            
            this.reset();
        });
    }
    
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const youtubeFrame = document.getElementById('youtubeFrame');
    const closeModal = document.querySelector('.close-modal');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            youtubeFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            youtubeFrame.src = '';
            videoModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            youtubeFrame.src = '';
            videoModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('show')) {
            youtubeFrame.src = '';
            videoModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--primary-color) !important;
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: linear-gradient(90deg, var(--dark-blue), var(--cyan));
            padding: 20px;
            z-index: 1000;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);
});