function initReveals() {

  const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fx"
  );

  if (!reveals.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -120px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}

document.addEventListener("reveal:init", initReveals);
document.addEventListener("DOMContentLoaded", initReveals);
