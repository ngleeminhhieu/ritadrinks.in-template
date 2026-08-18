export default function ShopFilterModule() {
    const sidebar = document.getElementById("shopSidebar");
    if (!sidebar) return;

    const fab = document.getElementById("shopFilterFab");
    const overlay = document.getElementById("shopOverlay");
    const closeBtn = document.getElementById("shopSidebarClose");
    const body = document.body;
    let isOpen = false;

    function open() {
        isOpen = true;
        document.dispatchEvent(new CustomEvent("panel:open", { detail: "shop-sidebar" }));
        sidebar.classList.add("open");
        if (overlay) overlay.classList.add("open");
        body.classList.add("no-scroll");
    }

    function close() {
        isOpen = false;
        sidebar.classList.remove("open");
        if (overlay) overlay.classList.remove("open");
        body.classList.remove("no-scroll");
    }

    if (fab) fab.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (overlay) overlay.addEventListener("click", close);

    document.addEventListener("panel:open", (e) => {
        if (e.detail !== "shop-sidebar" && isOpen) close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) close();
    });

    sidebar.querySelectorAll(".shop-filter__head").forEach((head) => {
        head.addEventListener("click", () => {
            const filter = head.closest(".shop-filter");
            const collapsed = filter.classList.toggle("collapsed");
            head.setAttribute("aria-expanded", String(!collapsed));
        });
    });
}
