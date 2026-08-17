export default function RangeModule() {
    const row = document.querySelector(".range__row");
    if (!row) return;

    const originals = [...row.querySelectorAll(".range__item")];
    const N0 = originals.length;
    originals.forEach((it) => row.appendChild(it.cloneNode(true)));

    const items = [...row.querySelectorAll(".range__item")];

    const RSCALE = window.innerWidth <= 600 ? 0.65 : 1;

    items.forEach((item) => {
        const bottle = item.querySelector(".range__release");
        const pack = item.querySelector(".range__pack");
        if (!bottle) return;

        const applyBottle = () => {
            if (!bottle.naturalWidth) return;
            const w = bottle.naturalWidth * RSCALE;
            const h = bottle.naturalHeight * RSCALE;
            item.dataset.wrel = w;
            item.style.width = w + "px";
            item.style.height = h + "px";
            bottle.style.width = w + "px";
            bottle.style.height = h + "px";
        };
        const applyPack = () => {
            if (pack && pack.naturalWidth) {
                item.dataset.wpack = pack.naturalWidth * RSCALE;
                pack.style.width = pack.naturalWidth * RSCALE + "px";
                pack.style.height = pack.naturalHeight * RSCALE + "px";
            }
        };

        if (bottle.complete) applyBottle();
        else bottle.addEventListener("load", applyBottle);
        if (pack) {
            if (pack.complete) applyPack();
            else pack.addEventListener("load", applyPack);
        }
    });

    const infoCard = document.querySelector(".range__info-card");
    const infoCate = document.querySelector(".range__info-cate");
    const infoName = document.querySelector(".range__info-name");

    let openItem = null;

    const syncInfoLeft = () => {
        if (!infoCard || !openItem) return;
        const packEl = openItem.querySelector(".range__pack");
        const ref = packEl && packEl.getBoundingClientRect().width ? packEl : openItem;
        const cur = parseFloat(infoCard.style.left) || 0;
        const delta = ref.getBoundingClientRect().left - infoCard.getBoundingClientRect().left;
        if (Math.abs(delta) > 0.5) infoCard.style.left = cur + delta + "px";
    };

    const showInfo = (item) => {
        if (!infoCard || !item) return;
        if (infoCate) infoCate.textContent = item.dataset.cate || "";
        if (infoName) infoName.textContent = item.dataset.name || "";
        infoCard.href = item.dataset.url || infoCard.dataset.shopUrl || infoCard.href;
        infoCard.classList.toggle("no-link", !item.dataset.url);
        openItem = item;
        syncInfoLeft();
        infoCard.classList.add("show");
    };
    const hideInfo = () => {
        openItem = null;
        if (infoCard) infoCard.classList.remove("show");
    };

    const setOpen = (target) => {
        items.forEach((item) => {
            const open = item === target;
            item.classList.toggle("is-open", open);
            const w = open ? item.dataset.wpack || item.dataset.wrel : item.dataset.wrel;
            if (w) item.style.width = w + "px";
        });
        if (target) showInfo(target);
        else hideInfo();
    };

    const centerItem = (item) => {
        const rowRect = row.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const delta = (itemRect.left + itemRect.width / 2) - (rowRect.left + rowRect.width / 2);
        row.scrollTo({ left: row.scrollLeft + delta, behavior: "smooth" });
    };

    row.addEventListener("dragstart", (e) => e.preventDefault());

    let down = false;
    let startX = 0;
    let startScroll = 0;

    row.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse") return;
        down = true;
        startX = e.clientX;
        startScroll = row.scrollLeft;
        row.style.cursor = "grabbing";
    });
    row.addEventListener("pointermove", (e) => {
        if (!down || e.pointerType !== "mouse") return;
        row.scrollLeft = startScroll - (e.clientX - startX);
    });
    const end = () => {
        down = false;
        row.style.cursor = "grab";
    };
    row.addEventListener("pointerup", end);
    row.addEventListener("pointercancel", end);

    let lock = 0;
    items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            if (down) return;
            const now = Date.now();
            if (now < lock) return;
            if (item.classList.contains("is-open")) return;
            lock = now + 450;
            setOpen(item);
        });
    });

    const section = row.closest(".range") || row;
    section.addEventListener("mouseleave", () => {
        lock = 0;
        setOpen(null);
    });

    if (window.matchMedia("(max-width: 1200px)").matches && originals.length) {
        let autoIdx = 0;
        const AUTO_MS = 5000;
        const autoNext = () => {
            const item = originals[autoIdx];
            setOpen(item);
            centerItem(item);
            autoIdx = (autoIdx + 1) % originals.length;
        };
        autoNext();
        const autoTimer = setInterval(autoNext, AUTO_MS);
        row.addEventListener("pointerdown", () => {
            clearInterval(autoTimer);
        }, { once: true });
    }

    let lw = 0;
    const measure = () => {
        lw = items[N0].offsetLeft - items[0].offsetLeft;
    };
    window.addEventListener("load", measure);
    let mTimer;
    window.addEventListener("resize", () => {
        clearTimeout(mTimer);
        mTimer = setTimeout(measure, 200);
    });
    items.forEach((item) => {
        const bottle = item.querySelector(".range__release");
        if (bottle && !bottle.complete) bottle.addEventListener("load", measure);
    });
    measure();

    const tick = () => {
        if (lw > 0) {
            if (row.scrollLeft >= lw) {
                row.scrollLeft -= lw;
                startScroll -= lw;
            } else if (row.scrollLeft <= 1 && down) {
                row.scrollLeft += lw;
                startScroll += lw;
            }
        }
        if (openItem) syncInfoLeft();
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}
