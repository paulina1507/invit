document.addEventListener("DOMContentLoaded", () => {

    const rsvpSection = document.getElementById("rsvp");
    if (!rsvpSection) return;

    const optionButtons = rsvpSection.querySelectorAll(".rsvp-btn");
    const detailsBox = rsvpSection.querySelector(".rsvp-details");
    const confirmBtn = rsvpSection.querySelector(".rsvp-confirm");

    const formBox = rsvpSection.querySelector("#rsvp-form");
    const finalBox = rsvpSection.querySelector("#rsvp-final");

    const finalTitle = rsvpSection.querySelector("#rsvp-final-title");
    const finalText  = rsvpSection.querySelector("#rsvp-final-text");

    let selectedOption = null;

    /* ============================
       ESTADO INICIAL LIMPIO
    ============================ */

    function resetStates() {
        rsvpSection.classList.remove("expanded", "completed");

        optionButtons.forEach(b => b.classList.remove("active"));

        if (detailsBox) {
            detailsBox.classList.remove("show");
            detailsBox.style.display = "none";
        }

        formBox.style.display = "block";
        finalBox.style.display = "none";
    }

    // ⚠️ ESTO ES LO QUE FALTABA
    resetStates();

    /* ============================
       Helpers de estado
    ============================ */

    function expandRSVP() {
        rsvpSection.classList.remove("completed");
        rsvpSection.classList.add("expanded");
    }

    function completeRSVP() {
        rsvpSection.classList.remove("expanded");
        rsvpSection.classList.add("completed");

        formBox.style.display = "none";
        finalBox.style.display = "block";
    }

    /* ============================
       Selección de opción
    ============================ */

    optionButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            selectedOption = btn.dataset.response;

            optionButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            expandRSVP();

            if (selectedOption === "yes") {
                detailsBox.style.display = "flex";
                detailsBox.classList.add("show");
            }

            if (selectedOption === "no") {
                setTimeout(() => {
                    finalTitle.textContent = "Gracias por avisarnos";
                    finalText.innerHTML = `
                        Agradecemos mucho que se hayan tomado el tiempo de responder.<br>
                        Los llevamos con nosotros en este día tan especial.
                    `;
                    completeRSVP();
                }, 300);
            }
        });
    });

    /* ============================
       Confirmación (sí asisten)
    ============================ */

    confirmBtn?.addEventListener("click", () => {

        if (selectedOption !== "yes") return;

        setTimeout(() => {
            finalTitle.textContent = "¡Gracias por confirmar su asistencia!";
            finalText.innerHTML = `
                Hemos recibido su respuesta con mucho cariño.<br>
                Nos hará muy felices compartir este día con ustedes.<br><br>
                <strong>Pase confirmado para dos personas.</strong>
            `;
            completeRSVP();
        }, 300);
    });

});
