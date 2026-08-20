const BRANDS = {
    rita: {
        name: "RITA",
        desc: "RITA's products are certified for both domestic and international markets — including some of the world's most demanding, where standards leave no room for compromise.",
        logo: "./assets/images/brand-rita.png",
        slides: ["./assets/images/brand-rita-1.png"]
    },
    trobico: {
        name: "Trobico",
        desc: "Trobico brings fresh, innovative beverage concepts to life — crafted under the same rigorous quality standards as its parent company, RITA. From flavor development to production, every detail is built to meet the expectations of discerning markets worldwide.",
        logo: "./assets/images/brand-trobico.png",
        slides: ["./assets/images/brand-trobico-1.png"]
    },
    trobest: {
        name: "TroBest",
        desc: "Trobest stands for consistency and reliability at scale — delivering beverages that meet international quality benchmarks batch after batch. Backed by RITA's manufacturing expertise, Trobest is a trusted partner for markets that demand precision.",
        logo: "./assets/images/brand-trobest.png",
        slides: ["./assets/images/brand-trobest-1.png"]
    },
    npv: {
        name: "NPV Beverage",
        desc: "NPV Beverage is part of the RITA family, combining local market insight with the same disciplined quality control that defines the group. It's where dependable production meets an eye for what today's consumers are looking for.",
        logo: "./assets/images/brand-npv.png",
        slides: ["./assets/images/brand-npv-1.png"]
    }
};

export default function BrandPopupModule() {
    const popup = document.getElementById("brandPopup");
    if (!popup) return;

    const slidesWrap = document.getElementById("brandSlides");
    const nameEl = document.getElementById("brandName");
    const descEl = document.getElementById("brandDesc");
    const alsoEl = document.getElementById("brandAlso");
    const body = document.body;
    const grid = document.querySelector(".brand-list__grid");
    const cards = Array.from(document.querySelectorAll(".brandOpenJS"));
    const moreBtn = document.querySelector(".brandLoadMoreJS");
    const pageSize = parseInt(grid && grid.dataset.pageSize, 10) || 8;
    let visible = Math.min(pageSize, cards.length);
    let currentKey = null;
    let swiper = null;
    let alsoSwiper = null;

    // Brand ẩn phải biến mất khỏi cả grid lẫn "you may also like" trong popup
    const visibleKeys = () => cards.slice(0, visible).map((card) => card.dataset.brand);

    const applyPaging = () => {
        cards.forEach((card, index) => card.classList.toggle("is-hidden", index >= visible));
        if (moreBtn) moreBtn.style.display = visible >= cards.length ? "none" : "";
    };

    const buildSlides = (brand) => {
        slidesWrap.innerHTML = brand.slides
            .map((src) => `<div class="swiper-slide"><img src="${src}" alt="${brand.name}" /></div>`)
            .join("");
    };

    const buildAlso = (activeKey) => {
        const slides = visibleKeys()
            .filter((key) => key !== activeKey && BRANDS[key])
            .map((key) => `<div class="swiper-slide"><button class="brand-popup__also-item brandSwitchJS" type="button" data-brand="${key}" aria-label="View ${BRANDS[key].name}"><img src="${BRANDS[key].logo}" alt="${BRANDS[key].name}" /></button></div>`)
            .join("");
        alsoEl.innerHTML = `<div class="swiper"><div class="swiper-wrapper">${slides}</div></div>`;
    };

    const initSwiper = () => {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
        if (alsoSwiper) {
            alsoSwiper.destroy(true, true);
            alsoSwiper = null;
        }
        if (typeof Swiper === "undefined") return;

        swiper = new Swiper(popup.querySelector(".brand-popup__slider .swiper"), {
            speed: 600,
            loop: false,
            slidesPerView: 1,
            grabCursor: true,
            navigation: {
                nextEl: ".brandNextJS",
                prevEl: ".brandPrevJS"
            }
        });

        alsoSwiper = new Swiper(alsoEl.querySelector(".swiper"), {
            speed: 600,
            slidesPerView: 3,
            spaceBetween: 16,
            grabCursor: true,
            breakpoints: {
                0: {
                    slidesPerView: 2.4,
                    spaceBetween: 10
                },
                600: {
                    slidesPerView: 3,
                    spaceBetween: 16
                }
            }
        });
    };

    const render = (key) => {
        const brand = BRANDS[key];
        if (!brand) return;
        currentKey = key;
        nameEl.textContent = brand.name;
        descEl.textContent = brand.desc;
        buildSlides(brand);
        buildAlso(key);
        initSwiper();
    };

    // Mở trước rồi mới render: Swiper phải đo khi popup đã có layout thật, nếu không slide bị tràn ngang
    const open = (key) => {
        document.dispatchEvent(new CustomEvent("panel:open", { detail: "brand-popup" }));
        popup.classList.add("open");
        body.classList.add("no-scroll");
        render(key);
    };

    const close = () => {
        popup.classList.remove("open");
        body.classList.remove("no-scroll");
    };

    applyPaging();

    cards.forEach((btn) => {
        btn.addEventListener("click", () => open(btn.dataset.brand));
    });

    if (moreBtn) {
        moreBtn.addEventListener("click", () => {
            visible = Math.min(visible + pageSize, cards.length);
            applyPaging();
            if (currentKey && popup.classList.contains("open")) render(currentKey);
        });
    }

    popup.querySelectorAll(".brandCloseJS").forEach((btn) => {
        btn.addEventListener("click", close);
    });

    const cta = popup.querySelector(".brandCtaJS");
    if (cta) {
        cta.addEventListener("click", (e) => {
            e.preventDefault();
            close();
            const target = document.querySelector("#lead-form");
            if (target) {
                requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
            }
        });
    }

    alsoEl.addEventListener("click", (e) => {
        const item = e.target.closest(".brandSwitchJS");
        if (item) render(item.dataset.brand);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && popup.classList.contains("open")) close();
    });

    document.addEventListener("panel:open", (e) => {
        if (e.detail !== "brand-popup" && popup.classList.contains("open")) close();
    });
}
