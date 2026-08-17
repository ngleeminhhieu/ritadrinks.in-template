
function smoothScrollTo(targetY, duration = 700) {
    const startY = window.pageYOffset;
    const dist = targetY - startY;
    if (Math.abs(dist) < 2) return;
    const startTime = performance.now();
    function tick(now) {
        const t = Math.min((now - startTime) / duration, 1);

        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startY + dist * eased);
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

export default function BtnToTopModule() {
    const btnToTop = document.querySelector(".backToTop");
    if (btnToTop) {
        const toggleButton = () => {
            btnToTop.classList.toggle("active", window.scrollY > 10);
        };
        window.addEventListener("scroll", toggleButton);
        toggleButton();

        btnToTop.addEventListener("click", () => smoothScrollTo(0));
    }

    const header = document.querySelector(".hd");
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || href.length < 2) return;
        let target;
        try {
            target = document.querySelector(href);
        } catch (e) {
            return;
        }
        if (!target) return;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const offset = header ? header.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
            smoothScrollTo(Math.max(y, 0));
        });
    });
}
