document.addEventListener("DOMContentLoaded", () => {
    var appSlider = new Swiper(".app-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        slideToClickedSlide: true,
        loopFillGroupWithBlank: false,
        navigation: {
            nextEl: ".app-slider-next",
            prevEl: ".app-slider-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            480: {
                slidesPerView: 1.4,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1.8,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
});