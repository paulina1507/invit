/* ============================================================
   CARGA DEL ARCHIVO JSON DEL EVENTO
============================================================ */

fetch("./assets/js/evento.json")
  .then(res => res.json())
  .then(data => {

    /* ============================================================
       META
    ============================================================ */
    if (data.meta?.title) {
      document.title = data.meta.title;
    }

    /* ============================================================
       LOGO
    ============================================================ */
    const logo = document.querySelector(".logo");
    if (logo && data.logo) {
      logo.textContent = data.logo;
    }

    /* ============================================================
       NAVBAR
    ============================================================ */
    const navMenu = document.getElementById("navMenu");
    if (navMenu && data.navbar?.items) {
      navMenu.innerHTML = "";
      data.navbar.items.forEach(item => {
        navMenu.insertAdjacentHTML(
          "beforeend",
          `<li><a href="${item.href}">${item.label}</a></li>`
        );
      });
    }

    /* ============================================================
       FOOTER
    ============================================================ */
    const footer = document.getElementById("footer-text");
    if (footer && data.footer?.text) {
      footer.innerHTML = data.footer.text;
    }

    /* ============================================================
       AUDIO
    ============================================================ */
    const audioSource = document.querySelector("#bgSong source");
    const musicIcon = document.getElementById("musicIcon");

    if (audioSource && data.audio?.src) {
      audioSource.src = `assets/audio/${data.audio.src}`;
    }

    if (musicIcon && data.audio?.icons?.play) {
      musicIcon.src = `assets/img/${data.audio.icons.play}`;
    }

    /* ============================================================
       HERO
    ============================================================ */
    const heroNames = document.getElementById("hero-names");
    if (heroNames && data.hero?.names) {
      heroNames.textContent =
        `${data.hero.names.novia} & ${data.hero.names.novio}`;
    }

    const heroBg = document.querySelector(".hero-bg");
    if (heroBg && data.hero?.background) {
      heroBg.style.backgroundImage =
        `url('assets/img/${data.hero.background}')`;
    }

    if (data.hero?.countdown_labels) {
      document.getElementById("label-dias").textContent     = data.hero.countdown_labels.dias;
      document.getElementById("label-horas").textContent    = data.hero.countdown_labels.horas;
      document.getElementById("label-minutos").textContent  = data.hero.countdown_labels.minutos;
      document.getElementById("label-segundos").textContent = data.hero.countdown_labels.segundos;
    }

    /* ============================================================
       PRESENTACIÓN
    ============================================================ */
    const p = data.presentacion;

    if (p) {
      document.getElementById("titulo-presentacion").textContent  = p.titulo;
      document.getElementById("nombres-presentacion").textContent = p.nombres;
      document.getElementById("frase-presentacion").textContent   = p.frase;

      document.getElementById("padres-novia").innerHTML = p.padres?.novia?.join("<br>") || "";
      document.getElementById("padres-novio").innerHTML = p.padres?.novio?.join("<br>") || "";
      document.getElementById("padrinos").innerHTML     = p.padrinos?.join("<br>") || "";

      document.getElementById("texto-final-presentacion").textContent = p.texto_final || "";

      document.getElementById("label-padres-novia").textContent = p.labels?.padres_novia || "";
      document.getElementById("label-padres-novio").textContent = p.labels?.padres_novio || "";
      document.getElementById("label-padrinos").textContent     = p.labels?.padrinos || "";

      /* 🔧 SELECTOR CORREGIDO */
      const imgPresentacion = document.querySelector(".arco-img");
      if (imgPresentacion && p.imagen) {
        imgPresentacion.src = `assets/img/${p.imagen}`;
      }
    }

    /* ============================================================
       UBICACIÓN (OPCIONAL)
    ============================================================ */
    const ub = data.ubicacion;
    if (ub && document.getElementById("ubicacion-titulo")) {

      document.getElementById("ubicacion-titulo").textContent = ub.titulo;

      const lista = document.getElementById("ubicacion-lista");
      if (lista) {
        lista.innerHTML = "";

        ub.lugares.forEach(l => {
          lista.insertAdjacentHTML(
            "beforeend",
            `
            <div class="ubicacion-card">
              <h3 class="ubicacion-subtitle">${l.tipo.toUpperCase()}</h3>
              <p class="ubicacion-hora">${l.hora}</p>
              <h4 class="ubicacion-lugar">${l.lugar}</h4>
              <p class="ubicacion-direccion">${l.direccion.join("<br>")}</p>
              <a href="${l.mapa}" target="_blank" class="btn-ubicacion">VER MAPA</a>
            </div>
            `
          );
        });
      }
    }

    /* ============================================================
       PROGRAMA / TIMELINE
    ============================================================ */
    const programa = data.programa;
    if (programa) {

      document.getElementById("programa-titulo").textContent = programa.titulo;

      const timeline = document.getElementById("timeline-programa");
      timeline.innerHTML = "";

      programa.items.forEach(item => {
        timeline.insertAdjacentHTML(
          "beforeend",
          `
          <div class="item ${item.lado}">
            <img class="icon" src="assets/img/${item.icono}">
            <div class="hora">${item.hora}</div>
            <div class="texto">${item.texto}</div>
          </div>
          `
        );
      });

      document.dispatchEvent(new Event("timeline:ready"));
    }

    /* ============================================================
       VESTIMENTA (OPCIONAL)
    ============================================================ */
    const v = data.vestimenta;
    if (v && document.getElementById("vestimenta-titulo")) {

      document.getElementById("vestimenta-titulo").textContent = v.titulo;
      document.getElementById("vestimenta-icon").src = `assets/img/${v.icono}`;
      document.getElementById("vestimenta-formal").textContent = v.formal;

      document.getElementById("label-mujeres").textContent = v.labels.mujeres;
      document.getElementById("label-hombres").textContent = v.labels.hombres;

      document.getElementById("vestimenta-mujeres").innerHTML = v.mujeres;
      document.getElementById("vestimenta-hombres").innerHTML = v.hombres;
    }

    /* ============================================================
       REGALOS (OPCIONAL)
    ============================================================ */
    const r = data.regalos;
    if (r && document.getElementById("regalos-titulo")) {

      document.getElementById("regalos-titulo").textContent = r.titulo;
      document.querySelector(".regalos-desc").innerHTML = r.descripcion;

      const cont = document.getElementById("regalos-inner");
      cont.innerHTML = "";

      r.items.forEach(item => {
        cont.insertAdjacentHTML(
          "beforeend",
          `
          <div class="regalo-item">
            <img src="assets/img/${item.icono}" class="regalo-icon">
            <p class="regalo-label">${item.label}</p>
          </div>
          `
        );
      });
    }

    /* ============================================================
       GALERÍA (OPCIONAL)
    ============================================================ */
    const g = data.galeria;
    if (g && document.getElementById("galeria-titulo")) {

      document.getElementById("galeria-titulo").textContent = g.titulo;

      const track = document.getElementById("carousel-track");
      track.innerHTML = "";

      g.imagenes.forEach(img => {
        track.insertAdjacentHTML(
          "beforeend",
          `<img src="assets/img/${img}" class="carousel-img">`
        );
      });
    }

    /* ============================================================
       RSVP
    ============================================================ */
    const rsvp = data.rsvp;

    if (rsvp) {
      document.querySelector("#rsvp-form .arco-title").textContent = rsvp.titulo;
      document.querySelector("#rsvp-form .rsvp-text").innerHTML   = rsvp.texto;
      document.querySelector(".rsvp-note").innerHTML              = rsvp.nota;

      const btnYes = document.querySelector(".rsvp-btn.yes");
      const btnNo  = document.querySelector(".rsvp-btn.no");

      if (btnYes) btnYes.textContent = rsvp.botones.si;
      if (btnNo)  btnNo.textContent  = rsvp.botones.no;

      document.getElementById("rsvp-final-title").textContent = rsvp.final.titulo;
      document.getElementById("rsvp-final-text").textContent  = rsvp.final.texto;
      document.getElementById("rsvp-names").textContent       = rsvp.final.firma;
    }

    /* 🔔 Revelar animaciones una vez cargados los datos */
    document.dispatchEvent(new Event("reveal:init"));

  })
  .catch(err => {
    console.error("Error cargando evento.json:", err);
    document.body.classList.add("content-ready");
  });
