    // Counting animation
    function countUp(element) {
        const target = parseInt(element.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(count);
            }
        }, 16);
    }

    // Start counting when the element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(number => countUp(number));
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('.stats-container'));

    // Loader script
    window.addEventListener('load', function () {
        const loaderWrapper = document.getElementById('loader-wrapper');
        loaderWrapper.style.opacity = '0';
        setTimeout(function () {
            loaderWrapper.style.display = 'none';
        }, 500);
    });




    // Function to animate number counting
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target > 0 ? 1 : 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = start;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, stepTime);
}

// Function to animate circular progress
function animateCircleProgress(circle, percent) {
    const radius = circle.getAttribute('r');
    const circumference = 2 * Math.PI * radius;
    
    // Calculate the dash offset based on percentage
    const offset = circumference - (percent / 100) * circumference;
    
    // Set the dash array and offset
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    // Trigger animation
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize animations when elements are in viewport
function initAnimations() {
    // For skill circles
    const skillCircles = document.querySelectorAll('.skill-circle-progress');
    skillCircles.forEach(circle => {
        if (isInViewport(circle) && !circle.classList.contains('animated')) {
            circle.classList.add('animated');
            const percent = parseInt(circle.getAttribute('data-percent'));
            animateCircleProgress(circle, percent);
            
            // Also animate the percentage number
            const percentNumber = circle.closest('.skill-circle').querySelector('.skill-percent-number');
            animateCounter(percentNumber, percent, 2000);
        }
    });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations on scroll and on page load
    window.addEventListener('scroll', initAnimations);
    setTimeout(initAnimations, 500); // Initial check
});

    
    











// typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    const subtitleElement = document.querySelector('.hero-subtitle');
    const texts = [
        "Full Stack Developer",
        "Entrepreneur",
        "Video Game Developer",
        "AI/ML Enthusiast",
        "SaaS Product Builder"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 30; // Delay between each character when typing
    let deletingDelay = 20; // Delay between each character when deleting
    let newTextDelay = 2000; // Delay before starting to delete text
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            subtitleElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = deletingDelay;
        } else {
            // Typing text
            subtitleElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 30;
        }
        
        // If we've finished typing the current text
        if (!isDeleting && charIndex === currentText.length) {
            // Start deleting after a delay
            isDeleting = true;
            typingDelay = newTextDelay;
        }
        
        // If we've finished deleting the current text
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeEffect, typingDelay);
    }
    
    // Start the typing effect
    typeEffect();
});