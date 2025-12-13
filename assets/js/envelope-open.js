document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const overlay = document.getElementById("envelopeOverlay");
  const seal = document.getElementById("sealButton");
  const envelope = document.querySelector(".envelope");

  const bgSong = document.getElementById("bgSong");
  const musicBtn = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");

  let musicPlaying = false;

  /* Estado inicial seguro */
  body.classList.remove("lock-scroll");
  body.classList.add("content-ready");

  musicBtn.style.opacity = "0";
  musicBtn.style.pointerEvents = "none";

  if (!overlay || !seal || !envelope) {
    overlay?.remove();
    return;
  }

  seal.classList.add("idle-pulse");

  function revealContent() {
    body.classList.add("content-ready");
    body.classList.remove("lock-scroll");

    overlay.classList.add("fade-out");
    setTimeout(() => overlay.remove(), 1200);

    musicBtn.style.opacity = "1";
    musicBtn.style.pointerEvents = "auto";

    document.dispatchEvent(new Event("reveal:init"));
    document.dispatchEvent(new Event("timeline:ready"));
  }

  seal.addEventListener("click", () => {

    seal.classList.remove("idle-pulse");
    seal.classList.add("shake");
    seal.style.pointerEvents = "none";

    if (bgSong) {
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

    setTimeout(() => {
      envelope.classList.add("open");
    }, 300);

    setTimeout(() => {
      revealContent();
    }, 1600);
  });

  musicBtn.addEventListener("click", () => {
    if (!bgSong) return;

    if (musicPlaying) {
      bgSong.pause();
      musicIcon.src = "assets/img/play.svg";
    } else {
      bgSong.play().catch(() => {});
      musicIcon.src = "assets/img/pause.svg";
    }
    musicPlaying = !musicPlaying;
  });

  /* Fallback automático por si nadie hace click */
  setTimeout(() => {
    if (!body.classList.contains("content-ready")) {
      revealContent();
    }
  }, 3500);

});
