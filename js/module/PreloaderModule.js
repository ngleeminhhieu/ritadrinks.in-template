export default function PreloaderModule() {
    const preloader = document.querySelector(".preloaderJS");
    if (!preloader) return;

    [
        preloader.querySelector("#preloaderWaveRise"),
        preloader.querySelector("#preloaderWave1Ripple"),
        preloader.querySelector("#preloaderWave2Ripple"),
    ].forEach((el) => {
        if (el) el.beginElement();
    });

    const reveal = () => preloader.classList.add("is-done");
    const minDuration = new Promise((resolve) => setTimeout(resolve, 2200));
    const pageLoaded = document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

    Promise.all([minDuration, pageLoaded]).then(reveal);
}
