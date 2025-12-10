/* ----------------------------- */
/* REFERENCIAS                   */
/* ----------------------------- */

const envelope = document.querySelector(".envelope");
const seal = document.getElementById("sealButton");
const overlay = document.getElementById("envelopeOverlay");

const bgSong = document.getElementById("bgSong");
const musicBtn = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

let musicPlaying = false;

/* Ocultar botón de música al inicio */
musicBtn.style.opacity = "0";
musicBtn.style.pointerEvents = "none";

/* Animación inicial del sello */
seal.classList.add("idle-pulse");


/* ----------------------------- */
/* AUDIO                         */
/* ----------------------------- */

function fadeInAudio(audio, duration = 2000) {
    audio.volume = 0;
    audio.play().catch(()=>{});

    let start = null;
    function fade(ts) {
        if (!start) start = ts;
        let progress = ts - start;
        audio.volume = Math.min(progress / duration, 1);

        if (progress < duration) requestAnimationFrame(fade);
    }
    requestAnimationFrame(fade);
}

function fadeOutAudio(audio, duration = 1600) {
    let startVolume = audio.volume;
    let start = null;

    function fade(ts) {
        if (!start) start = ts;
        let progress = ts - start;

        audio.volume = Math.max(startVolume - (progress / duration), 0);

        if (progress < duration) {
            requestAnimationFrame(fade);
        } else {
            audio.pause();
            audio.volume = 1;
        }
    }
    requestAnimationFrame(fade);
}


/* ----------------------------- */
/* ABRIR SOBRE (VERSIÓN PRO)     */
/* ----------------------------- */

seal.addEventListener("click", () => {

    /* Quitar animación previa y mostrar la vibración */
    seal.classList.remove("idle-pulse");
    seal.classList.add("shake");

    /* Iniciar música */
    fadeInAudio(bgSong, 2000);
    musicPlaying = true;
    musicIcon.src = "assets/img/pause.svg";
    musicBtn.classList.add("music-playing");

    /* Evitar clics sobre overlay */
    overlay.style.pointerEvents = "none";

    /* Espera mínima para la vibración */
    setTimeout(() => {

        seal.classList.remove("shake");
        envelope.classList.add("open");

        /* Inicio del fade-out CSS */
        overlay.classList.add("fade-out");

        /* RETIRO REAL del overlay cuando la animación CSS termina */
        const transitionTime = 1600; // mismo tiempo que tu CSS
        setTimeout(() => {
            overlay.style.display = "none";
        }, transitionTime + 50); // 50ms por seguridad

        /* Mostrar botón de música con elegancia */
        setTimeout(() => {
            musicBtn.style.opacity = "1";
            musicBtn.style.pointerEvents = "auto";
        }, transitionTime);

    }, 300);
});


/* ----------------------------- */
/* BOTÓN PLAY/PAUSE              */
/* ----------------------------- */

musicBtn.addEventListener("click", () => {
    if (!musicPlaying) {
        fadeInAudio(bgSong, 1800);
        musicPlaying = true;
        musicIcon.src = "assets/img/pause.svg";
        musicBtn.classList.add("music-playing");
    } else {
        fadeOutAudio(bgSong, 1400);
        musicPlaying = false;
        musicIcon.src = "assets/img/play.svg";
        musicBtn.classList.remove("music-playing");
    }
});
