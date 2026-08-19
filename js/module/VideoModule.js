export default function VideoModule() {
    if (typeof Fancybox === "undefined") return;
    Fancybox.bind("[data-fancybox]", {});
}
