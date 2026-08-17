export default function AnimatedModule() {
  let $window = $(window);

  function scrollAddClass(el, className) {
    $(el).each(function () {
      let el = this;
      if (
        $(el).offset().top <
        $window.scrollTop() + ($window.height() / 10) * 10
      ) {
        $(el).addClass(className);
      }
    });
  }

  function bindImageAnimations() {
    scrollAddClass(".load-img", "is-inview");
    scrollAddClass(".load-img-second", "is-isview");
    scrollAddClass(".load-img-third", "is-inview");
    scrollAddClass(".txt-focus", "is-inview");
    scrollAddClass(".txt-animated", "is-inview");
    scrollAddClass(".txt-spl", "is-inview");
    scrollAddClass(".scroll-item", "is-inview");
    scrollAddClass(".add-class", "is-inview");

    $window.on("scroll", function () {
      scrollAddClass(".load-img", "is-inview");
      scrollAddClass(".load-img-second", "is-inview");
      scrollAddClass(".load-img-third", "is-inview");
      scrollAddClass(".txt-focus", "is-inview");
      scrollAddClass(".txt-animated", "is-inview");
      scrollAddClass(".txt-spl", "is-inview");
      scrollAddClass(".scroll-item", "is-inview");
      scrollAddClass(".add-class", "is-inview");
    });
  }
  bindImageAnimations();


  // Scroll Parallax
  gsap.registerPlugin(ScrollTrigger);
  let mm = gsap.matchMedia();
  mm.add("(min-width: 1201px)", () => {
    const moveItems = gsap.utils.toArray(".move-item");
    moveItems.forEach((item) => {
      const isMx = item.classList.contains("mx");
      gsap.fromTo(
        item,
        {
          x: isMx ? 100 : 0,
          y: isMx ? 0 : 100
        },
        {
          x: isMx ? -50 : 0,
          y: isMx ? 0 : -50,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "top -50%",
            scrub: true, 
          }
        }
      );
    });
  });
  // Cusor
  $(document).ready(function () {
    $(this).mousemove(function (e) {
      if (
        e.target.closest(".swiper-control-btn") ||
        e.target.closest("a") ||
        e.target.closest(".header-search-icon")
      ) {
        $(".banner-home .cursor-custom").addClass("hide");
      } else {
        $(".banner-home .cursor-custom").removeClass("hide");
      }
      if ($(window).width() > 1500) {
        $(".banner-home .cursor-custom").css({
          top: e.pageY - 20,
          left: e.pageX - 20,
        });
      } else {
        $(".banner-home .cursor-custom").css({
          top: e.pageY - 20,
          left: e.pageX - 20,
        });
      }
    });
  });

  function reveal() {
    var reveals = document.querySelectorAll(".parallaxSecJS");

    reveals.forEach((ele, i) => {
      var windowHeight = window.innerHeight;
      var elementTop = ele.getBoundingClientRect().top;
      var elementBottom = ele.getBoundingClientRect().bottom;
      var elementVisible = 150;
      const reveal = ele.querySelectorAll(".parallaxJS");
      const paraZoom = ele.querySelectorAll(".paraZoom");
      if (elementTop < windowHeight - elementVisible) {
        if (reveal.length > 0) {
          reveal.forEach((ele2, i2) => {
            let pos = elementTop / -2;
            console.log(pos);
            if (ele2.querySelector("img")) {
              ele2.querySelector("img").style.top = `${pos}px`;
            }
            if (ele2.querySelector("video")) {
              ele2.querySelector("video").style.top = `${pos}px`;
            }
          });
        }
      }
    });
  }
  if (window.innerWidth > 1200) {
    reveal();
    window.addEventListener("scroll", reveal);
  }

  //Scroll Percent page
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      scrollProgress();
    }
  });

  function scrollProgress() {
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const progress = document.querySelector(".header-progress");
    if (progress) {
      progress.style.width = scrolled + "%";
    }
  }
  scrollProgress();

  // 

  window.addEventListener("load", () => {
    document.querySelectorAll('.imgPara').forEach(parallaxItem => {
      new Ukiyo(parallaxItem, {
        scale: 1.3,
        speed: 1.3,
        willChange: true,
        wrapperClass: "ukiyo-wrapper",
        externalRAF: false,
      })
    })
  })
}
