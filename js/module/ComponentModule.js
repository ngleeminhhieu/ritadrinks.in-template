export default function ComponentModule() {
  const otpInputs = document.querySelectorAll(".otp-input");

  // Tự động chuyển ô khi nhập
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
  });

  // Xoá ô phía sau khi xóa giá trị
  otpInputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Paste OTP vào
  otpInputs.forEach((input) => {
    input.addEventListener("paste", (e) => {
      const pasteData = e.clipboardData.getData("text").split("");
      otpInputs.forEach((input, index) => {
        if (pasteData[index]) {
          input.value = pasteData[index];
        }
      });
    });
  });

  // ==========================================
  const files = document.getElementById("inputFile")
  if (files) {
    files.addEventListener("change", function () {
      var file = this.files[0];
      if (file) {
        var imageNameSpan = document.getElementById("imageName");
        imageNameSpan.textContent = file.name;
      }
    });
  }

  // Copy
  const copyBtn = document.querySelectorAll(".copyJS")
  if (copyBtn) {
    copyBtn.forEach(item => {
      const copyTxt = item.querySelector(".txt")
      item.addEventListener("click", (e) => {
        e.preventDefault();
        copyUrl();
      })
      function copyUrl() {
        const url = window.location.href; // Lấy URL hiện tại
        navigator.clipboard.writeText(url)
          .then(() => {
            item.classList.add("active");
            setTimeout(() => {
              item.classList.remove("active");
            }, 500)
          })
      }
    })

  }

  // Menu Sidebar
  $(".menu-item").each(function () {
    if ($(this).children(".submenu").length > 0) {
      $(this).addClass("dropdown");
      $(this)
        .children(".menu-link")
        .append(
          ' <i class="fa-solid fa-chevron-down toggle-icon" style="cursor:pointer;"></i>'
        );
    }
  });

  // Click vào icon mới mở submenu
  $(".menu-link .toggle-icon").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    const parentItem = $(this).closest(".menu-item");
    const submenu = parentItem.children(".submenu");

    // Toggle submenu của mục đang click
    submenu.slideToggle(function () {
      // Sau khi hoàn tất slideToggle
      if (submenu.is(":visible")) {
        parentItem.addClass("active");
      } else {
        parentItem.removeClass("active");
      }
    });

    parentItem.toggleClass("open");
  });

  function detectInView() {
    const elements = document.querySelectorAll('.checkViewJS');

    elements.forEach(el => {
      // Lấy offset (mặc định là 1 nếu không có)
      const dataOffset = el.getAttribute('data-offset') || 1;

      // Lấy giá trị mirror: mặc định là true (nghĩa là sẽ remove class khi cuộn ra ngoài)
      // Nếu set data-mirror="false", class sẽ được giữ lại mãi mãi sau khi xuất hiện
      const mirror = el.getAttribute('data-mirror') !== 'false';

      const rect = el.getBoundingClientRect();
      const inView =
        rect.top < (window.innerHeight / dataOffset) &&
        rect.bottom > 0;

      if (inView) {
        el.classList.add('inview');
      } else if (mirror) {
        // Chỉ remove class nếu mirror là true
        el.classList.remove('inview');
      }
    });
  }

  // Đăng ký sự kiện
  window.addEventListener("load", detectInView);
  window.addEventListener('scroll', detectInView);
  window.addEventListener('resize', detectInView);

  // Gọi khi DOM đã sẵn sàng
  document.addEventListener('DOMContentLoaded', detectInView);


  // item Scale JS
  const itemScaleJS = document.querySelectorAll(".itemScaleJS")
  if (itemScaleJS) {
    itemScaleJS.forEach(item => {
      const itemScaleJSIt = item.querySelectorAll(".itemScaleJS-it")
      const itemActiveHeight = item.querySelector(".itemScaleJS-it.active").offsetHeight
      itemScaleJSIt.forEach(it => {
        const itemHeight = it.offsetHeight;
        it.setAttribute("style", `--height: ${itemActiveHeight}px;`)
        it.addEventListener("click", () => {
          itemScaleJSIt.forEach(it => {
            it.classList.remove("active")
          })
          it.classList.add("active")
        })
      })
    })
  }

  // solu-why accordion
  const whyItems = document.querySelectorAll(".solu-why__item");
  if (whyItems.length > 0) {
    whyItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (!item.classList.contains("active")) {
          whyItems.forEach((el) => el.classList.remove("active"));
          item.classList.add("active");
          if (typeof AOS !== "undefined") {
            setTimeout(() => {
              AOS.refresh();
            }, 600);
          }
        }
      });
    });
  }

  $(document).ready(function () {
    $(".itemVideoJs").click(function (e) {
      e.preventDefault();
      let video = $(this).find(".itemVideoMainJs video")[0];
      let thumb = $(this).find(".itemVideoThumbJs")
      let icon = $(this).find("i");
      if (video.paused) {
        video.play();
        $(this).addClass("playing")
        icon.removeClass("fa-play").addClass("fa-pause");
      } else {
        video.pause();
        $(this).removeClass("playing")
        icon.removeClass("fa-pause").addClass("fa-play");
      }
    });
  });

  const seepass = document.querySelectorAll(".see-pass")
  if (seepass) {
    seepass.forEach(item => {
      const parent = item.closest(".form-ip")
      const ip = item.closest(".form-ip").querySelector("input")
      item.addEventListener("click", () => {
        if (parent.classList.contains("show")) {
          parent.classList.remove("show");
          ip.setAttribute("type", "password")
        } else {
          parent.classList.add("show");
          ip.setAttribute("type", "text")
        }
      })
    })
  }

  document.querySelectorAll('.avatarJS').forEach(box => {
    const input = box.querySelector('.avatarInput');
    const preview = box.querySelector('.avatarReview img');

    input.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        preview.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  });
  // =====
  const seemoreJS = document.querySelectorAll('.seemoreJS');
  if (seemoreJS) {
    seemoreJS.forEach(wrapper => {
      const init = parseInt(wrapper.dataset.init) || 0;
      const show = parseInt(wrapper.dataset.show) || 0;
      const moreText = wrapper.dataset.more || "Xem thêm";
      const lessText = wrapper.dataset.less || "Thu gọn";

      const items = wrapper.querySelectorAll(".seemoreJS-item");
      let visibleCount = init;

      // Ẩn bớt item ban đầu
      items.forEach((item, i) => {
        item.style.display = (i < init) ? "" : "none";
      });

      // Tạo nút
      if (items.length > init) {
        const btn = wrapper.querySelector(".seemoreJS-btn");
        const btnText = btn.querySelector(".txt-inner");
        btnText.textContent = moreText;

        btn.addEventListener("click", (e) => {
          e.preventDefault();
          if (visibleCount < items.length) {
            // Hiện thêm item
            let nextCount = Math.min(visibleCount + show, items.length);
            for (let i = visibleCount; i < nextCount; i++) {
              items[i].style.display = "";
            }
            visibleCount = nextCount;

            // Nếu đã hiện hết -> đổi nút thành "Thu gọn"
            if (visibleCount >= items.length) {
              btnText.textContent = lessText;
            }
          } else {
            // Thu gọn
            items.forEach((item, i) => {
              item.style.display = (i < init) ? "" : "none";
            });
            visibleCount = init;
            btnText.textContent = moreText;
          }
        });
      }
    });
  }
  const contentMoreBlocks = document.querySelectorAll(".homes-eco__content, .content-collapse");
  contentMoreBlocks.forEach((block) => {
    const content = block.querySelector(".content-more-js");
    const btns = [
      ...block.querySelectorAll(".btn-more-js"),
      ...(block.nextElementSibling?.matches(".btn-box")
        ? block.nextElementSibling.querySelectorAll(".btn-more-js")
        : []),
    ];
    const btnTexts = btns
      .map((btn) => btn.querySelector(".txt-inner"))
      .filter(Boolean);

    if (!content || !btns.length || !btnTexts.length) return;

    const moreText = block.dataset.more || "Đọc tiếp";
    const lessText = block.dataset.less || "Thu gọn";
    const setBtnText = (text) => {
      btnTexts.forEach((btnText) => {
        btnText.textContent = text;
      });
    };

    const updateState = () => {
      const isExpanded = block.classList.contains("is-expanded");
      const needsToggle = content.textContent.trim().length > 100;

      block.classList.remove("is-collapsed");

      if (!isExpanded) {
        block.classList.toggle("is-collapsed", needsToggle);
      }

      btns.forEach((btn) => {
        btn.style.display = needsToggle ? "" : "none";
      });
    };

    block.classList.add("is-collapsed");
    setBtnText(moreText);
    updateState();

    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const isExpanded = block.classList.toggle("is-expanded");
        block.classList.toggle("is-collapsed", !isExpanded);
        setBtnText(isExpanded ? lessText : moreText);
      });
    });

    window.addEventListener("resize", updateState);
  });
  // ======
  if (window.innerWidth > 1200) {
    const pjItems = document.querySelectorAll(".project-new-itemJS");
    const pjList = document.querySelector(".project-new-listJS");
    const titleGr = document.querySelector(".homes-provide .title-gr"); // Class title của bạn

    if (pjItems.length > 0 && pjList && titleGr) {

      // 1. Xác định index của item kế cuối
      // Ví dụ: có 5 item (index 0-4), thì item kế cuối là index 3 (5 - 2 = 3)
      const stopStickyIndex = pjItems.length - 1;

      gsap.set(pjItems, { opacity: 0, scale: 1 });
      gsap.set(pjItems[0], { opacity: 1, scale: 1 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: pjList,
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      pjItems.forEach((item, index) => {
        if (index > 0) {
          // Tạo biến config cho animation
          let animConfig = {
            opacity: 1,
            scale: 1,
            ease: "none"
          };

          // --- LOGIC MỚI: Kiểm tra nếu là item kế cuối ---
          if (index === stopStickyIndex) {
            animConfig.onStart = () => {
              // Khi item kế cuối bắt đầu hiện -> Bỏ sticky
              titleGr.classList.add("none-sticky");
            };
            animConfig.onReverseComplete = () => {
              // Khi lùi lại khỏi item này -> Sticky lại
              titleGr.classList.remove("none-sticky");
            };
          }
          // ----------------------------------------------

          // Fix lỗi: Dùng 'item' thay vì 'item[index]'
          tl.to(item, animConfig);
        }

        // Các animation phụ giữ nguyên logic của bạn
        tl.to(item, {
          opacity: 1,
          scale: 1,
          ease: "none"
        }, "-=.9");

        if (index < pjItems.length - 1) {
          tl.to(item, {
            opacity: 0,
            scale: 1,
            ease: "none"
          }, "-=.4");
        }
      });
    }
  }
  // =======
  const hash = window.location.hash;
  if (hash) {
    const targetId = hash.substring(1);
    const targetElement = document.getElementById(targetId);

    // Đổi 'header' thành ID hoặc class của thẻ header trên web của bạn (VD: '#main-header' hoặc '.navbar')
    const headerElement = document.querySelector('header');

    if (targetElement) {
      setTimeout(() => {
        // 1. Kiểm tra xem header có tồn tại không để lấy chiều cao, nếu không thì mặc định là 0
        const headerHeight = headerElement ? headerElement.offsetHeight : 0;

        // Bạn có thể cộng thêm một chút padding (VD: 20px) cho thoáng
        const extraPadding = 20;

        // 2. Tính toán vị trí tuyệt đối của phần tử so với đầu trang
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

        // 3. Vị trí cuộn cuối cùng = Vị trí phần tử - Chiều cao header - khoảng cách thêm (nếu có)
        const offsetPosition = elementPosition - headerHeight - extraPadding;

        // 4. Cuộn trang đến vị trí đã tính
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 300);
    }
  }
  // Lấy tất cả các input type="file" nằm trong class .upload-file
  const fileInputs = document.querySelectorAll('.upload-file input[type="file"]');
  if (fileInputs) {
    fileInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        // Tìm element hiển thị text nằm trong cùng một component .upload-file
        const textDisplay = this.closest('.upload-file').querySelector('.upload-file__txt');

        // Kiểm tra xem người dùng có chọn file hay không
        if (this.files && this.files.length > 0) {
          // Lấy tên của file đầu tiên và in ra
          const fileName = this.files[0].name;
          textDisplay.textContent = fileName;
        } else {
          // Trường hợp người dùng mở hộp thoại lên nhưng bấm Cancel (không chọn file nữa)
          textDisplay.textContent = 'Chưa có file được chọn';
        }
      });
    });
  }
