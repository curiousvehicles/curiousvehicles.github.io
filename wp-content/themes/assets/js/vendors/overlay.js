// frame element
// const frame = document.querySelector(".frame");

const overlayPath = document.querySelector(".overlay__path");
const paths = {
    step1: {
        unfilled: "M 100 100 V 0 H 100 C 100 40 100 60 100 100 H 100 Z",
        inBetween: {
            curve1: "M 100 100 V 0 H 50 C 30 40 30 60 50 100 H 100 Z",
            curve2: "M 100 100 V 0 H 50 C 60 40 60 60 50 100 H 100 Z",
        },
        filled: "M 100 100 V 0 H 0 C 0 40 0 60 0 100 H 100 Z",
    },
    step2: {
        filled: "M 100 100 V 0 H 0 C 0 40 0 60 0 100 H 100 Z",
        inBetween: {
            curve1: "M 100 100 V 0 H 0 C 0 40 0 60 0 100 H 100 Z",
            curve2: "M 100 100 V 0 H 0 C 0 40 0 60 0 100 H 100 Z",
        },
        unfilled: "M 100 100 V 0 H 0 C 0 40 0 60 0 100 H 100 Z",
    },
};

const landingEl = document.querySelector("body");

// transition trigger button
const switchCtrl = document.querySelectorAll(".hamburger");

// back button
const backCtrl = landingEl.querySelectorAll(".menu-close");
let isAnimating = false;
let page = 1;

// reveals the second content view
const reveal = () => {
    if (isAnimating) return;
    isAnimating = true;
    page = 2;
    gsap
        .timeline({
            onComplete: () => (isAnimating = false),
        })
        .set(overlayPath, {
            attr: {
                d: paths.step1.unfilled
            },
        })
        .to(
            overlayPath, {
                duration: 0.8,
                ease: "power4.in",
                attr: {
                    d: paths.step1.inBetween.curve1
                },
            },
            0
        )
        .to(overlayPath, {
            duration: 0.3,
            ease: "power1",
            attr: {
                d: paths.step1.filled
            },
            onComplete: () => {
                gsap
                    .timeline()
                    .to(".navigation", {
                        opacity: 1,
                        duration: 0,
                    })
                    .to(".menu-close", {
                        opacity: 1,
                        pointerEvents: "all",
                    })
                    .to(".navigation li a .char", {
                        stagger: 0.02,
                        scale: 1,
                        opacity: 1,
                        ease: "power4",
                    });
                switchPages();
            },
        });
};

const modelBody = document.querySelector(".fullScreen");
const switchPages = () => {
    if (page === 2) {
        modelBody.classList.add("active");
    } else {
        modelBody.classList.remove("active");
    }
};
// back to first content view
const unreveal = () => {
    if (isAnimating) return;
    isAnimating = true;
    page = 1;
    gsap
        .timeline({
            onComplete: () => {
                isAnimating = false;
            },
        })
        // now reveal
        .set(overlayPath, {
            attr: {
                d: paths.step1.filled
            },
            duration: 0.1,
        })
        .to(".navigation", {
            opacity: 0,
            duration: 0,
        })
        .to(".menu-close", {
            opacity: 0,
            pointerEvents: "none",
        })
        .to(".navigation li a .char", {
            stagger: 0,
            scale: 1.5,
            opacity: 0,
            duration: 0.1,
            ease: "power4",
        })
        .to(overlayPath, {
            duration: 0.2,
            ease: "sine.in",
            attr: {
                d: paths.step1.inBetween.curve1
            },
        })
        .to(overlayPath, {
            duration: 0.2,
            ease: "power4",
            attr: {
                d: paths.step1.unfilled
            },
            onComplete: () => {
                switchPages();
            },
        });
};

// click on menu button
switchCtrl.forEach((e) => {
    e.addEventListener("click", function() {
        modelBody.classList.add("show");
    });
    e.addEventListener("click", reveal);
});

// click on close menu button
backCtrl.forEach((e) => {
    e.addEventListener("click", unreveal);
    e.addEventListener("click", function() {
        setTimeout(() => {
            modelBody.classList.remove("show");
        }, 1000);
    });
});