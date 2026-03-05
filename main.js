// Nav Scroll Effect
const nav = document.querySelector(".navigation-wrap");
const navBarLinks = document.querySelectorAll('.nav-link');
const navCollapse = document.querySelector('.navbar-collapse.collapse');
const togglerBtn = document.querySelector('.navbar-toggler');

// Add smooth background transition on scroll
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 50) {
        nav.classList.add("scroll-on");
    } else {
        // Prevent removing background if mobile menu is open
        if (!navCollapse.classList.contains('show')) {
            nav.classList.remove("scroll-on");
        }
    }
});

// Fix Mobile Menu Background
togglerBtn.addEventListener('click', () => {
    if (document.documentElement.scrollTop <= 50) {
        nav.classList.toggle('scroll-on');
    }
});

// Close Mobile Menu on Link Click
navBarLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if(navCollapse.classList.contains("show")){
            navCollapse.classList.remove("show");
        }
        if (document.documentElement.scrollTop <= 50) {
            nav.classList.remove("scroll-on");
        }
    });
});

// Animated Counter with Intersection Observer (Performance Optimized)
const counters = [
    { id: "count1", end: 150, duration: 2000 },
    { id: "count2", end: 45, duration: 2000 },
    { id: "count3", end: 2500, duration: 2000 },
    { id: "count4", end: 20, duration: 2000 }
];

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counterItem => {
                animateCounter(counterItem.id, 0, counterItem.end, counterItem.duration);
            });
            observer.disconnect(); // Only run once
        }
    });
}, { threshold: 0.5 });

const counterSection = document.getElementById('counter');
if(counterSection) {
    observer.observe(counterSection);
}

function animateCounter(id, start, end, duration) {
    let obj = document.getElementById(id);
    let current = start;
    let range = end - start;
    
    // Calculate step time to ensure smooth animation over the duration
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = stepTime === 0 ? 1 : stepTime; 

    // Adjust step increment for large numbers
    let increment = end > 1000 ? Math.ceil(range / (duration / 10)) : 1;

    let timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        obj.textContent = current;
    }, stepTime);
}