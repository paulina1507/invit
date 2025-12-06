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
    const finalNames = document.querySelector(".final-names");

    if (heroNames && finalNames) {
      const nombres = `${data.novia} y ${data.novio}`;
      heroNames.textContent = nombres;
      finalNames.textContent = nombres;
    }


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
       3) UBICACIÓN
    ============================================================= */
    const fechaUbic = document.querySelector(".ubicacion-fecha");
    const lugarUbic = document.querySelector(".ubicacion-lugar");
    const dirUbic = document.querySelector(".ubicacion-direccion");

    if (fechaUbic && lugarUbic && dirUbic) {
      fechaUbic.innerHTML = `
        <div>${data.ubicacion.dia_semana}</div>
        <div class="dia">${data.ubicacion.dia}</div>
        <div>${data.ubicacion.mes} ${data.ubicacion.anio}</div>
        <div>${data.ubicacion.hora}</div>
      `;

      lugarUbic.textContent = data.ubicacion.lugar;
      dirUbic.innerHTML = data.ubicacion.direccion.join("<br>");
    }


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
       5) VESTIMENTA — ÍCONO + TEXTOS
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
      // elimina los elementos HTML viejos
      const prev = regalosContainer.querySelectorAll(".regalo-item");
      prev.forEach(i => i.remove());

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
       7) GALERÍA — DESDE JSON
    ============================================================= */
    const track = document.querySelector(".carousel-track");
    const leftBtn = document.querySelector(".carousel-btn.left");
    const rightBtn = document.querySelector(".carousel-btn.right");

    if (track && data.galeria) {
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


    /* ============================================================
       8) FINAL — FECHA
    ============================================================= */

    // Convertimos la fecha ISO
    const fechaFinal = new Date(data.fecha_boda);

    const options = { weekday: 'long' };
    const diaSemana = fechaFinal.toLocaleDateString("es-MX", options).toUpperCase();

    const day = fechaFinal.getDate();
    const month = fechaFinal.toLocaleDateString("es-MX", { month: "short" }).toUpperCase();
    const year = fechaFinal.getFullYear();

    document.querySelector(".date-label").textContent = diaSemana;
    document.querySelector(".date-day").textContent = day;
    document.querySelector(".date-month").textContent = month;
    document.querySelector(".date-year").textContent = year;
    document.querySelector(".final-hour").textContent = data.ubicacion.hora;

  })
  .catch(err => console.error("Error cargando evento.json:", err));
