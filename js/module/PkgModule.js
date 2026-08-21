export default function PkgModule() {
    const root = document.getElementById("pkgFormats");
    if (!root) return;

    const dataEl = root.querySelector("#pkg-data");
    let formats = [];
    try {
        formats = dataEl ? JSON.parse(dataEl.textContent) : [];
    } catch (e) {
        formats = [];
    }
    if (!formats.length) return;

    const stage = root.querySelector("#pkgStage");
    const thumbs = root.querySelector("#pkgThumbs");
    const shelf = root.querySelector("#pkgShelf");
    const title = root.querySelector("#pkgTitle");
    const materials = Array.from(root.querySelectorAll(".pkg__material"));
    const prev = root.querySelector(".pkg__nav--prev");
    const next = root.querySelector(".pkg__nav--next");
    if (!stage || !shelf) return;

    const LABELS = {
        aluminum: "Aluminum Can",
        glass: "Glass Bottle",
        pet: "PET Bottle",
        pp: "PP Bottle"
    };

    let material = "aluminum";
    let formatIndex = 0;
    let imageIndex = 0;

    const inMaterial = () => formats.filter((f) => f.material === material);

    const renderStage = () => {
        const list = inMaterial();
        const item = list[formatIndex];
        if (!item) return;

        stage.innerHTML = item.images
            .map((src, i) => `<img class="pkg__shot${i === imageIndex ? " is-active" : ""}" src="${src}" alt="${item.name}" />`)
            .join("");

        thumbs.innerHTML = item.images.length > 1
            ? item.images
                .map((src, i) => `<button class="pkg__thumb${i === imageIndex ? " is-active" : ""}" type="button" data-img="${i}" aria-label="View image ${i + 1}"><img src="${src}" alt="" /></button>`)
                .join("")
            : "";

        const multi = item.images.length > 1;
        if (prev) prev.disabled = !multi;
        if (next) next.disabled = !multi;
    };

    const renderShelf = () => {
        shelf.innerHTML = inMaterial()
            .map((f, i) => `<button class="pkg__format${i === formatIndex ? " is-active" : ""}" type="button" data-format="${i}"><span class="pkg__format-shot"><img src="${f.images[0]}" alt="${f.name}" loading="lazy" /></span><span class="pkg__format-name">${f.name}</span></button>`)
            .join("");
    };

    const render = () => {
        if (title) title.textContent = LABELS[material] || "";
        renderShelf();
        renderStage();
    };

    materials.forEach((btn) => {
        btn.addEventListener("click", () => {
            material = btn.dataset.material;
            formatIndex = 0;
            imageIndex = 0;
            materials.forEach((b) => {
                const active = b === btn;
                b.classList.toggle("is-active", active);
                b.setAttribute("aria-selected", String(active));
            });
            render();
        });
    });

    shelf.addEventListener("click", (e) => {
        const btn = e.target.closest(".pkg__format");
        if (!btn) return;
        formatIndex = Number(btn.dataset.format) || 0;
        imageIndex = 0;
        render();
    });

    thumbs.addEventListener("click", (e) => {
        const btn = e.target.closest(".pkg__thumb");
        if (!btn) return;
        imageIndex = Number(btn.dataset.img) || 0;
        renderStage();
    });

    const step = (dir) => {
        const list = inMaterial();
        const item = list[formatIndex];
        if (!item || item.images.length < 2) return;
        imageIndex = (imageIndex + dir + item.images.length) % item.images.length;
        renderStage();
    };

    if (prev) prev.addEventListener("click", () => step(-1));
    if (next) next.addEventListener("click", () => step(1));

    render();
}
