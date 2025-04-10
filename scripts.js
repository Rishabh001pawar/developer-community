document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: false });

    // Replace Feather Icons
    feather.replace();

    // Slider Functionality
    const slides = document.querySelector('.slides');
    const slideImages = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create navigation dots
    slideImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideImages.length;
        updateSlider();
    }

    // Auto-slide every 4 seconds
    setInterval(nextSlide, 4000);

    // Initial update
    updateSlider();
});