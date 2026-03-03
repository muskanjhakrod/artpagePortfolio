const canvas = document.getElementById('leaf-canvas');
const ctx = canvas.getContext('2d');

// CRITICAL: Ensure canvas fills the whole screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let stars = [];

class Star {
    constructor() {
        this.reset();
    }

    reset() {
    this.x = Math.random() * canvas.width;
    // Start them randomly across the WHOLE height of the screen
    this.y = Math.random() * canvas.height; 
    this.size = Math.random() * 2;
    this.speedY = Math.random() * 0.2 + 0.05;
    this.opacity = Math.random();
    this.fadeSpeed = Math.random() * 0.01 + 0.005;
}

update() {
    this.y -= this.speedY; 
    
    // If a star goes off the top, bring it back to the bottom of the VIEWPORT
    if (this.y < 0) {
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
    }
}

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.opacity)})`;
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) stars.push(new Star());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // This must match your CSS .active
        }
    });
}, { threshold: 0.2 }); // 20% visibility trigger

observer.observe(document.querySelector('#about'));

initStars();
animate();