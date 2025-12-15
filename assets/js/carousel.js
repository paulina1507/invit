document.addEventListener("DOMContentLoaded", () => {

  let index = 0;

  const track = document.querySelector(".carousel-track");
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");

  if (!track || !btnLeft || !btnRight) return;

  function getSlides() {
    return track.querySelectorAll(".carousel-img");
  }

  function updateCarousel() {
    const slides = getSlides();
    if (!slides.length) return;

    track.style.transform = `translateX(-${index * 100}%)`;
  }

  btnRight.addEventListener("click", () => {
    const slides = getSlides();
    if (!slides.length) return;

    index = (index + 1) % slides.length;
    updateCarousel();
  });

  btnLeft.addEventListener("click", () => {
    const slides = getSlides();
    if (!slides.length) return;

    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  /* 🔁 Esperar a que el JSON cargue las imágenes */
  const observer = new MutationObserver(() => {
    const slides = getSlides();
    if (slides.length) {
      index = 0;
      updateCarousel();
      observer.disconnect();
    }
  });

  observer.observe(track, { childList: true });
});
