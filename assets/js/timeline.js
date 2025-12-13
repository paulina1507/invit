document.addEventListener("timeline:ready", () => {

    const timeline = document.querySelector(".timeline-programa");
    if (!timeline) return;

    const items = timeline.querySelectorAll(".item");
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const item = entry.target;
            const index = [...items].indexOf(item);

            item.classList.add("active");

            const progress = Math.round(((index + 1) / items.length) * 100);

            timeline.classList.remove(
                "progress-25",
                "progress-50",
                "progress-75",
                "progress-100"
            );

            if (progress <= 25) timeline.classList.add("progress-25");
            else if (progress <= 50) timeline.classList.add("progress-50");
            else if (progress <= 75) timeline.classList.add("progress-75");
            else timeline.classList.add("progress-100");

        });
    }, {
        rootMargin: "-140px 0px -140px 0px",
        threshold: 0.1
    });

    items.forEach(item => observer.observe(item));
});
