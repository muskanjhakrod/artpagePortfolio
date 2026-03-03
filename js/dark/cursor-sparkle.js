window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    document.body.appendChild(sparkle);

    const size = Math.random() * 4 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    // Random direction
    const destinationX = (Math.random() - 0.5) * 50;
    const destinationY = (Math.random() - 0.5) * 50;

    sparkle.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${destinationX}px, ${destinationY}px)`, opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).onfinish = () => sparkle.remove();
}