export default function SmoothScrollModule() {
    SmoothScroll({
        // Scrolling Core
        animationTime: 800, // [ms]
        stepSize: 60, // [px]

        // Acceleration
        accelerationDelta: 50, // 50
        accelerationMax: 3, // 3

        // Keyboard Settings
        keyboardSupport: true, // option
        arrowScroll: 50, // [px]

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,

        // Other
        touchpadSupport: false, // ignore touchpad by default
        fixedBackground: true,
        excluded: ""
    });

    // const lenis = new Lenis()

    // function raf(time) {
    //     lenis.raf(time)
    //     requestAnimationFrame(raf)
    // }

    // requestAnimationFrame(raf)
}