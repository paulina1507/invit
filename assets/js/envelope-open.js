const sealBtn = document.getElementById("sealButton");
const envelope = document.querySelector(".premium-envelope");
const overlay = document.getElementById("EnvelopeIntro");
const audio = document.getElementById("bgSong");

sealBtn.addEventListener("click", () => {

    // animar pliegues
    envelope.classList.add("envelope-open");

    // fade out
    setTimeout(() => {
        overlay.style.opacity = "0";
    }, 1200);

    setTimeout(() => {
        overlay.style.display = "none";
    }, 1900);

    // música
    audio.play();
});
