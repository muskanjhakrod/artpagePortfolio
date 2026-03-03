const track = document.getElementById('art-track');
const nextBtn = document.getElementById('next-button');
const prevBtn = document.getElementById('prev-button');
const counter = document.getElementById('current-idx');

let currentIndex = 1;

function updateCounter() {
    counter.innerText = currentIndex.toString().padStart(2, '0');
}

nextBtn.addEventListener('click', () => {
    const cardWidth = document.querySelector('.art-card').offsetWidth + 20;
    track.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    track.style.transform = `translateX(-${cardWidth}px)`;

    track.addEventListener('transitionend', () => {
        track.style.transition = "none";
        track.appendChild(track.firstElementChild);
        track.style.transform = `translateX(0)`;
        currentIndex = currentIndex >= 6 ? 1 : currentIndex + 1;
        updateCounter();
    }, { once: true });
});

prevBtn.addEventListener('click', () => {
    const cardWidth = document.querySelector('.art-card').getBoundingClientRect().width + 20;
    
    track.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    track.style.transform = `translateX(-${cardWidth}px)`;

    track.style.transition = "none";
    track.prepend(track.lastElementChild); // Move last to front instantly
    track.style.transform = `translateX(-${cardWidth}px)`;
    
    setTimeout(() => {
        track.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
        track.style.transform = `translateX(0)`;
        currentIndex = currentIndex <= 1 ? 6 : currentIndex - 1;
        updateCounter();
    }, 10);
});