export default function AosModule() {
    AOS.init({
        startEvent: 'DOMContentLoaded',
        offset: 100,
        duration: 1200,
        delay: '200',
        easing: 'ease',
        once: true,
        mirror: true,
        disable: function() {
            return $(window).width() <= 600;
        },
    });

    window.addEventListener("load", () => {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    });
}