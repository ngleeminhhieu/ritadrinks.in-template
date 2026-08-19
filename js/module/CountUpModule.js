export default function CountUpModule() {
   const nodes = document.querySelectorAll("[data-count]");
   if (!nodes.length) return;

   const format = (n) => String(n);
   const unitOf = (el) =>
      el.parentElement ? el.parentElement.querySelector(".stat__unit") : null;
   const labelOf = (el) => {
      const stat = el.closest(".stat");
      return stat ? stat.querySelector(".stat__label") : null;
   };

   const hideFade = (node) => {
      if (!node) return;
      node.style.opacity = "0";
      node.style.transform = "translateY(0.35em)";
      node.style.transition =
         "opacity .5s ease, transform .5s cubic-bezier(.2,1.1,.4,1)";
   };
   const showFade = (node) => {
      if (!node) return;
      node.style.opacity = "1";
      node.style.transform = "translateY(0)";
   };

   const animate = (el) => {
      const target = Number(el.dataset.count) || 0;
      const duration = Number(el.dataset.countDur) || 1400;
      const unit = unitOf(el);
      const label = labelOf(el);

      const start = performance.now();
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
         const t = Math.min((now - start) / duration, 1);
         el.textContent = format(Math.round(target * easeOut(t)));
         if (t < 1) {
            requestAnimationFrame(tick);
         } else {
            showFade(label); // đếm xong -> hiện label trước
            setTimeout(() => showFade(unit), 150); // rồi mới tới suffix
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
      hideFade(unitOf(el));
      hideFade(labelOf(el)); // ẩn cả label lẫn suffix, tránh giật layout khi số đang đổi độ rộng
      io.observe(el);
   });
}
