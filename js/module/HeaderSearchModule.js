export default function HeaderSearchModule() {
    const hd = document.querySelector(".hd");
    if (!hd) return;
    const openBtn = hd.querySelector(".srchOpenJS");
    const closeBtn = hd.querySelector(".srchCloseJS");
    const overlay = hd.querySelector(".hd-overlay");
    const input = hd.querySelector(".hd-search input");
    if (!openBtn) return;

    // Khoá scroll nền bằng overflow:hidden trên documentElement làm hỏng
    // position:sticky của .hd (trình duyệt bỏ "stick", .hd tuột theo scrollY
    // hiện tại). Dùng kỹ thuật position:fixed trên body thay thế — không đụng
    // overflow nên .hd vẫn sticky đúng vị trí.
    let lockedScrollY = 0;
    const lockScroll = () => {
        lockedScrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${lockedScrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
    };
    const unlockScroll = () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, lockedScrollY);
    };

    const closeAll = () => {
        hd.classList.remove("s-open", "c-open");
        unlockScroll();
    };

    const openSearch = () => {
        hd.classList.remove("c-open");
        hd.classList.add("s-open");
        lockScroll();
        setTimeout(() => input && input.focus({ preventScroll: true }), 150);
    };

    openBtn.addEventListener("click", openSearch);
    if (closeBtn) closeBtn.addEventListener("click", closeAll);
    if (overlay) overlay.addEventListener("click", closeAll);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAll();
    });

    const contactOpens = document.querySelectorAll('.popup-open[data-popup="contact"]');
    const contactCloseBtn = hd.querySelector(".contactCloseJS");
    const contactInput = hd.querySelector('.hd-contact input[name="fullname"]');

    const openContact = () => {
        hd.classList.remove("s-open");
        hd.classList.add("c-open");
        lockScroll();
        setTimeout(() => contactInput && contactInput.focus({ preventScroll: true }), 150);
    };

    contactOpens.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openContact();
        });
    });
    if (contactCloseBtn) contactCloseBtn.addEventListener("click", closeAll);
}
