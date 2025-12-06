document.addEventListener("DOMContentLoaded", () => {
    let index = 0;

    const track  = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-img");
    const btnLeft  = document.querySelector(".carousel-btn.left");
    const btnRight = document.querySelector(".carousel-btn.right");

    if (!track || slides.length === 0) return;

    const total = slides.length;

    if (btnRight) {
        btnRight.addEventListener("click", () => {
            index = (index + 1) % total;
            track.style.transform = `translateX(-${index * 100}%)`;
        });
    }

    if (btnLeft) {
        btnLeft.addEventListener("click", () => {
            index = (index - 1 + total) % total;
            track.style.transform = `translateX(-${index * 100}%)`;
        });
    }
});
