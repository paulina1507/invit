document.addEventListener("timeline:ready", () => {

  const timeline = document.querySelector(".timeline-programa");
  if (!timeline) return;

  const items = [...timeline.querySelectorAll(".item")];
  if (!items.length) return;

  const section = document.getElementById("programa");

  /* === ACTIVACIÓN DE ITEMS === */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.35 }
  );

  items.forEach(item => observer.observe(item));

  /* === PROGRESO REAL Y VISIBLE === */
  function updateTimelineProgress() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    /* cuando empieza y termina el avance */
    const start = vh * 0.35;
    const end = rect.height - vh * 0.35;

    /* cuánto se ha recorrido */
    const scrolled = Math.min(
      Math.max(start - rect.top, 0),
      end
    );

    const percent = (scrolled / end) * 100;

    timeline.style.setProperty(
      "--progress",
      `${Math.min(Math.max(percent, 0), 100)}%`
    );
  }

  window.addEventListener("scroll", updateTimelineProgress);
  window.addEventListener("resize", updateTimelineProgress);

  /* primer cálculo */
  updateTimelineProgress();
});
