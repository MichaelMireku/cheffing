// Navigation functions
function navigateBack() {
  window.history.back();
}

function navigateForward() {
  window.history.forward();
}

function refreshPage() {
  location.reload();
}

function goHome() {
  window.location.href = "index.html";
}

// WMP
const video = document.getElementById('video');
const playPause = document.getElementById('playPause');
const stop = document.getElementById('stop');
const seek = document.getElementById('seek');
const volume = document.getElementById('volume');
const fullscreen = document.getElementById('fullscreen');

// Play / Pause functionality
playPause.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPause.textContent = '⏸';
    } else {
        video.pause();
        playPause.textContent = '▶️';
    }
});

// Stop functionality
stop.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    playPause.textContent = '▶️';
});

// Seek functionality
video.addEventListener('timeupdate', () => {
    seek.value = (video.currentTime / video.duration) * 100;
});

seek.addEventListener('input', () => {
    video.currentTime = (seek.value / 100) * video.duration;
});

// Volume control
volume.addEventListener('input', () => {
    video.volume = volume.value;
});

// Fullscreen functionality
fullscreen.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
});
// Add $IE to wallet (placeholder functionality)
function addToWallet() {
  window.open(
    "https://dexscreener.com/solana/HU9TSBH3HsY1GFAtCNsAX2B5jCvt7D8WFR29ioL54rgn"
  );
}

