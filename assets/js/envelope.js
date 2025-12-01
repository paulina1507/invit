const btn = document.getElementById("openEnvelopeBtn");
const envelope = document.querySelector(".envelope");
const introScreen = document.getElementById("introEnvelope");
const audio = document.getElementById("bgSong");

btn.addEventListener("click", () => {

    // 1. Abrir sobre
    envelope.classList.add("opened");

    // 2. Reproducir audio
    audio.play();

    // 3. Desvanecer pantalla después de animación
    setTimeout(() => {
        introScreen.classList.add("fade-out");
    }, 1800);
});
