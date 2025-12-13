document.addEventListener("timeline:ready", () => {

  const timeline = document.querySelector(".timeline-programa");
  if (!timeline) return;

  const items = [...timeline.querySelectorAll(".item")];
  if (!items.length) return;

  const timelineTop = timeline.offsetTop;
  const timelineHeight = timeline.offsetHeight;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const item = entry.target;
      item.classList.add("active");
    });
  }, {
    threshold: 0.3
  });

  items.forEach(item => observer.observe(item));

  /* 🎯 PROGRESO REAL BASADO EN SCROLL */
  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY + window.innerHeight * 0.4;
    const distance = scrollY - timelineTop;
    const progress = Math.min(
      Math.max((distance / timelineHeight) * 100, 0),
      100
    );

    timeline.style.setProperty("--progress", `${progress}%`);
  });

});
