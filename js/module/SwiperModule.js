export default function SwiperModule() {
    function functionSlider(element, customizeOption, typePagi) {
        const swiperSlider = document.querySelectorAll(element)
        if (swiperSlider) {
            swiperSlider.forEach(item => {
                const swiper = item.querySelector(".swiper")
                if (!swiper) return
                const pagi = item.querySelector(".swiper-pagination")
                const next = item.querySelector(".swiper-next")
                const prev = item.querySelector(".swiper-prev")
                if (!typePagi) {
                    typePagi = "bullets"
                }
                var slide = new Swiper(swiper, {
                    watchSlidesProgress: true,
                    pagination: {
                        el: pagi,
                        type: typePagi,
                        clickable: true
                    },
                    navigation: {
                        nextEl: next,
                        prevEl: prev
                    },
                    fadeEffect: {
                        crossFade: true
                    },
                    ...customizeOption
                })
            })
        }
    }

    functionSlider(".element", {
        speed: 1200,
        autoplay: {
            delaY: 5000
        },

        initialSlide: 0,
        centeredSlides: false,
        loop: false,
        spaceBetween: 24,
        effect: "slide",
        breakpoints: {
            0: {
                slidesPerView: 1.2,
                freeMode: true
            },
            500: {
                slidesPerView: 2.2
            },
            600: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 3
            }
        }
    })

    const heroSliderEl = document.querySelector(".home-hero__slider")
    if (heroSliderEl) {
        const heroEl = heroSliderEl.querySelector(".swiper")
        if (heroEl) {
            new Swiper(heroEl, {
                speed: 1000,
                loop: true,
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                slidesPerView: 1,
                spaceBetween: 0,
                grabCursor: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: heroSliderEl.querySelector(".swiper-pagination"),
                    clickable: true
                },
                navigation: {
                    nextEl: heroSliderEl.querySelector(".swiper-next"),
                    prevEl: heroSliderEl.querySelector(".swiper-prev")
                }
            })
        }
    }

    const capEl = document.querySelector(".cap__slider .swiper")
    if (capEl) {
        new Swiper(capEl, {
            speed: 800,
            slidesPerView: 4,
            spaceBetween: 24,
            grid: {
                rows: 2,
                fill: "row"
            },
            grabCursor: true,
            navigation: {
                nextEl: ".capNextJS",
                prevEl: ".capPrevJS"
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                    grid: { rows: 2, fill: "row" }
                },
                600: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                    grid: { rows: 2, fill: "row" }
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                    grid: { rows: 2, fill: "row" }
                }
            }
        })
    }

    const blogSliderEl = document.querySelector(".home-blog__slider .swiper")
    if (blogSliderEl) {
        new Swiper(blogSliderEl, {
            speed: 800,
            loop: true,
            spaceBetween: 32,
            slidesPerView: 1.5,
            grabCursor: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: ".blogNextJS",
                prevEl: ".blogPrevJS"
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.3,
                    spaceBetween: 16,
                    centeredSlides: true
                },
                600: {
                    slidesPerView: 1.6,
                    spaceBetween: 24,
                    centeredSlides: true
                },
                1200: {
                    slidesPerView: 2.3,
                    spaceBetween: 32,
                    centeredSlides: false
                }
            }
        })
    }

    const blogFeaturedEl = document.querySelector(".blog-featured__slider .swiper")
    if (blogFeaturedEl) {
        new Swiper(blogFeaturedEl, {
            speed: 800,
            loop: true,
            centeredSlides: true,
            slidesPerView: "auto",
            spaceBetween: 16,
            grabCursor: true,
            breakpoints: {
                0: {
                    spaceBetween: 8
                },
                600: {
                    spaceBetween: 16
                }
            },
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        })
    }

    const milestoneEl = document.querySelector(".milestone__slider .swiper")
    if (milestoneEl) {
        new Swiper(milestoneEl, {
            speed: 600,
            slidesPerView: "auto",
            spaceBetween: 24,
            grabCursor: true,
            breakpoints: {
                0: {
                    spaceBetween: 16
                },
                600: {
                    spaceBetween: 24
                }
            }
        })
    }

    const processEl = document.querySelector(".process__slider .swiper")
    if (processEl) {
        new Swiper(processEl, {
            speed: 700,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            grabCursor: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: processEl.parentElement.querySelector(".process__pagination"),
                clickable: true
            }
        })
    }

    const provenEl = document.querySelector(".proven-gallery .swiper")
    if (provenEl) {
        new Swiper(provenEl, {
            speed: 700,
            slidesPerView: 3,
            spaceBetween: 16,
            grabCursor: true,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.15,
                    spaceBetween: 10
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 12
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 16
                }
            }
        })
    }

    // Activities: PC là grid tĩnh (CSS), chỉ tablet/mobile mới init slider
    const actEl = document.querySelector(".activities__gallery .swiper")
    if (actEl) {
        let actSwiper = null;
        const actMq = window.matchMedia("(max-width: 1200px)");
        const buildAct = () => {
            if (actMq.matches && !actSwiper) {
                actSwiper = new Swiper(actEl, {
                    speed: 700,
                    grabCursor: true,
                    loop: true,
                    centeredSlides: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1.15,
                            spaceBetween: 10
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 12
                        }
                    }
                });
            } else if (!actMq.matches && actSwiper) {
                actSwiper.destroy(true, true);
                actSwiper = null;
            }
        };
        buildAct();
        actMq.addEventListener("change", buildAct);
    }

    const newsEl = document.querySelector(".news__slider .swiper")
    if (newsEl) {
        new Swiper(newsEl, {
            speed: 800,
            spaceBetween: 24,
            slidesPerView: 3,
            grabCursor: true,
            navigation: {
                nextEl: ".newsNextJS",
                prevEl: ".newsPrevJS"
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.15,
                    spaceBetween: 16
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            }
        })
    }

    const relatedProductsEl = document.querySelector(".related-products__slider .swiper")
    if (relatedProductsEl) {
        new Swiper(relatedProductsEl, {
            speed: 800,
            loop: true,
            spaceBetween: 24,
            slidesPerView: 4,
            grabCursor: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.3
                },
                600: {
                    slidesPerView: 2.3
                },
                1200: {
                    slidesPerView: 4
                }
            }
        })
    }

    const releaseEl = document.querySelector(".home-release__slider .swiper")
    if (releaseEl) {
        let relSwiper = null
        const relMq = window.matchMedia("(max-width: 600px)")
        const REL_GAP = 12

        const sizeRel = () => {
            if (!relSwiper) return
            let max = 0
            releaseEl.querySelectorAll(".product-item").forEach((it) => {
                if (it.offsetHeight > max) max = it.offsetHeight
            })
            if (!max) return
            const target = max * 2 + REL_GAP + "px"
            if (releaseEl.style.height !== target) releaseEl.style.height = target
        }

        const buildRel = () => {
            if (relSwiper) return
            relSwiper = new Swiper(releaseEl, {
                slidesPerView: 2,
                grid: {
                    rows: 2,
                    fill: "column"
                },
                spaceBetween: REL_GAP,
                rewind: true,
                grabCursor: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                on: {
                    afterInit: sizeRel,
                    resize: sizeRel,
                    imagesReady: sizeRel
                }
            })
            requestAnimationFrame(sizeRel)
        }

        const destroyRel = () => {
            if (relSwiper) {
                relSwiper.destroy(true, true)
                relSwiper = null
            }
            releaseEl.style.height = ""
        }

        const syncRel = (e) => {
            if (e.matches) buildRel()
            else destroyRel()
        }
        relMq.addEventListener("change", syncRel)
        syncRel(relMq)
    }

    const whyEl = document.querySelector(".why__slider .swiper")
    if (whyEl) {
        let whySwiper = null
        const whyMq = window.matchMedia("(max-width: 1200px)")
        const buildWhy = () => {
            if (whySwiper) return
            whySwiper = new Swiper(whyEl, {
                slidesPerView: 1.2,
                spaceBetween: 16,
                loop: true,
                grabCursor: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                breakpoints: {
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            })
        }
        const destroyWhy = () => {
            if (whySwiper) {
                whySwiper.destroy(true, true)
                whySwiper = null
            }
        }
        const syncWhy = (e) => {
            if (e.matches) buildWhy()
            else destroyWhy()
        }
        whyMq.addEventListener("change", syncWhy)
        syncWhy(whyMq)
    }

    const exhiMap = document.querySelector(".exhi__map")
    if (exhiMap) {
        const exhiIO = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible")
                    obs.unobserve(entry.target)
                }
            })
        }, { threshold: 0.25 })
        exhiIO.observe(exhiMap)
    }

    const exhiLogo = document.querySelector(".exhi__logos .splide")
    if (exhiLogo) {
        new Splide(exhiLogo, {
            type: "loop",
            drag: "free",
            autoWidth: true,
            gap: "3.2rem",
            arrows: false,
            pagination: false,
            autoScroll: {
                speed: 0.6,
                pauseOnHover: true
            }
        }).mount(window.splide.Extensions)
    }

    const splides = document.querySelectorAll(".logoSplide .splide")
    if (splides) {
        splides.forEach((splidex, index) => {
            new Splide(splidex, {
                type: "loop",
                drag: "free",
                focus: "center",
                perMove: 1,
                perPage: 6,
                gap: 24,
                direction: index == 1 ? "rtl" : "ltr",
                autoScroll: {
                    speed: 0.5
                },
                breakpoints: {
                    0: {
                        perPage: 3,
                        gap: 12
                    },
                    600: {
                        perPage: 3,
                        gap: 12
                    },
                    951: {
                        perPage: 4,
                        gap: 12
                    },
                    1201: {
                        perPage: 6,
                        gap: 24
                    }
                }
            }).mount(window.splide.Extensions)
        })
    }

    const twosplides = document.querySelectorAll(".twoSplide .splide")
    if (twosplides) {
        twosplides.forEach((splidex, index) => {
            new Splide(splidex, {
                type: "loop",
                drag: "free",
                focus: "center",
                perMove: 1,
                perPage: 3.7,
                direction: index == 1 ? "rtl" : "ltr",
                clones: 3,
                gap: 24,
                arrows: false,
                pagination: false,
                autoScroll: {
                    speed: 0.8
                },
                breakpoints: {
                    0: {
                        gap: 8,
                    },
                    420: {
                        perPage: 2,
                        gap: 8,
                    },
                    501: {
                        perPage: 2,
                        gap: 12,
                    },
                    769: {
                        perPage: 2,
                        gap: 12,
                        autoScroll: {
                            speed: 0.3
                        }
                    },
                    1201: {
                        perPage: 3,
                        gap: 12,
                    }
                }
            }).mount(window.splide.Extensions)
        })
    }

    const splidesAuto = document.querySelectorAll(".twoSplideAutoW .splide")
    if (splidesAuto) {
        splidesAuto.forEach((splidex, index) => {
            new Splide(splidex, {
                type: "loop",
                drag: "free",
                focus: "center",
                perMove: 1,
                autoWidth: true,
                direction: index == 1 ? "rtl" : "ltr",
                autoScroll: {
                    speed: 0.5
                }
            }).mount(window.splide.Extensions)
        })
    }

    const swiperFracs = document.querySelectorAll(".swiper-frac")
    if (swiperFracs) {
        swiperFracs.forEach(swiperFrac => {
            const fracs = swiperFrac.querySelector(".swiper")
            const pagis = swiperFrac.querySelector(".swiper-pagination")
            const prev = swiperFrac.querySelector(".swiper-prev")
            const next = swiperFrac.querySelector(".swiper-next")
            var swiperFr = new Swiper(fracs, {
                speed: 1200,
                pagination: {
                    el: pagis,
                    type: "fraction"
                },
                navigation: {
                    nextEl: next,
                    prevEl: prev
                }
            })
        })
    }

    const aboutTechThumbEl = document.querySelector(".about-tech__slide-thumb .swiper")
    const aboutTechMainEl = document.querySelector(".about-tech__slide-main .swiper")
    if (aboutTechThumbEl && aboutTechMainEl) {
        var AboutTechThumbs = new Swiper(aboutTechThumbEl, {
            speed: 1200,
            slidesPerView: "auto",
            initialSlide: 0,
            centeredSlides: false,
            loop: false,
            spaceBetween: 0,
            effect: "slide",
            grabCursor: true,
            slideToClickedSlide: true
        })
        var AboutTechMains = new Swiper(aboutTechMainEl, {
            speed: 1200,
            slidesPerView: "auto",
            initialSlide: 0,
            centeredSlides: false,
            loop: false,
            spaceBetween: 0,
            effect: "slide",
            grabCursor: true,
            navigation: {
                prevEl: ".about-tech__right .swiper-prev",
                nextEl: ".about-tech__right .swiper-next"
            },
            thumbs: {
                swiper: AboutTechThumbs
            }
        })
    }

    const aboutBnMain = document.querySelector(".homes-bn__main .swiper")
    const aboutBnThumb = document.querySelector(".homes-bn__thumb .swiper")
    if (aboutBnMain && aboutBnThumb) {
        var AboutTechThumbs = new Swiper(aboutBnThumb, {
            speed: 1200,
            autoplay: {
                delay: 5000,
            },
            slidesPerView: "auto",
            initialSlide: 0,
            centeredSlides: false,
            loop: false,
            spaceBetween: 0,
            effect: "slide",
            grabCursor: true,
            slideToClickedSlide: true,

        })
        var AboutTechMains = new Swiper(aboutBnMain, {
            speed: 1200,
            autoplay: {
                delay: 5000,
            },
            slidesPerView: "auto",
            initialSlide: 0,
            centeredSlides: false,
            loop: false,
            spaceBetween: 0,
            effect: "slide",
            grabCursor: true,
            thumbs: {
                swiper: AboutTechThumbs
            }
        })
    }

    const aboutSwiperEl = document.querySelector(".homes-about__mid .swiper");
    if (aboutSwiperEl && !aboutSwiperEl.classList.contains("is-initialized")) {
        aboutSwiperEl.classList.add("is-initialized");
        const aboutSwiper = new Swiper(aboutSwiperEl, {
            speed: 800,
            effect: "slide",
            fadeEffect: {
                crossFade: true
            },
            allowTouchMove: false
        });

        const rightWrapper = document.querySelector(".homes-about__right .wrapper");
        const items = document.querySelectorAll(".homes-about__item");
        const dots = document.querySelectorAll(".homes-about__dot");
        const path = document.querySelector(".homes-about__left svg path");
        const midEl = document.querySelector(".homes-about__mid");

        if (rightWrapper && items.length && midEl) {

            const updateMaxHeight = () => {
                const midHeight = midEl.clientHeight;
                if (midHeight > 0) {
                    rightWrapper.style.maxHeight = `${midHeight}px`;
                }
            };
            updateMaxHeight();
            window.addEventListener("resize", updateMaxHeight);

            const midImgs = midEl.querySelectorAll("img");
            midImgs.forEach(img => {
                if (img.complete) {
                    updateMaxHeight();
                } else {
                    img.addEventListener("load", updateMaxHeight);
                }
            });

            let pathLength = 0;
            if (path) {
                try {
                    pathLength = path.getTotalLength();
                    path.style.strokeDasharray = pathLength;
                    path.style.strokeDashoffset = pathLength;
                } catch (e) {
                    console.warn("DEBUG [homes-about]: SVG path is hidden or not renderable", e);
                }
            }

            let lastActiveIndex = -1;

            function handleScroll() {
                const scrollTop = rightWrapper.scrollTop;
                const scrollHeight = rightWrapper.scrollHeight;
                const clientHeight = rightWrapper.clientHeight;

                const maxScroll = scrollHeight - clientHeight;
                const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

                if (path && pathLength > 0) {
                    const drawLength = pathLength * scrollProgress;
                    path.style.strokeDashoffset = pathLength - drawLength;
                }

                const containerRect = rightWrapper.getBoundingClientRect();
                let activeIndex = 0;

                items.forEach((item, index) => {
                    const itemRect = item.getBoundingClientRect();
                    const relativeTop = itemRect.top - containerRect.top;

                    if (relativeTop <= clientHeight / 3) {
                        activeIndex = index;
                    }
                });

                if (activeIndex !== lastActiveIndex) {
                    lastActiveIndex = activeIndex;
                    aboutSwiper.slideTo(activeIndex);
                }

                if (dots.length > 0) {
                    dots.forEach((dot, index) => {
                        if (index <= activeIndex) {
                            dot.classList.add("active");
                        } else {
                            dot.classList.remove("active");
                        }
                    });
                }
            }

            rightWrapper.addEventListener("scroll", handleScroll);

            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    dot.style.cursor = "pointer";
                    dot.addEventListener("click", () => {
                        const targetItem = items[index];
                        if (targetItem) {
                            const relativeTop = targetItem.getBoundingClientRect().top - rightWrapper.getBoundingClientRect().top;
                            rightWrapper.scrollTo({
                                top: rightWrapper.scrollTop + relativeTop,
                                behavior: "smooth"
                            });
                        }
                    });
                });
            }

            items.forEach((item, index) => {
                item.style.cursor = "pointer";
                item.addEventListener("click", () => {
                    const relativeTop = item.getBoundingClientRect().top - rightWrapper.getBoundingClientRect().top;
                    rightWrapper.scrollTo({
                        top: rightWrapper.scrollTop + relativeTop,
                        behavior: "smooth"
                    });
                });
            });

            setTimeout(handleScroll, 100);
        }
    }

    const methodSwiperEl = document.querySelector(".homes-method__right .swiper");
    const methodItems = document.querySelectorAll(".homes-method__item");
    if (methodSwiperEl) {
        const methodSwiper = new Swiper(methodSwiperEl, {
            speed: 800,
            slidesPerView: "auto",
            spaceBetween: 0,
            effect: "slide",
            autoplay: {
                delay: 4000,
                disableOnInteraction: true
            },
            on: {

                slideChange: function () {
                    const activeIdx = this.realIndex;
                    methodItems.forEach((item, idx) => {
                        if (idx === activeIdx) {
                            item.classList.add("active");
                        } else {
                            item.classList.remove("active");
                        }
                    });
                }
            }
        });

        if (methodItems.length) {
            methodItems.forEach((item, index) => {
                item.style.cursor = "pointer";
                item.addEventListener("click", () => {
                    methodSwiper.slideTo(index);
                    if (methodSwiper.autoplay) {
                        methodSwiper.autoplay.stop();
                    }
                });
            });
        }
    }
}
