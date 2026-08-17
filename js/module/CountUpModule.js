export default function CountUpModule() {
   const nodes = document.querySelectorAll("[data-count]");
   if (!nodes.length) return;

   const format = (n) => String(n);
   const unitOf = (el) =>
      el.parentElement ? el.parentElement.querySelector(".stat__unit") : null;

   const hideUnit = (unit) => {
      if (!unit) return;
      unit.style.display = "inline-block";
      unit.style.opacity = "0";
      unit.style.transform = "translateY(0.35em)";
      unit.style.transition =
         "opacity .5s ease, transform .5s cubic-bezier(.2,1.1,.4,1)";
   };
   const showUnit = (unit) => {
      if (!unit) return;
      unit.style.opacity = "1";
      unit.style.transform = "translateY(0)";
   };

   const animate = (el) => {
      const target = Number(el.dataset.count) || 0;
      const duration = Number(el.dataset.countDur) || 1400;
      const unit = unitOf(el);

      const start = performance.now();
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
         const t = Math.min((now - start) / duration, 1);
         el.textContent = format(Math.round(target * easeOut(t)));
         if (t < 1) {
            requestAnimationFrame(tick);
         } else {
            showUnit(unit); // đếm xong -> hiện suffix
         }
      };
      requestAnimationFrame(tick);
   };

   const io = new IntersectionObserver(
      (entries, obs) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               animate(entry.target);
               obs.unobserve(entry.target);
            }
         });
      },
      { threshold: 0.35 }
   );

   nodes.forEach((el) => {
      el.textContent = "0";
      hideUnit(unitOf(el)); // ẩn suffix trước, đếm xong mới hiện
      io.observe(el);
   });
}
