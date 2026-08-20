export default function FlowModule() {
    document.querySelectorAll(".flow").forEach((flow) => {
        const steps = Array.from(flow.querySelectorAll(".flow-step"));
        const img = flow.querySelector(".flow__media img");
        if (!steps.length || !img) return;

        // Preload trước để đổi ảnh không bị chớp trắng
        steps.forEach((step) => {
            const src = step.dataset.img;
            if (src) new Image().src = src;
        });

        const activate = (step) => {
            if (step.classList.contains("is-active")) return;
            steps.forEach((item) => item.classList.remove("is-active"));
            step.classList.add("is-active");

            const src = step.dataset.img;
            if (!src || img.getAttribute("src") === src) return;
            img.classList.add("is-swapping");
            const next = new Image();
            next.onload = () => {
                img.src = src;
                img.classList.remove("is-swapping");
            };
            next.onerror = () => img.classList.remove("is-swapping");
            next.src = src;
        };

        steps.forEach((step) => {
            step.addEventListener("click", () => activate(step));
            step.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(step);
                }
            });
        });
    });
}
