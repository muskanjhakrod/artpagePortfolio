// Use specific names to avoid naming conflicts
const themeToggleButton = document.getElementById('theme-toggle');
const themeLinkElement = document.getElementById('theme-style');
const themeAnimationsLinkElement = document.getElementById('theme-animations');
const scriptContainerDiv = document.getElementById('script-container');

function applyMode(mode) {
    console.log("Switching to:", mode);
    
    // 1. Update CSS Paths
    themeLinkElement.href = `css/${mode}/${mode}-theme.css`;
    themeAnimationsLinkElement.href = `css/${mode}/${mode}-animations.css`;
    
    // 2. Update Body Class (This fixes the background colors)
    document.body.className = ''; // Reset
    document.body.classList.add(`${mode}-mode`);
    
    // 3. Clear and reload scripts
    scriptContainerDiv.innerHTML = '';
    const scripts = {
        light: ['js/light/light-effects.js', 'js/light/gallery-hover.js'],
        dark: ['js/dark/dark-effects.js', 'js/dark/cursor-sparkle.js', 'js/dark/parallax.js', 'js/dark/gallery-glow.js']
    };

    scripts[mode].forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        scriptContainerDiv.appendChild(script);
    });

    localStorage.setItem('portfolio-theme', mode);
}

// Event Listeners
themeToggleButton.addEventListener('click', () => {
    const nextMode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyMode(nextMode);
});

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('portfolio-theme') || 'light';
    applyMode(saved);
});