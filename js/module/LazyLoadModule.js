export default function lazyLoadingModule() {
    function loadImg(img) {
        const lazy_src = img.getAttribute("lazy-src");
        img.setAttribute("src", lazy_src);
        img.removeAttribute("lazy-src");
    }

    if ("IntersectionObserver" in window) {
        const lazy_img = document.querySelectorAll("[lazy-src]");
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImg(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        lazy_img.forEach((img) => {
            observer.observe(img);
        });
    }
}
