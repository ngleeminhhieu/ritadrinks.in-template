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
    let swiper = null;

    const inMaterial = () => formats.filter((f) => f.material === material);

    const destroySwiper = () => {
        if (!swiper) return;
        swiper.destroy(true, true);
        swiper = null;
    };

    const syncThumbs = () => {
        Array.from(thumbs.children).forEach((btn, i) => {
            btn.classList.toggle("is-active", i === imageIndex);
        });
    };

    const renderStage = () => {
        const list = inMaterial();
        const item = list[formatIndex];
        if (!item) return;

        destroySwiper();

        // Mục "Your Size" không phải sản phẩm có sẵn nên stage đổi thành CTA dẫn xuống form
        if (item.custom) {
            stage.classList.add("pkg__stage--cta");
            stage.innerHTML = `<div class="pkg__cta">
                <img class="pkg__cta-shot" src="${item.images[0]}" alt="${item.name}" />
                <p class="pkg__cta-title t-24">Need a size that isn&rsquo;t listed?</p>
                <p class="pkg__cta-desc">Tell us your target volume and format &mdash; we&rsquo;ll confirm feasibility, tooling and MOQ.</p>
                <div class="btn-box"><a class="btn pri" href="#lead-form"><span class="txt"><span class="txt-inner">Request Your Size</span></span></a></div>
            </div>`;
            thumbs.innerHTML = "";
            if (prev) prev.disabled = true;
            if (next) next.disabled = true;
            return;
        }

        stage.classList.remove("pkg__stage--cta");
        stage.innerHTML = `<div class="swiper pkg__swiper"><div class="swiper-wrapper">${item.images
            .map((src) => `<div class="swiper-slide"><a class="pkg__shot" href="${src}" data-fancybox="pkg" data-caption="${item.name}"><img src="${src}" alt="${item.name}" /></a></div>`)
            .join("")}</div></div>`;

        thumbs.innerHTML = item.images
            .map((src, i) => `<button class="pkg__thumb${i === imageIndex ? " is-active" : ""}" type="button" data-img="${i}" aria-label="View image ${i + 1}"><img src="${src}" alt="" /></button>`)
            .join("");

        const multi = item.images.length > 1;
        if (prev) prev.disabled = !multi;
        if (next) next.disabled = !multi;

        if (typeof Swiper === "undefined") return;
        swiper = new Swiper(stage.querySelector(".pkg__swiper"), {
            speed: 500,
            slidesPerView: 1,
            initialSlide: imageIndex,
            grabCursor: multi,
            allowTouchMove: multi,
            on: {
                slideChange: (sw) => {
                    imageIndex = sw.activeIndex;
                    syncThumbs();
                }
            }
        });
    };

    // Số cột đổi theo breakpoint nên phải đọc từ CSS, không hardcode
    const colCount = () => {
        const cols = getComputedStyle(shelf).gridTemplateColumns;
        const n = cols ? cols.split(" ").filter(Boolean).length : 0;
        return n > 0 ? n : 1;
    };

    const renderShelf = () => {
        const list = inMaterial();
        shelf.innerHTML = list
            .map((f, i) => {
                const decor = f.custom ? '<span class="pkg__format-mark"><i class="fas fa-star"></i></span>' : "";
                return `<button class="pkg__format${f.custom ? " pkg__format--custom" : ""}${i === formatIndex ? " is-active" : ""}" type="button" data-format="${i}"><span class="pkg__format-shot"><img src="${f.images[0]}" alt="${f.name}" loading="lazy" />${decor}</span><span class="pkg__format-name">${f.name}</span></button>`;
            })
            .join("");

        // Đo cột sau khi đã có item, rồi bù ô rỗng cho hàng cuối để vạch đỏ chạy hết chiều ngang
        const cols = colCount();
        const filler = (cols - (list.length % cols)) % cols;
        if (!filler) return;

        let extra = "";
        for (let i = 0; i < filler; i += 1) {
            extra += '<span class="pkg__format pkg__format--filler" aria-hidden="true"><span class="pkg__format-shot"></span></span>';
        }
        shelf.insertAdjacentHTML("beforeend", extra);
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
        if (swiper) {
            swiper.slideTo(imageIndex);
            return;
        }
        syncThumbs();
    });

    const step = (dir) => {
        if (!swiper) return;
        const total = swiper.slides.length;
        if (total < 2) return;
        swiper.slideTo((swiper.activeIndex + dir + total) % total);
    };

    if (prev) prev.addEventListener("click", () => step(-1));
    if (next) next.addEventListener("click", () => step(1));

    let shelfCols = 0;
    let resizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const now = colCount();
            if (now === shelfCols) return;
            shelfCols = now;
            renderShelf();
        }, 200);
    });

    if (typeof Fancybox !== "undefined") {
        Fancybox.bind('[data-fancybox="pkg"]', {});
    }

    render();
    shelfCols = colCount();
}
