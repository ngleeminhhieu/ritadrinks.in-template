export default function MobileModule() {
    
    const mobile = document.querySelector(".mobile");
    if(mobile) {

        const burgerBtn = document.getElementById("hamburger");
    
        const mobileOverLay = document.querySelector(".mobile-overlay");
        const body = document.getElementsByTagName("body")[0];
        const header = document.querySelector(".hd");
        const mobileClose = document.querySelector(".mobile-close");
        let isOpen = false;
    
        function HandleOpen() {
            isOpen = !isOpen;
            if (isOpen) {
                document.dispatchEvent(new CustomEvent("panel:open", { detail: "mobile-menu" }));
                burgerBtn.classList.add("active");
                mobile.classList.add("open");
                mobileOverLay.classList.add("open");
                body.classList.add("no-scroll");
    
            } else {
                burgerBtn.classList.remove("active");
                mobile.classList.remove("open");
                mobileOverLay.classList.remove("open");
                body.classList.remove("no-scroll");
            }
        }
    
        function HandleClose() {
            isOpen = false;
            burgerBtn.classList.remove("active");
            mobile.classList.remove("open");
            mobileOverLay.classList.remove("open");
            // header.classList.remove("sticky");
            body.classList.remove("no-scroll");
        }
    
        if (burgerBtn) {
            burgerBtn.addEventListener("click", () => {
                HandleOpen()
            });
        }
        if (mobileClose) {
            mobileClose.addEventListener("click", function () {
                HandleClose()
            });
        }
        if (mobileOverLay) {
            mobileOverLay.addEventListener("click", function () {
                HandleClose()
            });
        }
        document.addEventListener("panel:open", (e) => {
            if (e.detail !== "mobile-menu" && isOpen) HandleClose();
        });
        const menuNavs = document.querySelectorAll(".hd .menu-nav");
        if (menuNavs) {
            menuNavs.forEach((item) => {
                const dir = item.closest(".mobile-nav") ? "fa-chevron-right" : "fa-chevron-down";
                const menuLinks = item.querySelectorAll(".menu-item.dropdown .menu-link");
                menuLinks.forEach((item) => {
                    const contentOld = item.innerHTML;
                    const contentNew = `${contentOld} <i class="fa-solid ${dir}"></i>`;
                    item.innerHTML = contentNew;
                });
            });
        }
        const arrowIcon = document.querySelectorAll(
            ".mobile-nav .menu-list .menu-item a i"
        );
        if (arrowIcon) {
            arrowIcon.forEach((item) => {
                item.addEventListener("click", (e) => {
                    e.preventDefault();
                    const menu =
                        item.parentElement.parentElement.querySelectorAll(".menu-list")[0];
                    $(menu).slideToggle();
                    $(item.parentElement.parentElement).toggleClass("active");
                });
            });
        }
        document.addEventListener("click",(e)=> {
            if(mobile.contains(e.target) || burgerBtn.contains(e.target)) return;
            if(isOpen) HandleClose();
        })
    }
}