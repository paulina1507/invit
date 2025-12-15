document.addEventListener("DOMContentLoaded", () => {

  /* ============================= */
  /* REFERENCIAS                   */
  /* ============================= */

  const body = document.body;
  const overlay = document.getElementById("envelopeOverlay");
  const seal = document.getElementById("sealButton");
  const envelope = document.querySelector(".envelope");
  const letter = document.querySelector(".letter");

  const musicBtn = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const bgSong = document.getElementById("bgSong");

  let opened = false;
  let musicPlaying = false;

  /* ============================= */
  /* ESTADO INICIAL                */
  /* ============================= */

  body.classList.add("lock-scroll");
  body.classList.remove("content-ready");

  if (musicBtn) {
    musicBtn.style.opacity = "0";
    musicBtn.style.pointerEvents = "none";
  }

  if (!overlay || !seal || !envelope || !letter) {
    console.warn("Envelope structure incomplete");
    return;
  }

  /* ============================= */
  /* CLICK EN SELLO                */
  /* ============================= */

  seal.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    /* hunde sello */
    seal.style.pointerEvents = "none";
    seal.classList.add("press");

    setTimeout(() => {
      seal.classList.add("fade-out");
    }, 180);

    /* 🎵 música */
    if (bgSong && musicIcon) {
      bgSong.volume = 0;
      bgSong.play().catch(() => {});
      musicPlaying = true;
      musicIcon.src = "assets/img/pause.svg";

      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.05;
        bgSong.volume = Math.min(vol, 1);
        if (vol >= 1) clearInterval(fade);
      }, 80);
    }

    /* ✉️ abre sobre */
    setTimeout(() => {
      envelope.classList.add("open");
    }, 420);

    /* 📄 carta → fullscreen (CLAVE) */
    setTimeout(() => {
      letter.classList.add("hero");
    }, 1100);

    /* 🌿 revela sitio */
    setTimeout(() => {

      body.classList.add("content-ready");
      body.classList.remove("lock-scroll");

      if (musicBtn) {
        musicBtn.style.opacity = "1";
        musicBtn.style.pointerEvents = "auto";
      }

      /* 🔥 activar animaciones */
      document.dispatchEvent(new Event("reveal:init"));
      document.dispatchEvent(new Event("timeline:ready"));

      overlay.classList.add("fade-out");
      setTimeout(() => overlay.remove(), 1200);

    }, 1400);
  });

  /* ============================= */
  /* BOTÓN DE MÚSICA               */
  /* ============================= */

  if (musicBtn && bgSong && musicIcon) {
    musicBtn.addEventListener("click", () => {
      if (musicPlaying) {
        bgSong.pause();
        musicIcon.src = "assets/img/play.svg";
      } else {
        bgSong.play().catch(() => {});
        musicIcon.src = "assets/img/pause.svg";
      }
      musicPlaying = !musicPlaying;
    });
  }

});
