export default function MilestoneModule() {
    const section = document.getElementById("mileTimeline");
    if (!section) return;

    const stage = section.querySelector(".mile__stage");
    const track = section.querySelector(".mile__track");
    const marker = section.querySelector(".mile__marker");
    const nodes = Array.from(section.querySelectorAll(".mile__node"));
    const cards = Array.from(section.querySelectorAll(".mile-card"));
    if (!stage || !track || !marker || !nodes.length) return;

    const desktop = window.matchMedia("(min-width: 1201px)");
    if (!desktop.matches) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Marker chỉ chạy tới node thứ FOLLOW_AT, sau đó đứng yên và kéo track sang trái
    const FOLLOW_AT = 6;
    const count = nodes.length;

    let stops = [];
    const measure = () => {
        const start = nodes[0].offsetLeft - nodes[0].offsetWidth;
        stops = [start].concat(nodes.map((n) => n.offsetLeft));
    };

    const posAt = (p) => {
        const i = Math.max(0, Math.min(Math.floor(p), stops.length - 2));
        return stops[i] + (stops[i + 1] - stops[i]) * (p - i);
    };

    const render = (progress) => {
        const p = progress * count;
        const x = posAt(p);
        const shift = Math.min(0, -(x - stops[FOLLOW_AT]));

        gsap.set(track, { x: shift });
        gsap.set(marker, { x: x + shift });

        cards.forEach((card, i) => {
            const t = gsap.utils.clamp(0, 1, (p - (i + 0.35)) / 0.65);
            gsap.set(card, { yPercent: (1 - t) * 60, opacity: t });
        });
    };

    measure();
    render(0);

    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onRefreshInit: measure,
        onUpdate: (self) => render(self.progress)
    });

    ScrollTrigger.refresh();
}
