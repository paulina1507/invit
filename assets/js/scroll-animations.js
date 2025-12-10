// Selecciona todo lo que tenga revelación
const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fx"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));
