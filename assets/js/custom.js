document.addEventListener("DOMContentLoaded", () => {
    const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    Splitting();
    gsap.registerPlugin(ScrollTrigger);
    if (!isTouchDevice) {
        ScrollTrigger.normalizeScroll(true);
        var smoother = new ScrollSmoother({
            smooth: 1,
            effects: true,
        });
    }

    setTimeout(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
    }, 100);

    const scrollTween = gsap.to(".bar", {
        yPercent: 400,
        ease: "none",
        paused: true
    });

    function updateScrollBar() {
        scrollTween.progress(scrollY / (document.body.scrollHeight - innerHeight));
    }
    window.addEventListener("resize", updateScrollBar);
    window.addEventListener("scroll", updateScrollBar);
    // 	window.addEventListener("scroll", ScrollTrigger.refresh());
    window.addEventListener("resize", function() {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
    });

    // REMOVE VIDEOS ON MOBILE
    if ($(".barContainer").length && isTouchDevice) {
        $(".barContainer").remove();
    }
    if ($(".approach .bg").length && isTouchDevice) {
        $(".approach .bg video").remove();
        $(".approach .bg").addClass("mob");
    }
    if ($(".banner").length && window.innerWidth <= 767 && isTouchDevice) {
        $(".banner video").remove();
        $(".banner > img").show();
    }
    if ($(".mask video").length && window.innerWidth <= 767 && isTouchDevice) {
        $(".mask video").remove();
        $(".mask img").show();
    }
    if ($(".home-about .video-box.right video").length && isTouchDevice && window.innerWidth <= 1024) {
        $(".home-about .video-box.right video").remove();
        $(".home-about .video-box.right img").show();
    }
    if ($(".playground .card-img video").length && isTouchDevice) {
        $(".playground .card-img video").remove();
        $(".playground .card-img img").show();
    }
    if ($(".cursor").length && isTouchDevice) {
        $(".cursor").remove();
    }
    if (isTouchDevice && window.innerWidth <= 992) {
        $(".playground").addClass("mob");
    }

    const header = document.querySelector(".header");
    let lastScrollTop = 0;
    let direction = "";

    // 	window.addEventListener("scroll", function () {
    // 		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 		if (scrollTop > lastScrollTop) {
    // 			direction = "down";
    // 		} else {
    // 			direction = "up";
    // 		}

    // 		lastScrollTop = scrollTop;
    // 		if (window.innerWidth >= 1199) {
    // 			if (direction === "down") {
    // 				header.classList.remove("show");
    // 			} else {
    // 				if (scrollTop < 50) {
    // 					header.classList.add("show");
    // 					header.classList.remove("bg");
    // 				} else {
    // 					header.classList.add("show");
    // 					header.classList.add("bg");
    // 				}
    // 			}
    // 		} else {
    // 			if (scrollTop < 50) {
    // 				header.classList.remove("bg");
    // 			} else {
    // 				header.classList.add("bg");
    // 			}
    // 		}
    // 	});

    var tl = gsap.timeline();
    if ($(".loader").length) {
        window.addEventListener("load", startAnimation);
        var loader = document.querySelector(".loader");
        var logoWrapper = document.querySelector(".loader .logo-wrapper");
        var logo = document.querySelector(".loader .icon");
        var mask = document.querySelector(".loader .mask");
        var companyName = document.querySelector(".company-name");
        var companyNameText = document.querySelector(".company-name img");

        function startAnimation() {
            gsap.to(logo, {
                duration: 1.5,
                width: "100%",
                onComplete: () => {
                    gsap.to(loader, {
                        className: "loader loaded",
                    });
                    gsap.to(logoWrapper, {
                        opacity: 0,
                        onComplete: () => {
                            tl.to(mask, {
                                duration: 0.3,
                                ease: "none",
                                height: "100%",
                                opacity: 1,
                            });
                            gsap.to(".scroll-info", {
                                duration: 0.3,
                                opacity: 1,
                                onComplete: () => {
                                    tl.to(".scroll-info", {
                                        scrollTrigger: {
                                            trigger: ".banner-space",
                                            start: "top top",
                                            end: "1% top",
                                            scrub: true,
                                        },
                                        opacity: 0,
                                    });
                                },
                            });
                        },
                    });
                },
            });
        }
        gsap.to(mask, {
            scrollTrigger: {
                trigger: ".banner-space",
                scrub: true,
                start: "top top",
                end: "bottom bottom",
                // markers: true,
            },
            duration: 10,
            "--banner-scroll-count": 30,
            "-webkit-mask-position": "70% center",
        });
        gsap.to(loader, {
            scrollTrigger: {
                trigger: ".banner-space",
                scrub: true,
                start: "60% bottom",
                end: "80% bottom",
                // markers: true,
            },
            opacity: 0,
            pointerEvents: "none",
        });
        if (window.innerWidth >= 992) {
            gsap.to(".banner-content .icon", {
                scrollTrigger: {
                    trigger: ".banner-space",
                    scrub: true,
                    start: "60% bottom",
                    end: "80% bottom",
                    // markers: true,
                },
                rotateZ: "0deg",
            });
        }
    }
    if ($(".banner").length && window.innerWidth >= 992) {
        gsap.to(".banner-content .char", {
            scrollTrigger: {
                trigger: ".banner-space",
                scrub: 1,
                start: "70% bottom",
                end: "90% bottom",
                // markers: true,
            },
            stagger: 0.05,
            opacity: 1,
        });
    }

    const clipMask = document.querySelectorAll(".image-reveal .img-box");
    class HoverImgFx5 {
        constructor(el) {
            this.DOM = {
                el: el
            };
            this.DOM.reveal = document.createElement("div");
            this.DOM.reveal.className = "hover-reveal";
            this.DOM.reveal.innerHTML = `<div class="hover-reveal__deco"></div><div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
            this.DOM.el.appendChild(this.DOM.reveal);
            this.DOM.revealInner = this.DOM.reveal.querySelector(".hover-reveal__inner");
            this.DOM.revealInner.style.overflow = "hidden";
            this.DOM.revealDeco = this.DOM.reveal.querySelector(".hover-reveal__deco");
            this.DOM.revealImg = this.DOM.revealInner.querySelector(".hover-reveal__img");
            this.DOM.letters = [...this.DOM.el.querySelectorAll("span")];
            this.initEvents();
        }
        initEvents() {
            tl.to(clipMask, {
                scrollTrigger: {
                    trigger: clipMask,
                    start: "top 80%",
                    ease: "power3.out",
                },
                stagger: 1,
                duration: 0,
                onComplete: () => {
                    this.showImage();
                    const paths1 = document.querySelectorAll(".we-believe .about-img svg path");
                    const weBelieve = document.querySelector(".we-believe");
                    gsap.set(paths1, {
                        drawSVG: "0%"
                    });
                    gsap.to(paths1, {
                        duration: 1,
                        stagger: 0.6,
                        drawSVG: "100%",
                        ease: "Power4.easeOut",
                        scrollTrigger: {
                            trigger: weBelieve,
                            start: "top 40%",
                        },
                    });
                    const paths2 = document.querySelectorAll(".we-believe .img-box-mob svg path");
                    const weBelieve2 = document.querySelector(".we-believe");
                    gsap.set(paths2, {
                        drawSVG: "0%"
                    });
                    gsap.to(paths2, {
                        duration: 1,
                        stagger: 0.6,
                        drawSVG: "100%",
                        ease: "Power4.easeOut",
                        scrollTrigger: {
                            trigger: weBelieve2,
                            start: "top 40%",
                        },
                    });
                },
            });
        }
        showImage() {
            this.tl = new TimelineMax({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = 1;
                        TweenMax.set(this.DOM.el, {
                            zIndex: 2
                        });
                    },
                })
                .set(this.DOM.revealInner, {
                    opacity: 0
                })
                .add("begin")
                .add(
                    new TweenMax(this.DOM.revealDeco, 0.8, {
                        ease: Expo.easeOut,
                        startAt: {
                            opacity: 0,
                            scale: 0,
                            rotation: 35
                        },
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                    }),
                    "begin"
                )
                .add(
                    new TweenMax(this.DOM.revealInner, 0.8, {
                        ease: Expo.easeOut,
                        startAt: {
                            scale: 0,
                            rotation: 35
                        },
                        rotation: 0,
                        scale: 1,
                        opacity: 1,
                    }),
                    "begin+=0.15"
                )
                .add(
                    new TweenMax(this.DOM.revealImg, 0.8, {
                        ease: Expo.easeOut,
                        startAt: {
                            rotation: -35,
                            scale: 2
                        },
                        rotation: 0,
                        scale: 1,
                    }),
                    "begin+=0.15"
                );
        }
    }

    [...document.querySelectorAll('[data-fx="5"]')].forEach((link) => new HoverImgFx5(link));

    var hoverReveal = document.querySelectorAll(".hover-reveal__img");
    hoverReveal.forEach((e) => {
        gsap.set(e, {
            backgroundPosition: "50% 50%"
        });
        gsap.to(e, {
            scrollTrigger: {
                trigger: e,
                scrub: 1,
                start: "top bottom",
                end: "bottom top",
            },
            stagger: 0.01,
            backgroundPosition: "50% 20%",
        });
    });

    if ($(".we-believe").length) {
        if (window.innerWidth >= 992) {
            gsap.to(".banner", {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: true,
                    start: "top bottom",
                    end: "top top",
                    // markers: true,
                },
                ease: "none",
                y: "-100vh",
                ease: "none",
            });
        } else {
            gsap.to(".banner", {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: true,
                    start: "top bottom",
                    end: "top top",
                    // markers: true,
                },
                zIndex: -1,
                opacity: 0,
                pointerEvents: "none",
                ease: "none",
            });
        }
        gsap.to(".home-about-animation-container .homeHero__background[data-bg='4']", {
            scrollTrigger: {
                trigger: ".about-space",
                scrub: true,
                start: "top 80%",
                end: "top top",
                // markers: true,
            },
            ease: "none",
            opacity: 0.8,
        });
        var homeHero = document.querySelectorAll(".homeHero__background");
        homeHero.forEach((homeHero, i) => {
            gsap.to(homeHero, {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: true,
                    start: "top top",
                    end: "bottom bottom",
                    // markers: true,
                },
                ease: "none",
                scale: 5 + i,
            });
        });
        if (window.innerHeight >= 992) {
            gsap.to(".we-believe .about-img.left", {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: 1,
                    start: "top top",
                    end: "bottom top",
                    // markers: true,
                },
                y: "-100",
            });
            gsap.to(".we-believe .about-img.right", {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: 1,
                    start: "top top",
                    end: "bottom top",
                    // markers: true,
                },
                y: "-150",
            });
            gsap.to(".we-believe .about-img.center", {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: 1,
                    start: "top top",
                    end: "bottom top",
                    // markers: true,
                },
                y: "-150",
            });
        }

        if (window.innerWidth >= 992) {
            gsap.to(".home-about", {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: true,
                    start: "bottom +=110%",
                    end: "bottom top",
                    // markers: true,
                },
                y: "-120vh",
            });
        }

        if (window.innerWidth >= 992) {
            gsap.to(".home-about .absolute-para", {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: 1,
                    start: "top top",
                    end: "bottom bottom",
                    // markers: true,
                },
                opacity: 1,
            });
            gsap.to(".home-about .video-box.right", {
                scrollTrigger: {
                    trigger: ".about-space",
                    scrub: 1,
                    start: "top top",
                    end: "bottom top",
                    // markers: true,
                },
                marginTop: -100,
                height: "50vh",
            });
        }
    }

    var groupSlider = new Swiper(".group-slider", {
        slidesPerView: 1.8,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        loopFillGroupWithBlank: false,
        // freeMode: true,
        pagination: {
            el: ".group-slider-swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
            1500: {
                slidesPerView: 1.8,
                spaceBetween: 40,
            },
        },
    });

    // OUR GROUP JS START
    if ($(".card-item").length && window.innerWidth >= 992) {
        const cardItem = document.querySelectorAll(".card-wrapper .card-item");
        const viewportWidth = window.innerWidth;
        const centerPoint = viewportWidth / 2 - (window.innerWidth >= 992 ? 80 : 50);
        const cardWidth = cardItem[0].offsetWidth;
        const xPosition = centerPoint + cardWidth / 2;
        const cardSpaceWrapper = document.querySelector(".card-space-wrapper");
        for (let i = 0; i < cardItem.length + 2; i++) {
            const spacingDiv = document.createElement("div");
            spacingDiv.classList.add("card-space");
            cardSpaceWrapper.appendChild(spacingDiv);
        }

        cardItem.forEach((a, i) => {
            var leftValue =
                i % 2 === 0 ?
                (window.innerWidth >= 992 ? 20 : 10) * i + xPosition :
                (window.innerWidth >= 992 ? -20 : -10) * i + xPosition;
            a.style.top =
                50 +
                (i + (window.innerWidth >= 2160 ? 2 : window.innerWidth >= 1100 ? 1 : 3)) *
                (window.innerWidth >= 2160 ? 50 : window.innerWidth >= 1500 ? 35 : 25) +
                "px";
            tl.set(a, {
                x: -50 + leftValue
            });
        });

        tl.to(".content-wrapper", {
            ease: "none",
            scrollTrigger: {
                trigger: ".content-wrapper",
                start: "top top",
                end: "+=300%",
                pin: true,
                pinSpacing: true,
                scrub: true,
                // markers: true,
            },
        });
        tl.to(".card-wrapper", {
            ease: "none",
            scrollTrigger: {
                trigger: ".card-wrapper",
                start: "top top",
                end: "+=500%",
                pin: true,
                pinSpacing: true,
                scrub: true,
                // markers: true,
            },
        });
        tl.to(".playground .icon", {
            scrollTrigger: {
                trigger: ".playground",
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1,
            },
            ease: "none",
            rotateZ: "-760deg",
        });
        if (isTouchDevice) {
            $(".playground .icon").remove();
        }

        var cardSpace = document.querySelectorAll(".card-space");
        tl.to(cardItem[0], {
            scrollTrigger: {
                trigger: cardSpace[1],
                start: "top bottom",
                end: "center center",
                scrub: true,
                // markers: true,
            },
            marginTop: 0,
        });

        tl.to(cardItem[1], {
            scrollTrigger: {
                trigger: cardSpace[1],
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
                // markers: true,
            },
            y: 0,
        });

        tl.to(cardItem[2], {
            scrollTrigger: {
                trigger: cardSpace[2],
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
                // markers: true,
            },
            y: 0,
        });

        tl.to(cardItem[3], {
            scrollTrigger: {
                trigger: cardSpace[3],
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
                // markers: true,
            },
            y: 0,
            onComplete: () => {
                cardItem.forEach((card, index) => {
                    tl.to(card, {
                        scrollTrigger: {
                            trigger: cardSpace[4],
                            start: "top bottom",
                            end: "bottom bottom",
                            scrub: true,
                            // markers: true,
                        },
                        top: (window.innerHeight - card.offsetHeight) / 2,
                        x: 25 + index * 1.04 * cardItem[0].offsetWidth,
                    });
                });
            },
        });

        var cardsLength = cardItem.length;
        var cardsSpace = cardsLength * (window.innerWidth <= 2160 ? 30 : 60);
        var cardsWidth = cardItem[0].offsetWidth * cardsLength + cardsSpace;
        var totalCardWidth = cardsWidth - window.innerWidth;

        tl.to(".card-wrapper", {
            scrollTrigger: {
                trigger: cardSpace[5],
                start: "top 90%",
                end: "top top",
                scrub: true,
                // markers: true,
            },
            x: -totalCardWidth,
        });
    }

    var cardSlider = new Swiper(".card-slider", {
        slidesPerView: 2.5,
        spaceBetween: 40,
        draggable: false,
        allowTouchMove: true,
        loopFillGroupWithBlank: false,
        speed: 1000,
        grabCursor: false,
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 5,
            },
            480: {
                slidesPerView: 1.8,
                spaceBetween: 5,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
            640: {
                slidesPerView: 2.2,
                spaceBetween: 5,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 5,
            },
            992: {
                slidesPerView: 3.4,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 5,
            },
        },
    });
    var spotlight1 = new Swiper(".spotlight1", {
        slidesPerView: 3,
        spaceBetween: 40,
        loop: true,
        draggable: false,
        allowTouchMove: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 16000,
        loopFillGroupWithBlank: false,
        grabCursor: false,
        centeredSlides: true,
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 20,
                autoplay: false,
                speed: 500,
            },
            640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            1100: {
                slidesPerView: 2,
                spaceBetween: 40,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                speed: 16000,
            },
            1500: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
    if ($(".we-believe .about-img .ico-box").length) {
        tl.fromTo(
            ".we-believe .about-img .ico-box svg", {
                drawSVG: "100%"
            }, {
                duration: 0.5,
                drawSVG: "50% 50%",
                stagger: 0.1
            }
        );
    }

    // FADE IN LEFT
    if ($(".fade-in-left").length) {
        const fadeInLeft = document.querySelectorAll(".fade-in-left");
        fadeInLeft.forEach((item) => {
            tl.to(item, {
                scrollTrigger: {
                    trigger: item,
                    scrub: 1,
                    start: "top bottom",
                    end: "top 50%",
                },
                x: 0,
                opacity: 1,
            });
        });
    }
    // FADE IN RIGHT
    if ($(".fade-in-right").length) {
        const fadeInRight = document.querySelectorAll(".fade-in-right");
        fadeInRight.forEach((item) => {
            tl.to(item, {
                scrollTrigger: {
                    trigger: item,
                    scrub: 1,
                    start: "top bottom",
                    end: "top 50%",
                    // markers: true,
                },
                x: 0,
                opacity: 1,
            });
        });
    }

    if ($(".home-cta .join-the-ev").length) {
        gsap.to(".home-cta .join-the-ev", {
            scrollTrigger: {
                trigger: ".home-cta .join-the-ev",
                scrub: true,
                start: "top bottom",
                end: "top center",
                // markers: true,
            },
            borderRadius: 0,
            width: "100%",
        });
    }
    if ($(".home-cta .join-the-ev .info .section-title .title").length && window.innerWidth >= 992) {
        gsap.to(".home-cta .join-the-ev .info .section-title .title", {
            scrollTrigger: {
                trigger: ".home-cta .join-the-ev",
                scrub: true,
                start: "top 80%",
                end: "top 60%",
                // markers: true,
            },
            height: "auto",
        });
    }
    if ($(".home-cta .join-the-ev .info .section-title p").length && window.innerWidth >= 992) {
        gsap.to(".home-cta .join-the-ev .info .section-title p", {
            scrollTrigger: {
                trigger: ".home-cta .join-the-ev",
                scrub: true,
                start: "top 70%",
                end: "top 50%",
                // markers: true,
            },
            height: "auto",
        });
    }
    if ($(".home-cta .join-the-ev .info .button").length) {
        gsap.to(".home-cta .join-the-ev .info .button", {
            scrollTrigger: {
                trigger: ".home-cta .join-the-ev",
                scrub: true,
                start: "top 60%",
                end: "top 50%",
                // markers: true,
            },
            clipPath: "inset(0% 0% 0% 0%)",
        });
    }
    if ($(".corporate-video .video-box").length) {
        gsap.to(".corporate-video .video-box", {
            scrollTrigger: {
                trigger: ".corporate-video .video-box",
                scrub: true,
                start: "top bottom",
                end: "top center",
                // markers: true,
            },
            scale: 1,
        });

        var player;
        var videoContainer = document.getElementById("corporate-video");

        function initPlayer() {
            player = new Vimeo.Player("corporate-video", {
                id: 855971606,
                loop: false,
                controls: false,
                title: false,
                byline: false,
                portrait: false,
            });

            if (isTouchDevice) {
                videoContainer.addEventListener("click", function() {
                    player.getPaused().then(function(paused) {
                        if (paused) {
                            player.play().catch(function(error) {
                                console.error("Failed to play video:", error);
                            });
                        } else {
                            player.pause().catch(function(error) {
                                console.error("Failed to pause video:", error);
                            });
                        }
                    });
                });
            } else {
                videoContainer.addEventListener("mouseenter", function() {
                    player.play().catch(function(error) {
                        console.error("Failed to play video:", error);
                    });
                });
                videoContainer.addEventListener("mouseleave", function() {
                    player.pause().catch(function(error) {
                        console.error("Failed to pause video:", error);
                    });
                });
            }
        }

        if (videoContainer) {
            initPlayer();
        } else {
            console.error("Video container element not found.");
        }
    }

    // PLAY VIDEO ON HOVER
    const videoContainers = document.querySelectorAll(".hover-video");
    videoContainers.forEach((container) => {
        const video = container.querySelector("video");
        container.addEventListener("mouseenter", function() {
            video.play();
        });
        container.addEventListener("mouseleave", function() {
            video.pause();
        });
    });

    let mobileBioBtn = document.querySelectorAll(".management .info .button");
    mobileBioBtn.forEach((item) => {
        item.addEventListener('click', function() {
            let managementDiv = item.closest('.info');
            let mobileBioDiv = managementDiv.querySelector('.mobile-bio');
            let buttonSpan = item.querySelector('span');
            if (mobileBioDiv.classList.contains('fold')) {
                mobileBioDiv.classList.remove('fold');
                mobileBioDiv.style.maxHeight = mobileBioDiv.scrollHeight + "px";
                buttonSpan.textContent = 'Read Less';
            } else {
                mobileBioDiv.classList.add('fold');
                mobileBioDiv.style.maxHeight = "60px";
                buttonSpan.textContent = 'Read More';
            }
        })
    });


    $("#spanYear").html(new Date().getFullYear());
});