fetch("./assets/js/evento.json")
  .then((res) => res.json())
  .then((data) => {
    /* ================= META ================= */
    if (data.meta?.title) {
      document.title = data.meta.title;
    }

    /* ================= LOGO ================= */
    const logo = document.querySelector(".logo");
    if (logo && data.logo) {
      logo.textContent = data.logo;
    }

    /* ================= NAVBAR ================= */
    const navMenu = document.getElementById("navMenu");
    if (navMenu && data.navbar?.items) {
      navMenu.innerHTML = "";
      data.navbar.items.forEach((item) => {
        navMenu.insertAdjacentHTML(
          "beforeend",
          `<li><a href="${item.href}">${item.label}</a></li>`
        );
      });
    }

    /* ================= FOOTER ================= */
    const footer = document.getElementById("footer-text");
    if (footer && data.footer?.text) {
      footer.innerHTML = data.footer.text;
    }

    /* ================= AUDIO ================= */
    const audioSource = document.querySelector("#bgSong source");
    const musicIcon = document.getElementById("musicIcon");

    if (audioSource && data.audio?.src) {
      audioSource.src = `assets/audio/${data.audio.src}`;
    }
    if (musicIcon && data.audio?.icons?.play) {
      musicIcon.src = `assets/img/${data.audio.icons.play}`;
    }

    /* ================= HERO ================= */
    if (data.hero) {
      document.getElementById("hero-names").textContent =
        `${data.hero.names.novia} & ${data.hero.names.novio}`;

      document.querySelector(".hero-bg").style.backgroundImage =
        `url('assets/img/${data.hero.background}')`;

      const labels = data.hero.countdown_labels;
      if (labels) {
        document.getElementById("label-dias").textContent = labels.dias;
        document.getElementById("label-horas").textContent = labels.horas;
        document.getElementById("label-minutos").textContent = labels.minutos;
        document.getElementById("label-segundos").textContent = labels.segundos;
      }
    }

    /* ================= PRESENTACIÓN ================= */
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

    /* ================= UBICACIÓN ================= */
    const u = data.ubicacion;
    if (u) {
      document.getElementById("ubicacion-titulo").textContent = u.titulo;

      const lista = document.getElementById("ubicacion-lista");
      lista.innerHTML = "";

      u.lugares.forEach((lugar) => {
        lista.insertAdjacentHTML(
          "beforeend",
          `
          <div class="ubicacion-card reveal">
            <h3 class="ubicacion-subtitle">${lugar.tipo}</h3>
            <div class="ubicacion-hora">${lugar.hora}</div>
            <div class="ubicacion-lugar">${lugar.lugar}</div>
            <div class="ubicacion-direccion">
              ${lugar.direccion.join("<br>")}
            </div>
            <a href="${lugar.mapa}" target="_blank" class="btn-ubicacion">
              Ver ubicación
            </a>
          </div>
          `
        );
      });
    }

    /* ================= PROGRAMA (TIMELINE) ================= */
    const programa = data.programa;
    if (programa) {
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
    const v = data.vestimenta;
    if (v) {
      document.getElementById("vestimenta-titulo").textContent = v.titulo;
      document.getElementById("vestimenta-icon").src =
        `assets/img/${v.icono}`;
      document.getElementById("vestimenta-formal").textContent = v.formal;
      document.getElementById("vestimenta-mujeres").innerHTML = v.mujeres;
      document.getElementById("vestimenta-hombres").innerHTML = v.hombres;
    }

    /* ================= REGALOS ================= */
    const r = data.regalos;
    if (r) {
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
    const g = data.galeria;
    if (g) {
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
    const rsvp = data.rsvp;
    if (rsvp?.enabled) {
      const rsvpForm = document.getElementById("rsvp-form");
      const rsvpFinal = document.getElementById("rsvp-final");

      if (rsvpForm && rsvpFinal) {
        rsvpForm.querySelector(".arco-title").textContent = rsvp.titulo || "";
        rsvpForm.querySelector(".rsvp-text").innerHTML = rsvp.texto || "";
        rsvpForm.querySelector(".rsvp-note").innerHTML = rsvp.nota || "";

        const btnYes = rsvpForm.querySelector(".rsvp-btn.yes");
        const btnNo = rsvpForm.querySelector(".rsvp-btn.no");

        if (btnYes) btnYes.textContent = rsvp.botones?.si || "Sí";
        if (btnNo) btnNo.textContent = rsvp.botones?.no || "No";

      }
    }

    /* ================= 🔐 GUARDAR DATA GLOBAL ================= */
    window.__EVENT_DATA__ = data;

    /* ================= 🔔 DOM DINÁMICO LISTO ================= */
    document.dispatchEvent(new Event("event:data:ready"));
  })
  .catch((err) => {
    console.error("Error cargando evento.json:", err);
    document.body.classList.add("content-ready");
  });
