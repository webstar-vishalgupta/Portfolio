




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
const words = ["Full-Stack Developer", "Web Designer", "Tech Visionary"];
let i = 0, j = 0, currentWord = "", isDeleting = false;

function type() {
  const typedText = document.getElementById("typed-text");
  if (i < words.length) {
    currentWord = words[i];

    if (!isDeleting) {
      typedText.textContent = currentWord.slice(0, j++);
      if (j > currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      typedText.textContent = currentWord.slice(0, j--);
      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? 30 : 50);
  }
}
type();







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
    





    
    // Counting animation for weork exprience
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
                