/**const track = document.querySelector('.swiper-wrapper');

const scrollAmount = 1; // Adjust this value to change the auto-scrolling speed
let scrollPosition = 0;

const autoScroll = () => {
    scrollPosition += scrollAmount;
    if (scrollPosition >= track.scrollWidth - track.clientWidth) {
        scrollPosition = 0;
    }
    track.style.transform = `translateX(-${scrollPosition}px)`;
};

// Auto-scroll every 16ms (~60 frames per second)
let autoScrollInterval = setInterval(autoScroll, 16);

const stopAutoScroll = () => clearInterval(autoScrollInterval);

const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollInterval = setInterval(autoScroll, 16);
};

// Scroll based on horizontal mouse wheel direction
const handleScroll = (event) => {
    // Check if the scroll is horizontal by looking at deltaX instead of deltaY
    if (event.deltaX !== 0) {
        const delta = event.deltaX;
        scrollPosition += delta;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        if (scrollPosition >= track.scrollWidth - track.clientWidth) {
            scrollPosition = track.scrollWidth - track.clientWidth;
        }
        track.style.transform = `translateX(-${scrollPosition}px)`;
        stopAutoScroll();
        startAutoScroll();
    }
};

// Add event listener for mouse wheel scrolling
track.addEventListener('wheel', handleScroll);

// Pause auto-scrolling while the mouse is over the carousel
document.querySelector('.app-slider').addEventListener('mouseover', stopAutoScroll);
document.querySelector('.app-slider').addEventListener('mouseout', startAutoScroll);**/














const track = document.querySelector('.swiper-wrapper');

const scrollAmount = 1; // Adjust this value to change the auto-scrolling speed
let scrollPosition = 0;
let isScrolling = false;

const autoScroll = () => {
    if (!isScrolling) {
        scrollPosition += scrollAmount;
        if (scrollPosition >= track.scrollWidth - track.clientWidth) {
            scrollPosition = 0;
        }
        track.style.transform = `translateX(-${scrollPosition}px)`;
    }
};

// Auto-scroll every 16ms (~60 frames per second)
let autoScrollInterval = setInterval(autoScroll, 16);

const stopAutoScroll = () => clearInterval(autoScrollInterval);

const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollInterval = setInterval(autoScroll, 16);
};

// Handle mouse wheel scrolling horizontally
const handleScroll = (event) => {
    // Check if the scroll is horizontal by looking at deltaX instead of deltaY
    if (event.deltaX !== 0) {
        const delta = event.deltaX;
        scrollPosition += delta;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        if (scrollPosition >= track.scrollWidth - track.clientWidth) {
            scrollPosition = track.scrollWidth - track.clientWidth;
        }
        track.style.transform = `translateX(-${scrollPosition}px)`;
        stopAutoScroll();
        startAutoScroll();
    }
};

// Add event listener for mouse wheel scrolling
track.addEventListener('wheel', handleScroll);

// Touch event variables
let startX;
let isTouching = false;

const handleTouchStart = (event) => {
    isTouching = true;
    startX = event.touches[0].clientX;
    stopAutoScroll();
};

const handleTouchMove = (event) => {
    if (!isTouching) return;
    const currentX = event.touches[0].clientX;
    const deltaX = startX - currentX;
    scrollPosition += deltaX;
    if (scrollPosition < 0) {
        scrollPosition = 0;
    }
    if (scrollPosition >= track.scrollWidth - track.clientWidth) {
        scrollPosition = track.scrollWidth - track.clientWidth;
    }
    track.style.transform = `translateX(-${scrollPosition}px)`;
    startX = currentX;
};

const handleTouchEnd = () => {
    isTouching = false;
    startAutoScroll();
};

// Add event listeners for touch events
track.addEventListener('touchstart', handleTouchStart);
track.addEventListener('touchmove', handleTouchMove);
track.addEventListener('touchend', handleTouchEnd);

// Pause auto-scrolling while the mouse is over the carousel
document.querySelector('.app-slider').addEventListener('mouseover', () => {
    isScrolling = true;
    stopAutoScroll();
});

document.querySelector('.app-slider').addEventListener('mouseout', () => {
    isScrolling = false;
    startAutoScroll();
});
