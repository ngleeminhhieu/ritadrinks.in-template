export default function PackagingModule() {
    const root = document.querySelector(".packaging")
    if (!root || typeof Splide === "undefined") return

    const dataEl = root.querySelector("#packaging-data")
    let products = []
    try {
        products = dataEl ? JSON.parse(dataEl.textContent) : []
    } catch (e) {
        products = []
    }

    const splideListEl = root.querySelector("#packaging-splide-list")
    const thumbsTrackEl = root.querySelector("#packaging-thumbs-track")
    const filterBtns = root.querySelectorAll(".packaging__filter-btn")
    const capBtn = root.querySelector("#packaging-cap-btn")
    const capIcon = capBtn ? capBtn.querySelector(".packaging__cap-icon") : null
    const ddMenu = root.querySelector("#packaging-dd-menu")

    const iconMap = {}
    root.querySelectorAll(".packaging__filter-btn[data-filter] img, .packaging__dd-item[data-filter] img").forEach((img) => {
        const btn = img.closest("[data-filter]")
        if (btn) iconMap[btn.getAttribute("data-filter")] = img.getAttribute("src")
    })

    const defaultCategory = filterBtns.length
        ? filterBtns[0].getAttribute("data-filter")
        : (products[0] && products[0].category) || ""

    let splideInstance = null
    let currentFilteredList = []
    let filterTimeout = null

    function filterProducts(category) {
        return products.filter((p) => p.category === category)
    }

    function updateCapIcon(category) {
        if (capIcon && iconMap[category]) capIcon.src = iconMap[category]
    }

    function renderSlides(category) {
        if (!splideListEl) return
        const filtered = filterProducts(category)
        splideListEl.innerHTML = filtered
            .map((item) => `
                <li class="splide__slide">
                    <div class="packaging__card">
                        <img src="${item.img}" alt="${item.title}" class="packaging__card-img" loading="lazy" />
                    </div>
                </li>
            `)
            .join("")
    }

    function renderThumbs(category) {
        if (!thumbsTrackEl) return
        currentFilteredList = filterProducts(category)
        thumbsTrackEl.innerHTML = currentFilteredList
            .map((item, idx) => `
                <div class="packaging__thumb${idx === 0 ? " active" : ""}" data-index="${idx}">
                    <img src="${item.img}" alt="${item.title}" class="packaging__thumb-img" loading="lazy" />
                </div>
            `)
            .join("")

        thumbsTrackEl.querySelectorAll(".packaging__thumb").forEach((card) => {
            card.addEventListener("click", () => {
                const slideIdx = parseInt(card.getAttribute("data-index"), 10)
                if (splideInstance && !isNaN(slideIdx)) {
                    splideInstance.go(slideIdx)
                    updateActiveThumb(slideIdx)
                }
            })
        })
    }

    function updateActiveThumb(slideIndex) {
        if (!thumbsTrackEl || !currentFilteredList.length) return
        const realIndex = ((slideIndex % currentFilteredList.length) + currentFilteredList.length) % currentFilteredList.length
        const wrap = thumbsTrackEl.parentElement
        thumbsTrackEl.querySelectorAll(".packaging__thumb").forEach((card, idx) => {
            const active = idx === realIndex
            card.classList.toggle("active", active)
            if (active && wrap) {
                const target = card.offsetLeft - (wrap.clientWidth - card.clientWidth) / 2
                wrap.scrollTo({ left: target, behavior: "smooth" })
            }
        })
    }

    function initSplide() {
        const splideEl = root.querySelector("#packaging-splide")
        if (!splideEl) return
        if (splideInstance) {
            splideInstance.destroy(true)
            splideInstance = null
        }
        splideInstance = new Splide(splideEl, {
            type: "slide",
            perPage: 6,
            focus: false,
            gap: "0px",
            arrows: false,
            pagination: false,
            autoplay: true,
            interval: 3000,
            speed: 700,
            pauseOnHover: false,
            pauseOnFocus: false,
            breakpoints: {
                1200: { perPage: 3 },
                768: { perPage: 1 }
            }
        })
        splideInstance.mount()
        splideInstance.on("move", (newIndex) => updateActiveThumb(newIndex))
    }

    function syncFilterActiveState(category) {
        root.querySelectorAll(".packaging__filter-btn").forEach((b) => {
            const match = b.getAttribute("data-filter") === category
            b.classList.toggle("active", match)
            b.setAttribute("aria-selected", match ? "true" : "false")
        })
        root.querySelectorAll(".packaging__dd-item").forEach((item) => {
            item.classList.toggle("active", item.getAttribute("data-filter") === category)
        })
    }

    function applyFilter(category) {
        syncFilterActiveState(category)
        updateCapIcon(category)

        if (filterTimeout) window.clearTimeout(filterTimeout)

        const splideEl = root.querySelector("#packaging-splide")
        if (splideEl) {
            splideEl.classList.remove("packaging__slide-in")
            splideEl.classList.add("packaging__slide-out")
        }

        filterTimeout = window.setTimeout(() => {
            renderSlides(category)
            renderThumbs(category)
            initSplide()

            const newSplideEl = root.querySelector("#packaging-splide")
            if (newSplideEl) {
                newSplideEl.classList.remove("packaging__slide-out")
                newSplideEl.classList.add("packaging__slide-in")
                newSplideEl.addEventListener(
                    "animationend",
                    () => newSplideEl.classList.remove("packaging__slide-in"),
                    { once: true }
                )
            }

            filterTimeout = null
        }, 450)
    }

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => applyFilter(btn.getAttribute("data-filter")))
    })

    if (capBtn && ddMenu) {
        capBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            const isOpen = ddMenu.classList.toggle("active")
            capBtn.classList.toggle("open", isOpen)
            capBtn.setAttribute("aria-expanded", isOpen ? "true" : "false")
        })

        document.addEventListener("click", (e) => {
            if (!capBtn.contains(e.target) && !ddMenu.contains(e.target)) {
                ddMenu.classList.remove("active")
                capBtn.classList.remove("open")
                capBtn.setAttribute("aria-expanded", "false")
            }
        })

        ddMenu.querySelectorAll(".packaging__dd-item").forEach((item) => {
            item.addEventListener("click", () => {
                applyFilter(item.getAttribute("data-filter"))
                ddMenu.classList.remove("active")
                capBtn.classList.remove("open")
                capBtn.setAttribute("aria-expanded", "false")
            })
        })
    }

    function setupAutoplayHoverSync() {
        const machineEl = root.querySelector(".packaging__machine")
        if (!machineEl) return

        const pauseAll = () => {
            const autoplay = splideInstance && splideInstance.Components && splideInstance.Components.Autoplay
            if (autoplay) autoplay.pause()
        }
        const playAll = () => {
            const autoplay = splideInstance && splideInstance.Components && splideInstance.Components.Autoplay
            if (autoplay) autoplay.play()
        }

        machineEl.addEventListener("mouseenter", pauseAll)
        machineEl.addEventListener("mouseleave", playAll)
        machineEl.addEventListener("touchstart", pauseAll, { passive: true })
        machineEl.addEventListener("touchend", playAll)
    }

    renderSlides(defaultCategory)
    renderThumbs(defaultCategory)
    updateCapIcon(defaultCategory)
    initSplide()
    setupAutoplayHoverSync()
}
