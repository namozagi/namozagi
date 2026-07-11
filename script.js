document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu if open

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 7000); // 7 seconds per slide for better reading time
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    if (slides.length > 0) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopSlider();
                startSlider();
            });
        });

        startSlider();
    }

    // --- Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 120;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
    
    // --- Mobile Touch support for Flip Cards ---
    const flipCards = document.querySelectorAll('.modern-service-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle a class or just let CSS :hover handle it natively on iOS/Android
            // Some mobile browsers require a click listener to trigger hover states
        });
    });

    // --- Video Controls ---
    const aboutVideo = document.getElementById('aboutVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');

    if (aboutVideo && playPauseBtn && muteBtn) {
        // Toggle Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (aboutVideo.paused) {
                aboutVideo.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                aboutVideo.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Toggle Mute/Unmute
        muteBtn.addEventListener('click', () => {
            if (aboutVideo.muted) {
                aboutVideo.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                aboutVideo.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }
});
