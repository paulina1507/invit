/* ============================================================
   CARGA DEL ARCHIVO JSON DEL EVENTO
============================================================ */

fetch("./assets/js/evento.json")
  .then(res => res.json())
  .then(data => {

    /* ============================================================
       0) LOGO, NAVBAR, FOOTER, AUDIO
    ============================================================= */

    // logo
    const logo = document.querySelector(".logo");
    if (logo) logo.textContent = data.logo;

    // navbar dinámico
    const navMenu = document.getElementById("navMenu");
    if (navMenu) {
        navMenu.innerHTML = "";
        data.nav_items.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${item.href}">${item.label}</a>`;
            navMenu.appendChild(li);
        });
    }

    // footer
    const footer = document.getElementById("footer-text");
    if (footer) footer.innerHTML = data.footer_text;

    // audio dinámico
    const audio = document.querySelector("#bgSong source");
    if (audio) audio.src = `./assets/audio/${data.audio}`;


    /* ============================================================
       1) HERO — NOMBRES + Imagen de Hero
    ============================================================= */

    const heroNames = document.getElementById("hero-names");
    if (heroNames) heroNames.textContent = `${data.novia} & ${data.novio}`;

    // imagen dinámica del hero
    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
        heroBg.style.backgroundImage = `url('./assets/img/${data.hero_imagen}')`;
    }


    /* ============================================================
       2) PRESENTACIÓN
    ============================================================= */

    document.getElementById("titulo-presentacion").textContent = data.presentacion.titulo;
    document.getElementById("nombres-presentacion").textContent = data.presentacion.nombres;
    document.getElementById("frase-presentacion").textContent = data.presentacion.frase;

    document.getElementById("padres-novia").innerHTML = data.presentacion.padres.novia.join("<br>");
    document.getElementById("padres-novio").innerHTML = data.presentacion.padres.novio.join("<br>");
    document.getElementById("padrinos").innerHTML = data.presentacion.padrinos.join("<br>");

    document.getElementById("texto-final-presentacion").textContent = data.presentacion.texto_final;

    // imagen de presentación
    const imgPresentacion = document.querySelector(".arco-img img");
    if (imgPresentacion) {
        imgPresentacion.src = `./assets/img/${data.presentacion_imagen}`;
    }


    /* ============================================================
       3) UBICACIÓN — MULTI LUGARES
    ============================================================= */
/* ============================================================
   3) UBICACIÓN — MULTI LUGARES
============================================================ */
function renderUbicacion() {

    const ub = data.ubicacion;

    document.getElementById("ubicacion-titulo").textContent = ub.titulo;

    const lista = document.getElementById("ubicacion-lista");
    lista.innerHTML = "";

    /* FECHA OFICIAL EN FORMATO MINIMAL */
    const fecha = new Date(data.fecha_boda);

    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();

    const fechaGeneral = document.getElementById("ubicacion-fecha-general");
    fechaGeneral.innerHTML = `
        <div class="fecha-minimal">${dia} · ${mes} · ${anio}</div>
    `;

    /* EVENTOS — SIN FECHA */
    ub.lugares.forEach(l => {
        const card = document.createElement("div");
        card.className = "ubicacion-card";

        card.innerHTML = `
            <h3 class="ubicacion-subtitle">${l.tipo.toUpperCase()}</h3>
            <p class="ubicacion-hora">${l.hora}</p>

            <h4 class="ubicacion-lugar">${l.lugar}</h4>

            <p class="ubicacion-direccion">${l.direccion.join("<br>")}</p>

            <a href="${l.mapa}" target="_blank" class="btn-ubicacion">VER MAPA</a>
        `;

        lista.appendChild(card);
    });
}

renderUbicacion();

    /* ============================================================
       4) PROGRAMA — TÍTULO + TIMELINE
    ============================================================= */

    // cargar título del programa
    const programaTitulo = document.getElementById("programa-titulo");
    if (programaTitulo) programaTitulo.textContent = data.programa_titulo;

    // timeline
    const timeline = document.getElementById("timeline-programa");

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
document.dispatchEvent(new Event("timeline:ready"));


    /* ============================================================
       5) VESTIMENTA
    ============================================================= */
    document.getElementById("vestimenta-titulo").textContent = data.vestimenta.titulo;
    document.getElementById("vestimenta-icon").src = `./assets/img/${data.vestimenta.icono}`;
    document.getElementById("vestimenta-formal").textContent = data.vestimenta.formal;

    // labels dinámicos
    const labelM = document.querySelector('.v-label[data-type="mujeres"]');
    const labelH = document.querySelector('.v-label[data-type="hombres"]');

    if (labelM) labelM.textContent = data.vestimenta.label_mujeres;
    if (labelH) labelH.textContent = data.vestimenta.label_hombres;

    document.getElementById("vestimenta-mujeres").innerHTML = data.vestimenta.mujeres;
    document.getElementById("vestimenta-hombres").innerHTML = data.vestimenta.hombres;


    /* ============================================================
       6) REGALOS
    ============================================================= */
    document.getElementById("regalos-titulo").textContent = data.regalos_titulo;
    document.querySelector(".regalos-desc").innerHTML = data.regalos_descripcion;

    const regalosContainer = document.getElementById("regalos-inner");
    regalosContainer.innerHTML = "";

    data.regalos.forEach(r => {
        const div = document.createElement("div");
        div.className = "regalo-item";
        div.innerHTML = `
            <img src="./assets/img/${r.icono}" class="regalo-icon" alt="${r.label}">
            <p class="regalo-label">${r.label}</p>
        `;
        regalosContainer.appendChild(div);
    });


    /* ============================================================
       7) GALERÍA
    ============================================================= */
    document.getElementById("galeria-titulo").textContent = data.galeria_titulo;
    const track = document.getElementById("carousel-track");

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

        document.getElementById("carousel-right").addEventListener("click", () => {
            index = (index + 1) % total;
            track.style.transform = `translateX(-${index * 100}%)`;
        });

        document.getElementById("carousel-left").addEventListener("click", () => {
            index = (index - 1 + total) % total;
            track.style.transform = `translateX(-${index * 100}%)`;
        });
    }

  })

  .catch(err => console.error("Error cargando evento.json:", err));
