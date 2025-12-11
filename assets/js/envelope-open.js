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

/* Ocultar botón música al inicio */
musicBtn.style.opacity = "0";
musicBtn.style.pointerEvents = "none";

/* Animación inicial del sello */
seal.classList.add("idle-pulse");


/* ========================================================= */
/* AUDIO                                                     */
/* ========================================================= */

function fadeInAudio(audio, duration = 2000) {
    audio.volume = 0;
    audio.play().catch(() => {});

    let start = null;
    function animate(ts) {
        if (!start) start = ts;
        const progress = ts - start;
        audio.volume = Math.min(progress / duration, 1);

        if (progress < duration) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

function fadeOutAudio(audio, duration = 1600) {
    let startVol = audio.volume;
    let start = null;

    function animate(ts) {
        if (!start) start = ts;
        const progress = ts - start;

        audio.volume = Math.max(startVol - (progress / duration), 0);

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            audio.pause();
            audio.volume = 1;
        }
    }
    requestAnimationFrame(animate);
}


/* ========================================================= */
/* APERTURA DEL SOBRE – VERSIÓN CINEMÁTICA                   */
/* ========================================================= */

seal.addEventListener("click", () => {

    /* 1. Vibración bonita */
    seal.classList.remove("idle-pulse");
    seal.classList.add("shake");

    /* 2. Música */
    fadeInAudio(bgSong, 2000);
    musicPlaying = true;
    musicIcon.src = "assets/img/pause.svg";
    musicBtn.classList.add("music-playing");

    /* Bloquea clics sobre la overlay */
    overlay.style.pointerEvents = "none";

    /* 3. Retraso suave antes del despliegue */
    setTimeout(() => {
        seal.classList.remove("shake");
        envelope.classList.add("open");

        /* 4. Fade-out visual del overlay */
        overlay.classList.add("fade-out");

        /* 5. Remover overlay y sobre después de la transición REAL */
        const transitionTime = 1600;

        const envelopeEl = document.querySelector(".envelope");

        setTimeout(() => {
            /* Desaparece overlay */
            overlay.style.display = "none";

            /* animación de caída suave del sobre */
            envelopeEl.classList.add("drop-exit");

            /* desaparecer sobre totalmente */
            setTimeout(() => {
                envelopeEl.style.display = "none";

                /* ⭐ MOSTRAR CONTENIDO Y FOOTER ⭐ */
                document.body.classList.add("content-ready");

            }, 1200); // tiempo de la animación drop-exit

        }, transitionTime + 50);

        /* 6. Mostrar el botón de música */
        setTimeout(() => {
            musicBtn.style.opacity = "1";
            musicBtn.style.pointerEvents = "auto";
        }, transitionTime + 400);

    }, 300);
});


/* ========================================================= */
/* BOTÓN DE MÚSICA                                           */
/* ========================================================= */

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
