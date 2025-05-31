const cursor = document.getElementById('custom-cursor');

// Actual mouse position
let mouseX = 0;
let mouseY = 0;

// Cursor's displayed position
let currentX = 0;
let currentY = 0;

// Speed factor (0.1 = slow/smooth, 1 = instant)
const speed = 0.5;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Interpolate position
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  // Apply position
  cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

  requestAnimationFrame(animateCursor);
}

// Start animation loop
animateCursor();
