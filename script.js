




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






// -------------Bottom nav Bar -----------------------
const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === current) {
          item.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink);

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        document.getElementById(item.dataset.target).scrollIntoView({ behavior: 'smooth' });
      });
    });





// About me tabs Paragraphs
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // remove active classes
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
    
        // add active to current tab
        tab.classList.add('active');
        const panelId = tab.getAttribute('data-tab');
        document.getElementById(panelId).classList.add('active');
      });
    });
    
