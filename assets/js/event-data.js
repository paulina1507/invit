/* ============================================================
   CARGA DEL ARCHIVO JSON DEL EVENTO
============================================================ */

fetch("./assets/js/evento.json")
  .then(res => res.json())
  .then(data => {

    /* ============================================================
       1) HERO — NOMBRES
    ============================================================= */
    const heroNames = document.querySelector(".hero-names");
    if (heroNames)
      heroNames.textContent = `${data.novia} y ${data.novio}`;


    /* ============================================================
       2) PRESENTACIÓN — TEXTO Y PADRES
    ============================================================= */
    const presentacionText = document.querySelector(".arco-bottom");
    if (presentacionText)
      presentacionText.textContent = data.presentacion.texto_bienvenida;

    const padresBlocks = document.querySelectorAll(".arco-padres p");
    if (padresBlocks.length === 2) {

      padresBlocks[0].innerHTML = `
        ${data.presentacion.padres.novia[0]}<br>
        ${data.presentacion.padres.novia[1]}<br>
        <small>Padres de la novia</small>
      `;

      padresBlocks[1].innerHTML = `
        ${data.presentacion.padres.novio[0]}<br>
        ${data.presentacion.padres.novio[1]}<br>
        <small>Padres del novio</small>
      `;
    }


    /* ============================================================
       3) UBICACIÓN — NUEVO FORMATO BOHO
    ============================================================= */
    const diaNum   = document.querySelector(".uf-dia-num");
    const mesTxt   = document.querySelector(".uf-mes");
    const horaTxt  = document.querySelector(".uf-hora");

    const lugar    = document.querySelector(".ubicacion-lugar");
    const direccion= document.querySelector(".ubicacion-direccion");

    if (diaNum)   diaNum.textContent = data.ubicacion.dia;
    if (mesTxt)   mesTxt.textContent = data.ubicacion.mes;
    if (horaTxt)  horaTxt.textContent = data.ubicacion.hora;

    if (lugar)    lugar.textContent = data.ubicacion.lugar;
    if (direccion)
      direccion.innerHTML = data.ubicacion.direccion.join("<br>");


    /* ============================================================
       4) PROGRAMA — TIMELINE
    ============================================================= */
    const timeline = document.querySelector(".timeline-programa");

    if (timeline) {
      timeline.innerHTML = "";

      data.programa.forEach(item => {
        const div = document.createElement("div");
        div.className = `item ${item.lado}`;
        div.innerHTML = `
          <img src="./assets/img/${item.icono}" class="icon">
          <p class="hora">${item.hora}</p>
          <p class="texto">${item.texto}</p>
        `;
        timeline.appendChild(div);
      });
    }


    /* ============================================================
       5) VESTIMENTA
    ============================================================= */
    const vestIcon = document.querySelector(".vestimenta-icon");
    const vestFormal = document.querySelector(".vestimenta-formal");
    const vestText = document.querySelector(".vestimenta-text");

    if (vestIcon && vestFormal && vestText) {
      vestIcon.src = `./assets/img/${data.vestimenta.icono}`;
      vestFormal.textContent = data.vestimenta.formal;

      const vContents = vestText.querySelectorAll(".v-content");
      if (vContents.length >= 2) {
        vContents[0].innerHTML = data.vestimenta.mujeres;
        vContents[1].innerHTML = data.vestimenta.hombres;
      }
    }


    /* ============================================================
       6) REGALOS
    ============================================================= */
    const regalosContainer = document.querySelector(".regalos-inner");

    if (regalosContainer) {
      regalosContainer.querySelectorAll(".regalo-item").forEach(i => i.remove());

      data.regalos.forEach(r => {
        const div = document.createElement("div");
        div.className = "regalo-item";
        div.innerHTML = `
          <img src="./assets/img/${r.icono}" class="regalo-icon" alt="${r.label}">
          <p class="regalo-label">${r.label}</p>
        `;
        regalosContainer.appendChild(div);
      });
    }


    /* ============================================================
       7) GALERÍA – CARRUSEL
    ============================================================= */
    const track = document.querySelector(".carousel-track");
    const leftBtn = document.querySelector(".carousel-btn.left");
    const rightBtn = document.querySelector(".carousel-btn.right");

    if (track) {

      track.innerHTML = "";

      data.galeria.forEach(img => {
        const el = document.createElement("img");
        el.src = `./assets/img/${img}`;
        el.classList.add("carousel-img");
        track.appendChild(el);
      });

      let index = 0;
      const total = data.galeria.length;

      rightBtn.onclick = () => {
        index = (index + 1) % total;
        track.style.transform = `translateX(-${index * 100}%)`;
      };

      leftBtn.onclick = () => {
        index = (index - 1 + total) % total;
        track.style.transform = `translateX(-${index * 100}%)`;
      };
    }

  })
  .catch(err => console.error("Error cargando evento.json:", err));
