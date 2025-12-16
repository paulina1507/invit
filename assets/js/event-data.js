fetch("./assets/js/evento.json")
  .then((res) => res.json())
  .then((data) => {
    /* ================= 🔧 HELPERS ================= */

    const isSectionEnabled = (id) => {
      return data[id]?.enabled !== false;
    };

    /* ================= META ================= */

    if (data.meta?.title) {
      document.title = data.meta.title;
    }

    if (data.meta?.lang) {
      document.documentElement.lang = data.meta.lang;
    }

    if (data.meta?.favicon) {
      let link =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = `assets/img/${data.meta.favicon}`;
      document.head.appendChild(link);
    }

    /* ================= LOGO ================= */

    const logoEl = document.querySelector(".logo");
    if (logoEl && data.logo?.type === "text") {
      logoEl.textContent = data.logo.value;
    }

    /* ================= AUDIO ================= */

    const audio = document.getElementById("bgSong");
    const musicToggle = document.getElementById("musicToggle");
    const musicIcon = document.getElementById("musicIcon");

    if (audio && data.audio?.enabled) {
      audio.src = `assets/audio/${data.audio.src}`;
      audio.loop = data.audio.loop ?? true;
      audio.volume = data.audio.volume ?? 1;

      if (musicIcon && data.audio.icons?.play) {
        musicIcon.src = `assets/img/${data.audio.icons.play}`;
      }

      if (data.audio.autoplay_on_open) {
        document.addEventListener("envelope:opened", () => {
          if (data.audio.fade_in) {
            audio.volume = 0;
            audio.play();
            let v = 0;
            const fade = setInterval(() => {
              v += 0.05;
              audio.volume = Math.min(v, data.audio.volume);
              if (v >= data.audio.volume) clearInterval(fade);
            }, 100);
          } else {
            audio.play();
          }
        });
      }

      if (musicToggle && musicIcon) {
        musicToggle.addEventListener("click", () => {
          if (audio.paused) {
            audio.play();
            musicIcon.src = `assets/img/${data.audio.icons.pause}`;
          } else {
            audio.pause();
            musicIcon.src = `assets/img/${data.audio.icons.play}`;
          }
        });
      }
    }

    /* ================= OPENING ================= */

    if (data.opening?.enabled) {
      const phraseEl = document.getElementById("openingPhrase");
      const scrollHintEl = document.getElementById("scrollHint");

      if (phraseEl && data.opening.phrase?.enabled) {
        phraseEl.textContent = data.opening.phrase.text;
        phraseEl.style.display = "block";

        setTimeout(() => {
          phraseEl.classList.add("hide");
        }, data.opening.phrase.duration || 1400);
      }

      if (scrollHintEl && data.opening.scroll_hint?.enabled) {
        scrollHintEl.textContent = data.opening.scroll_hint.text;
        scrollHintEl.style.display = "block";

        window.addEventListener(
          "scroll",
          () => {
            scrollHintEl.classList.add("hide");
          },
          { once: true }
        );
      }
    }

    /* ================= NAVBAR ================= */

    const navMenu = document.getElementById("navMenu");
    if (navMenu && data.navbar?.enabled) {
      navMenu.innerHTML = "";

      data.navbar.items.forEach((item) => {
        if (!isSectionEnabled(item.id)) return;

        navMenu.insertAdjacentHTML(
          "beforeend",
          `<li><a href="${item.href}">${item.label}</a></li>`
        );
      });
    }

    /* ================= HERO ================= */

    if (isSectionEnabled("hero")) {
      const hero = data.hero;
      if (hero) {
        document.getElementById(
          "hero-names"
        ).textContent = `${hero.names.novia} & ${hero.names.novio}`;

        document.querySelector(
          ".hero-bg"
        ).style.backgroundImage = `url('assets/img/${hero.background}')`;

        const labels = hero.countdown_labels;
        if (labels) {
          document.getElementById("label-dias").textContent = labels.dias;
          document.getElementById("label-horas").textContent = labels.horas;
          document.getElementById("label-minutos").textContent = labels.minutos;
          document.getElementById("label-segundos").textContent =
            labels.segundos;
        }
      }
    }

    /* ================= PRESENTACIÓN ================= */

    if (isSectionEnabled("presentacion")) {
      const p = data.presentacion;
      if (p) {
        document.getElementById("titulo-presentacion").textContent = p.titulo;
        document.getElementById("nombres-presentacion").textContent = p.nombres;
        document.getElementById("frase-presentacion").textContent = p.frase;

        document.getElementById("padres-novia").innerHTML =
          p.padres?.novia?.join("<br>") || "";
        document.getElementById("padres-novio").innerHTML =
          p.padres?.novio?.join("<br>") || "";
        document.getElementById("padrinos").innerHTML =
          p.padrinos?.join("<br>") || "";

        document.getElementById("label-padres-novia").textContent =
          p.labels?.padres_novia || "";
        document.getElementById("label-padres-novio").textContent =
          p.labels?.padres_novio || "";
        document.getElementById("label-padrinos").textContent =
          p.labels?.padrinos || "";

        document.getElementById("texto-final-presentacion").textContent =
          p.texto_final || "";

        const img = document.querySelector(".arco-img img");
        if (img && p.imagen) img.src = `assets/img/${p.imagen}`;
      }
    }

    /* ================= UBICACIÓN ================= */

    if (isSectionEnabled("ubicacion")) {
      const u = data.ubicacion;
      document.getElementById("ubicacion-titulo").textContent = u.titulo;

      const lista = document.getElementById("ubicacion-lista");
      lista.innerHTML = "";

      u.lugares
        .filter(
          (l) => l?.enabled !== false && l.lugar && l.hora
        )
        .forEach((lugar) => {
          lista.insertAdjacentHTML(
            "beforeend",
            `
            <div class="ubicacion-card reveal">
              <h3 class="ubicacion-subtitle">${lugar.tipo}</h3>
              <div class="ubicacion-hora">${lugar.hora}</div>
              <div class="ubicacion-lugar">${lugar.lugar}</div>
              ${
                lugar.direccion?.length
                  ? `<div class="ubicacion-direccion">${lugar.direccion.join(
                      "<br>"
                    )}</div>`
                  : ""
              }
              ${
                lugar.mapa
                  ? `<a href="${lugar.mapa}" target="_blank" class="btn-ubicacion">Ver ubicación</a>`
                  : ""
              }
            </div>
          `
          );
        });
    }

    /* ================= PROGRAMA ================= */

    if (isSectionEnabled("programa")) {
      const programa = data.programa;
      document.getElementById("programa-titulo").textContent = programa.titulo;

      const timeline = document.getElementById("timeline-programa");
      timeline.innerHTML = "";

      programa.items.forEach((item) => {
        timeline.insertAdjacentHTML(
          "beforeend",
          `
          <div class="item ${item.lado} reveal">
            <img class="icon" src="assets/img/${item.icono}">
            <div class="hora">${item.hora}</div>
            <div class="texto">${item.texto}</div>
          </div>
        `
        );
      });
    }

    /* ================= VESTIMENTA ================= */

    if (isSectionEnabled("vestimenta")) {
      const v = data.vestimenta;
      document.getElementById("vestimenta-titulo").textContent = v.titulo;
      document.getElementById(
        "vestimenta-icon"
      ).src = `assets/img/${v.icono}`;
      document.getElementById("vestimenta-formal").textContent = v.formal;
      document.getElementById("vestimenta-mujeres").innerHTML = v.mujeres;
      document.getElementById("vestimenta-hombres").innerHTML = v.hombres;
    }

    /* ================= REGALOS ================= */

    if (isSectionEnabled("regalos")) {
      const r = data.regalos;
      document.getElementById("regalos-titulo").textContent = r.titulo;
      document.querySelector(".regalos-desc").innerHTML = r.descripcion;

      const cont = document.getElementById("regalos-inner");
      cont.innerHTML = "";

      r.items.forEach((item) => {
        cont.insertAdjacentHTML(
          "beforeend",
          `
          <div class="regalo-item reveal-zoom">
            <img src="assets/img/${item.icono}" class="regalo-icon">
            <p class="regalo-label">${item.label}</p>
          </div>
        `
        );
      });
    }

    /* ================= GALERÍA ================= */

    if (isSectionEnabled("galeria")) {
      const g = data.galeria;
      document.getElementById("galeria-titulo").textContent = g.titulo;

      const track = document.getElementById("carousel-track");
      track.innerHTML = "";

      g.imagenes.forEach((img) => {
        track.insertAdjacentHTML(
          "beforeend",
          `<img src="assets/img/${img}" class="carousel-img">`
        );
      });
    }

    /* ================= RSVP ================= */

    if (isSectionEnabled("rsvp")) {
      const rsvp = data.rsvp;
      const rsvpForm = document.getElementById("rsvp-form");

      if (rsvp?.enabled && rsvpForm) {
        rsvpForm.querySelector(".arco-title").textContent = rsvp.titulo || "";
        rsvpForm.querySelector(".rsvp-text").innerHTML = rsvp.texto || "";
        rsvpForm.querySelector(".rsvp-note").innerHTML = rsvp.nota || "";

        rsvpForm.querySelector(".rsvp-btn.yes").textContent =
          rsvp.botones?.si || "Sí";
        rsvpForm.querySelector(".rsvp-btn.no").textContent =
          rsvp.botones?.no || "No";
      }
    }

    /* ================= FOOTER ================= */

    if (data.footer?.enabled) {
      const footer = document.getElementById("footer-text");
      if (footer) footer.innerHTML = data.footer.text;
    }

    /* ================= 🔐 GLOBAL ================= */

    window.__EVENT_DATA__ = data;
    document.dispatchEvent(new Event("event:data:ready"));
  })
  .catch((err) => {
    console.error("Error cargando evento.json:", err);
  });
