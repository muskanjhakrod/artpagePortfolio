window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset; // Total pixels scrolled from top
    
    // Select the background canvas
    const starCanvas = document.getElementById('leaf-canvas');
    
    // Move the stars at 20% of the scroll speed to create depth
    // Using translateY ensures it moves vertically as you scroll down
    if (starCanvas) {
        starCanvas.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Optional: Move the 'Sky Swirl' even slower (10%) for a 3-layer effect
    const swirl = document.querySelector('.sky-swirl');
    if (swirl) {
        swirl.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});