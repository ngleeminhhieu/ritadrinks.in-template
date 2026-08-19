export default function LeaderPanelModule() {
    const panel = document.getElementById("leaderPanel");
    const openBtn = document.getElementById("leaderOpen");
    const closeBtn = document.getElementById("leaderClose");
    if (!panel || !openBtn) return;

    const body = document.body;
    const compactQuery = window.matchMedia("(max-width: 1200px)");

    const open = () => {
        document.dispatchEvent(new CustomEvent("panel:open", { detail: "leader-panel" }));
        panel.classList.add("open");
        body.classList.add("no-scroll");
    };

    const close = () => {
        panel.classList.remove("open");
        body.classList.remove("no-scroll");
    };

    openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);

    compactQuery.addEventListener("change", (e) => {
        if (!e.matches) close();
    });
}
