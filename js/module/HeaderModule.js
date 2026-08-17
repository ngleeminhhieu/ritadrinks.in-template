export default function HeaderModule() {
    const main = document.querySelector(".main")
    const header = document.querySelector(".hd");
    const mobile = document.querySelector(".mobile");
    const mobileOverlay = document.querySelector(".mobile-overlay");
    function HandleHeader() {
        if (header && mobile && mobileOverlay) {
            if (window.scrollY > 0) {
                if (main) main.classList.add("hd-sticky");
                document.body.classList.add("sticky");
                mobile.classList.add("sticky");
                mobileOverlay.classList.add("sticky");
            } else {
                document.body.classList.remove("sticky");
                mobile.classList.remove("sticky");
                mobileOverlay.classList.remove("sticky");
                if (main) main.classList.remove("hd-sticky");
            }
        }
    }
    window.addEventListener("scroll", function () {
        HandleHeader();
    });
    HandleHeader();

    if (header) {
        let lastScrollY = window.scrollY;
        let megaOpen = false;

        function HandleHeaderState() {
            const scrollY = window.scrollY;
            const scrollingDown = scrollY > lastScrollY;

            header.classList.toggle("hd-transparent", scrollY <= 0 && !megaOpen && !header.classList.contains("default"));

            if (scrollY <= 0) {
                header.classList.remove("hd-top-hide");
            } else if (scrollingDown) {
                header.classList.add("hd-top-hide");
            } else {
                header.classList.remove("hd-top-hide");
            }

            lastScrollY = scrollY;
        }

        window.addEventListener("scroll", HandleHeaderState, { passive: true });
        HandleHeaderState();

        const megaItems = header.querySelectorAll(".menu-item.mega[data-mega]");
        const megaContainer = header.querySelector(".hd-mega");
        let megaCloseTimer = null;

        function openMega(key) {
            clearTimeout(megaCloseTimer);
            megaOpen = true;
            header.setAttribute("data-active-mega", key);
            HandleHeaderState();
        }

        function scheduleCloseMega() {
            clearTimeout(megaCloseTimer);
            megaCloseTimer = setTimeout(() => {
                if (megaContainer && megaContainer.matches(":hover")) return;
                megaOpen = false;
                header.removeAttribute("data-active-mega");
                HandleHeaderState();
            }, 120);
        }

        megaItems.forEach((item) => {
            item.addEventListener("mouseenter", () => openMega(item.dataset.mega));
            item.addEventListener("mouseleave", scheduleCloseMega);
        });

        if (megaContainer) {
            megaContainer.addEventListener("mouseenter", () => {
                clearTimeout(megaCloseTimer);
            });
            megaContainer.addEventListener("mouseleave", scheduleCloseMega);
        }
    }

    const hdCate = document.querySelector(".hdCateJS")
    if (hdCate) {
        const hdCateOpen = hdCate.querySelector(".hd-cate-open")
        const hdCateBody = hdCate.querySelector(".hd-cate-body")
        document.addEventListener("click", (e) => {
            if (hdCateOpen.contains(e.target) || hdCateBody.contains(e.target)) {
                if (hdCateBody.className.includes("open") && !hdCateBody.contains(e.target)) {
                    hdCateBody.classList.remove("open");
                } else {
                    hdCateBody.classList.add("open");
                }
            } else {
                hdCateBody.classList.remove("open");
            }
        })
    }



    const cart = document.querySelector(".cartJS")
    const cartBtn = document.querySelector(".cartBtnJS")
    const cartFixBtn = document.querySelector(".fixedNavCartJS")
    if (cart && cartBtn && cartFixBtn) {
        const cartClose = cart.querySelector(".cartCloseJS")
        const cartBox = cart.querySelector(".cartBoxJS")
        document.addEventListener("click", (e) => {
            if (cartFixBtn.contains(e.target) || cartBtn.contains(e.target) || cartBox.contains(e.target) && !cartClose.contains(e.target)) {
                cart.classList.add("open")
            } else {
                cart.classList.remove("open")
            }
        })
    }



    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            $("body").removeClass("no-scroll")
            $("body").css("overflow", "hidden auto")
            const popup = document.querySelector('.popup.active');
            if (popup) popup.classList.remove('active');
            const menu = document.querySelector('.mobile.open');
            const bg = document.querySelector(".hamburger")
            const menuOver = document.querySelector(".mobile-overlay.open")
            if (menu) {
                menu.classList.remove('open');
                menuOver.classList.remove('open');
                bg.classList.remove("active")
            }
            const cart = document.querySelector('.cartJS.open');
            if (cart) cart.classList.remove('open');
            const found = document.querySelector(".foundJS.open")
            if (found) found.classList.remove('open');


        }
    });


    const headerDiv = document.querySelector(".hd");

    if (headerDiv) {
        function hideHeader() {
            if (window.scrollY > headerDiv.clientHeight) {
                headerDiv.classList.add("hd-custom");
            } else {
                headerDiv.classList.remove("hd-custom");
            }
            headerDiv.classList.remove("hide-hd");
        }

        hideHeader();
        window.addEventListener("scroll", hideHeader);
    }

}