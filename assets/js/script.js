// COUNTDOWN
const date = new Date("January 12, 2026 16:00:00").getTime();

setInterval(() => {
    let now = new Date().getTime();
    let diff = date - now;

    document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
    document.getElementById("minutes").innerText = Math.floor((diff / (1000 * 60)) % 60);
    document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
}, 1000);

// SCROLL FADE
const elements = document.querySelectorAll(".fade");

function reveal() {
    elements.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        if (pos < window.innerHeight - 70) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();
