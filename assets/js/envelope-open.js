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

  if (musicBtn) {
    musicBtn.style.opacity = "0";
    musicBtn.style.pointerEvents = "none";
  }

  if (!overlay || !envelope || !letter || !seal) return;

  /* ================= APERTURA DEL SOBRE ================= */

  seal.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    /* feedback visual del sello */
    seal.classList.add("press");
    setTimeout(() => seal.classList.add("fade-out"), 160);

    /* abrir sobre */
    envelope.classList.add("open");

    /* ================= AUDIO ================= */
    if (bgSong && musicIcon) {
      const tryPlay = () => {
        bgSong.volume = 0;
        bgSong
          .play()
          .then(() => {
            musicPlaying = true;
            musicIcon.src = "assets/img/pause.svg";

            let vol = 0;
            const fade = setInterval(() => {
              vol += 0.05;
              bgSong.volume = Math.min(vol, 1);
              if (vol >= 1) clearInterval(fade);
            }, 80);
          })
          .catch(() => {});
      };

      if (bgSong.readyState >= 2) {
        tryPlay();
      } else {
        bgSong.addEventListener("canplay", tryPlay, { once: true });
      }
    }

    /* ================= CARTA FULLSCREEN ================= */

    setTimeout(() => {
      letter.classList.add("hero");
      letter.classList.add("unfolded");
    }, 450);

    /* ================= HERO ================= */

    setTimeout(() => {
      if (heroNames) {
        heroNames.style.opacity = "1";
        heroNames.style.transform = "translateY(0)";
      }

      body.classList.remove("lock-scroll");
    }, 850);

    setTimeout(() => {
      if (heroCount) {
        heroCount.style.opacity = "1";
        heroCount.style.transform = "translateY(0)";
      }
    }, 1100);

    /* ================= OVERLAY ================= */

    overlay.classList.add("fade-out");
    setTimeout(() => overlay.remove(), 1250);

    /* ================= UI GLOBAL (CLAVE) ================= */

    setTimeout(() => {
      body.classList.add("content-ready");

      // fuerza recálculo real de fixed / observers
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("scroll"));
        window.dispatchEvent(new Event("resize"));
      });

      if (musicBtn) {
        musicBtn.style.opacity = "1";
        musicBtn.style.pointerEvents = "auto";
      }
    }, 1350);
  });

  /* ================= BOTÓN DE MÚSICA ================= */

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
