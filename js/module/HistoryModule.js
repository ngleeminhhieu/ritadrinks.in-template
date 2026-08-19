export default function HistoryModule() {
    const section = document.getElementById("histTimeline");
    if (!section) return;

    const pin = section.querySelector(".hist__pin");
    const media = section.querySelector(".hist__media");
    const track = section.querySelector(".hist__track");
    const shots = Array.from(section.querySelectorAll(".hist__shot"));
    const panels = Array.from(section.querySelectorAll(".hist__panel"));
    const years = Array.from(section.querySelectorAll(".hist__year"));
    if (!pin || !media || !track || !shots.length) return;

    // Xen kẽ shot ↔ panel bằng flex/grid order khi mobile flatten qua display:contents.
    // Set 1 lần đủ; CSS media query kiểm soát khi nào áp dụng layout dạng grid.
    shots.forEach((shot, i) => { shot.style.order = String(i * 2 + 1); });
    panels.forEach((panel, i) => { panel.style.order = String(i * 2 + 2); });

    // Chỉ chạy hiệu ứng scrub-slide trên PC (>= 1201px).
    const mq = window.matchMedia("(min-width: 1201px)");
    if (!mq.matches) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const count = shots.length;
    const transitions = Math.max(count - 1, 1);
    const step = 1 / transitions;

    const setShotWidth = () => {
        const w = media.offsetWidth;
        if (w > 0) section.style.setProperty("--shot-w", w + "px");
    };
    setShotWidth();
    window.addEventListener("resize", setShotWidth);

    // Track ở flex row-reverse: shot 0 nằm rightmost. Dịch track sang trái để shot 0 lọt clip;
    // scroll -> track dịch phải, shot cũ ra phải, shot mới lộ trái. Luôn liền kề (flex sát nhau).
    const trackXFor = (i) => -(count - 1 - i) * media.offsetWidth;

    const yearStart = (year) => -year.offsetHeight;
    const yearEnd = () => pin.offsetHeight;
    const yearMid = (year) => (pin.offsetHeight - year.offsetHeight) / 2;

    const setInitialState = () => {
        setShotWidth();
        gsap.set(track, { x: trackXFor(0) });
        gsap.set(panels, { opacity: 0 });
        gsap.set(panels[0], { opacity: 1 });
        years.forEach((year, index) => {
            if (index === 0) gsap.set(year, { y: yearMid(year) });
            else gsap.set(year, { y: yearStart(year) });
        });
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

    for (let index = 1; index < count; index += 1) {
        const at = (index - 1) * step;
        const dur = step;
        timeline
            .to(track, { x: () => trackXFor(index), ease: "none", duration: dur }, at)
            .to(years[index - 1], { y: yearEnd, ease: "none", duration: dur }, at)
            .to(years[index], { y: yearMid(years[index]), ease: "none", duration: dur }, at)
            // Panel swap tức thời tại midpoint để không chồng chữ 2 panel
            .set(panels[index - 1], { opacity: 0 }, at + dur / 2)
            .set(panels[index], { opacity: 1 }, at + dur / 2);
    }

    ScrollTrigger.refresh();
}
