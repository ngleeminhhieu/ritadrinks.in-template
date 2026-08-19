export default function StickyCtaModule() {
    const stickyBar = document.querySelector(".stickyCtaJS");
    const trigger = document.querySelector(".product-detail__actions");
    const footer = document.querySelector(".ft");
    if (!stickyBar) return;

    const compactQuery = window.matchMedia("(max-width: 1200px)");
    let scrolledPastActions = false;
    let footerVisible = false;

    const updateStickyBar = () => {
        const shouldShow = compactQuery.matches
            ? !footerVisible
            : scrolledPastActions && !footerVisible;
        stickyBar.classList.toggle("active", shouldShow);
    };

    if (trigger) {
        const actionsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                scrolledPastActions = !entry.isIntersecting && entry.boundingClientRect.top < 0;
                updateStickyBar();
            });
        });
        actionsObserver.observe(trigger);
    }

    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                footerVisible = entry.isIntersecting;
                updateStickyBar();
            });
        });
        footerObserver.observe(footer);
    }

    compactQuery.addEventListener("change", updateStickyBar);
    updateStickyBar();
}
