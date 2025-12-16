document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const overlay = document.getElementById("envelopeOverlay");
  const envelope = document.querySelector(".envelope");
  const letter = document.querySelector(".letter");
  const seal = document.getElementById("sealButton");

  const musicBtn = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const bgSong = document.getElementById("bgSong");

  const heroNames = document.querySelector(".hero-names");
  const heroCount = document.querySelector(".hero-count");

  let opened = false;
  let musicPlaying = false;

  /* ================= ESTADO INICIAL ================= */

  body.classList.add("lock-scroll");
  body.classList.remove("content-ready");

  if (heroNames) {
    heroNames.style.opacity = "0";
    heroNames.style.transform = "translateY(16px)";
  }

  if (heroCount) {
    heroCount.style.opacity = "0";
    heroCount.style.transform = "translateY(16px)";
  }

  if (musicBtn) {
    musicBtn.style.opacity = "0";
    musicBtn.style.pointerEvents = "none";
  }

  if (!overlay || !envelope || !letter || !seal) return;

  /* ================= APERTURA SOBRE ================= */

  seal.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    /* feedback sello */
    seal.classList.add("press");
    setTimeout(() => seal.classList.add("fade-out"), 160);

    /* abre sobre */
    envelope.classList.add("open");

    /* música */
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

    /* carta fullscreen */
    setTimeout(() => {
      letter.classList.add("hero");
    }, 480);

    /* aparecen nombres */
    setTimeout(() => {
      if (heroNames) {
        heroNames.style.opacity = "1";
        heroNames.style.transform = "translateY(0)";
      }

      /* liberar scroll */
      body.classList.remove("lock-scroll");
    }, 820);

    /* aparece contador */
    setTimeout(() => {
      if (heroCount) {
        heroCount.style.opacity = "1";
        heroCount.style.transform = "translateY(0)";
      }
    }, 1080);

    /* overlay se va */
    overlay.classList.add("fade-out");
    setTimeout(() => overlay.remove(), 1200);

    /* UI global */
    setTimeout(() => {
      body.classList.add("content-ready");

      if (musicBtn) {
        musicBtn.style.opacity = "1";
        musicBtn.style.pointerEvents = "auto";
      }
    }, 900);
  });

  /* ================= BOTÓN MÚSICA ================= */

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
