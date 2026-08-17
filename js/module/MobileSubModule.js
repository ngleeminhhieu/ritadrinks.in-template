export default function MobileSubModule() {
    const mobile = document.querySelector(".mobile");
    if (!mobile) return;

    const closeAll = () => {
        mobile.querySelectorAll(".mobile-sub.open").forEach((p) => p.classList.remove("open"));
    };

    mobile.querySelectorAll(".mobileSubJS").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            // MobileModule toggle class "active" khi bấm trúng icon — gỡ ra để không dính state đỏ/xoay
            const li = btn.closest(".menu-item");
            if (li) li.classList.remove("active");
            const panel = mobile.querySelector(`[data-sub-panel="${btn.dataset.sub}"]`);
            if (panel) panel.classList.add("open");
        });
    });

    mobile.querySelectorAll(".mobileBackJS").forEach((btn) => {
        btn.addEventListener("click", () => {
            const panel = btn.closest(".mobile-sub");
            if (panel) panel.classList.remove("open");
        });
    });

    // Đóng menu (hamburger/overlay/Esc) thì reset về panel gốc
    document.addEventListener("click", (e) => {
        if (e.target.closest(".hamburger") || e.target.closest(".mobile-overlay")) {
            setTimeout(closeAll, 400);
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setTimeout(closeAll, 400);
    });
}
