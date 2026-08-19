export default function HistoryModule() {
    const section = document.getElementById("histTimeline");
    if (!section) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const pin = section.querySelector(".hist__pin");
    const shots = gsap.utils.toArray(section.querySelectorAll(".hist__shot"));
    const years = gsap.utils.toArray(section.querySelectorAll(".hist__year"));
    const panels = gsap.utils.toArray(section.querySelectorAll(".hist__panel"));
    if (!pin || !shots.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const count = shots.length;
    const step = 1 / count;
    const shift = step * 0.35;

    const yearStart = (year) => -year.offsetHeight;
    const yearEnd = () => pin.offsetHeight;

    const setInitialState = () => {
        gsap.set(shots, { xPercent: -100 });
        gsap.set(shots[0], { xPercent: 0 });
        gsap.set(panels, { opacity: 0 });
        gsap.set(panels[0], { opacity: 1 });
        years.forEach((year) => gsap.set(year, { yPercent: 0, y: yearStart(year) }));
    };

    setInitialState();

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: setInitialState
        }
    });

    timeline.to({}, { duration: 1 }, 0);

    years.forEach((year, index) => {
        timeline.to(
            year,
            { y: yearEnd, ease: "none", duration: step },
            index * step
        );
    });

    for (let index = 1; index < count; index += 1) {
        const at = index * step - shift;

        timeline
            .to(shots[index - 1], { xPercent: 100, ease: "none", duration: shift }, at)
            .to(shots[index], { xPercent: 0, ease: "none", duration: shift }, at)
            .to(panels[index - 1], { opacity: 0, duration: shift }, at)
            .to(panels[index], { opacity: 1, duration: shift }, at);
    }

    ScrollTrigger.refresh();
}
