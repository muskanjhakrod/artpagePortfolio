const canvas = document.getElementById('leaf-canvas');
const ctx = canvas.getContext('2d');

// 1. Background: Large, drifting leaves
const bgLeafTypes = ['🍁', '🍂'];
// 2. Mouse: Small, sparkling/fresh leaves
const sparkLeafTypes = ['🍃', '🌿', '✨'];

let leaves = [];
let mouse = { x: -100, y: -100 };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Sparkle Trigger: Creates small glowing leaves near cursor
    if (Math.random() > 0.6) {
        const type = sparkLeafTypes[Math.floor(Math.random() * sparkLeafTypes.length)];
        leaves.push(new Leaf(mouse.x, mouse.y, true, type));
    }
});

class Leaf {
    constructor(x, y, isSparkle = false, type) {
        this.isSparkle = isSparkle;
        this.type = type;
        this.x = x || Math.random() * canvas.width;
        this.y = y || (isSparkle ? y : Math.random() * -canvas.height);
        
        // Background leaves are bigger; Sparkles are tiny
        this.size = isSparkle ? Math.random() * 8 + 7 : Math.random() * 30 + 15;
        
        // Sparkles move slightly upwards/outwards initially (like a burst)
        this.speedY = isSparkle ? Math.random() * 6 + 5 : Math.random() * 4 +2;
        this.speedX = isSparkle ? Math.random() * 5 + 1 : Math.random() * 0.5 - 0.25;
        
        this.angle = Math.random() * 360;
        this.spin = isSparkle ? Math.random() * 5 - 2.5 : Math.random() * 1 - 0.5;
        this.opacity = isSparkle ? 1 : 0.2; // Background is very faint/soft
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 100) * 0.5;
        this.angle += this.spin;

        if (this.isSparkle) {
            this.opacity -= 0.005; // Sparkles fade fast
            this.size *= 0.98;     // Sparkles shrink as they fade
        }

        if (!this.isSparkle && this.y > canvas.height) {
            this.y = -30;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Add "Sparkle" glow effect for mouse leaves
        if (this.isSparkle) {
            ctx.shadowColor = "white";
            ctx.shadowBlur = 10;
        }

        ctx.font = `${this.size}px serif`;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillText(this.type, 0, 0);
        ctx.restore();
    }
}

function init() {
    for (let i = 0; i < 25; i++) {
        const type = bgLeafTypes[i % bgLeafTypes.length];
        leaves.push(new Leaf(null, null, false, type));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    leaves = leaves.filter(l => l.opacity > 0);
    leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
    });
    requestAnimationFrame(animate);
}

// Add this or update your existing resize listener
function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // If you have a background leaf initialization, restart it here
    if (typeof init === "function") {
        init(); 
    }
}

window.addEventListener('resize', handleResize);

init();
animate();