const checkedLimits = document.querySelectorAll(".checkedLimit");

checkedLimits.forEach((group) => {
  const limit = Number(group.dataset.num);
  const checkboxes = group.querySelectorAll('input[type="checkbox"]');

  function updateState() {
    const checkedCount = [...checkboxes].filter(input => input.checked).length;

    checkboxes.forEach(input => {
      const checker = input.closest(".checker");

      if (checkedCount >= limit && !input.checked) {
        input.disabled = true;
        checker?.classList.add("disable");
      } else {
        input.disabled = false;
        checker?.classList.remove("disable");
      }
    });
  }

  checkboxes.forEach(input => {
    input.addEventListener("change", updateState);
  });

  updateState();
});

  if (innerWidth > 1350) {
    (function pjectdtDescInnerSticky() {
      const pjectdtInner = document.querySelector(".pjectdt-desc-inner");
      if (!pjectdtInner) return;

      const nearBottomPx = 20;

      function updatepjectdtSticky() {
        const rect = pjectdtInner.getBoundingClientRect();
        const distanceFromBottom = rect.top - window.innerHeight; // >0 nếu phần tử nằm dưới viewport

        if (rect.bottom < 0) {
          pjectdtInner.classList.add("sticky");
          return;
        }

        if (distanceFromBottom > nearBottomPx) {
          pjectdtInner.classList.add("sticky");
        } else {
          pjectdtInner.classList.remove("sticky");
        }
      }

      window.addEventListener("scroll", updatepjectdtSticky, {
        passive: true,
      });
      window.addEventListener("resize", updatepjectdtSticky);
      updatepjectdtSticky();
    })();
  }

  // Sort Dropdown select interaction
  const sortDropdown = document.querySelector(".news-all__sort-dropdown");
  if (sortDropdown) {
    const selected = sortDropdown.querySelector(".news-all__sort-selected");
    const options = sortDropdown.querySelectorAll(".news-all__sort-option");
    
    selected.addEventListener("click", (e) => {
      e.stopPropagation();
      sortDropdown.classList.toggle("active");
    });
    
    options.forEach(opt => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        options.forEach(o => o.classList.remove("active"));
        opt.classList.add("active");
        selected.querySelector("span").textContent = opt.textContent;
        sortDropdown.classList.remove("active");
      });
    });
    
    document.addEventListener("click", () => {
      sortDropdown.classList.remove("active");
    });
  }

  // Certificate list: pagination "see more". Ẩn từ item thứ (page-size) trở đi.
  // Item ẩn cũng gỡ data-fancybox để không lọt vào group của Fancybox.
  document.querySelectorAll(".cert-list__grid").forEach((grid) => {
    const pageSize = parseInt(grid.dataset.pageSize, 10) || 8;
    const items = Array.from(grid.querySelectorAll(".cert-card"));
    if (items.length <= pageSize) return;
    const btn = grid.closest("section").querySelector(".certLoadMoreJS");

    const fbAttr = "certificates";
    const fbStore = new WeakMap();
    items.forEach((it) => fbStore.set(it, it.getAttribute("data-fancybox") || fbAttr));

    const applyState = (visibleCount) => {
      items.forEach((item, idx) => {
        const visible = idx < visibleCount;
        item.classList.toggle("is-hidden", !visible);
        if (visible) item.setAttribute("data-fancybox", fbStore.get(item));
        else item.removeAttribute("data-fancybox");
      });
      if (btn) btn.style.display = visibleCount >= items.length ? "none" : "";
    };

    let visible = pageSize;
    applyState(visible);

    if (btn) {
      btn.addEventListener("click", () => {
        visible = Math.min(visible + pageSize, items.length);
        applyState(visible);
      });
    }
  });

  // Video intro: preload MP4 when section approaches viewport, activate on click
  document.querySelectorAll(".video-intro__stage").forEach(stage => {
    const src = stage.dataset.videoSrc;
    if (!src) return;
    const poster = stage.querySelector(".video-intro__poster");
    const playBtn = stage.querySelector(".video-intro__play");
    let video = null;

    const preload = () => {
      if (video) return;
      video = document.createElement("video");
      video.src = src;
      video.playsInline = true;
      video.setAttribute("preload", "auto");
      stage.insertBefore(video, stage.firstChild);
      video.onpause = () => stage.classList.remove("is-playing");
      video.onplay = () => stage.classList.add("is-playing");
      video.onended = () => stage.classList.remove("is-playing");
    };

    const activate = (e) => {
      if (e) e.stopPropagation();
      if (e && e.target.closest(".video-intro__actions")) return;
      preload();
      if (poster) poster.remove();
      stage.classList.add("is-playing");
      video.play().catch(() => { });
    };

    const toggle = (e) => {
      if (e && e.target.closest(".video-intro__actions")) return;
      if (!video || poster) { activate(e); return; }
      if (video.paused) video.play(); else video.pause();
    };

    if (playBtn) playBtn.addEventListener("click", activate);
    stage.addEventListener("click", toggle);

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            preload();
            io.disconnect();
          }
        });
      }, { rootMargin: "300px" });
      io.observe(stage);
    }
  });
}
