// js/gallery.js - Funcionalidad del carrusel
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

// Inicializar carrusel
function initCarousel() {
    showSlide(currentSlideIndex);
    
    // Auto-avance cada 5 segundos
    setInterval(() => {
        moveSlide(1);
    }, 5000);
}

// Mover slide
function moveSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

// Ir a slide específico
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Mostrar slide
function showSlide(index) {
    const carouselContainer = document.querySelector('.carousel-container');
    const slideWidth = slides[0].clientWidth;
    
    carouselContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Eventos táctiles para móvil
let startX = 0;
let endX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.carousel-container').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (startX - endX > swipeThreshold) {
        // Swipe izquierda - siguiente
        moveSlide(1);
    } else if (endX - startX > swipeThreshold) {
        // Swipe derecha - anterior
        moveSlide(-1);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCarousel);

// Recalcular en resize
window.addEventListener('resize', () => {
    showSlide(currentSlideIndex);
});
