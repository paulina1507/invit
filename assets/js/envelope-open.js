/* ----------------------------- */
/* REFERENCIAS                   */
/* ----------------------------- */

const envelope = document.querySelector(".envelope");
const seal = document.getElementById("sealButton");
const overlay = document.getElementById("envelopeOverlay");

/* 🔊 ÚNICA REFERENCIA REAL AL AUDIO */
const bgSong = document.getElementById("bgSong");

/* Botón flotante */
const musicBtn = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

let musicPlaying = false;

function fadeInAudio(audio, duration = 2000) {
    audio.volume = 0;
    audio.play().catch(()=>{});

    let start = null;

    function fade(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // volumen 0 → 1
        audio.volume = Math.min(progress / duration, 1);

        if (progress < duration) {
            requestAnimationFrame(fade);
        }
    }

    requestAnimationFrame(fade);
}

function fadeOutAudio(audio, duration = 1600) {
    let startVolume = audio.volume;
    let start = null;

    function fade(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // volumen va desde el actual → 0
        audio.volume = Math.max(startVolume - (progress / duration), 0);

        if (progress < duration) {
            requestAnimationFrame(fade);
        } else {
            audio.pause();
            audio.volume = 1; // restauramos para la siguiente vez
        }
    }

    requestAnimationFrame(fade);
}

/* ----------------------------- */
/* ABRIR SOBRE                   */
/* ----------------------------- */

seal.addEventListener("click", () => {

    // Vibración
    seal.classList.add("shake");

    // ⭐ Reproducir música justo al abrir
    fadeInAudio(bgSong, 2000);
    musicPlaying = true;
    musicIcon.src = "assets/img/pause.svg";

    // activar animación de pulso
    musicBtn.classList.add("music-playing");

    overlay.style.pointerEvents = "none";

    setTimeout(() => {

        seal.classList.remove("shake");
        envelope.classList.add("open");

        overlay.classList.add("fade-out");

        setTimeout(() => {
            overlay.style.display = "none";
        }, 1800);

    }, 300);
});


/* ----------------------------- */
/* BOTÓN PLAY/PAUSE              */
/* ----------------------------- */

musicBtn.addEventListener("click", () => {

    if (!musicPlaying) {
        fadeInAudio(bgSong, 2000);
        musicPlaying = true;
        musicIcon.src = "assets/img/pause.svg";

        // Activa efecto pulso
        musicBtn.classList.add("music-playing");

    } else {
        fadeOutAudio(bgSong, 1400);
        musicPlaying = false;
        musicIcon.src = "assets/img/play.svg";

        // Quita efecto pulso
        musicBtn.classList.remove("music-playing");
    }

});


