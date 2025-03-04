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

//Menu bar
function mw() {
  window.location.href = "mw.html";
}

function git() {
  window.open("https://github.com/MichaelMireku/INTERNET-EXPLORER-sol/blob/main/README.md");
}

function game() {
  window.location.href = "Gamepage.html";
}

//Add to raydium
function toRaydium() {
  window.open("https://raydium.io/swap/?inputMint=sol&outputMint=DfYVDWY1ELNpQ4s1CK5d7EJcgCGYw27DgQo2bFzMH6fA");
}

// WMP
const video = document.getElementById("video");
const playPause = document.getElementById("playPause");
const stop = document.getElementById("stop");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");
const fullscreen = document.getElementById("fullscreen");
const trackTitle = document.getElementById("trackTitle");

//autoplay unmutes
window.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
    }
}, { once: true});

// Play / Pause functionality
playPause.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPause.innerHTML = '<img src="assets/pause.png" alt="Pause">';
  } else {
    video.pause();
    playPause.innerHTML = '<img src="assets/play.png" alt="Play">';
  }
});

// Stop functionality
stop.addEventListener("click", () => {
  video.pause();
  video.currentTime = 0;
  playPause.innerHTML = '<img src="assets/play.png" alt="Play">';
});

// Seek bar update
video.addEventListener("timeupdate", () => {
  seek.value = (video.currentTime / video.duration) * 100;
});

seek.addEventListener("input", () => {
  video.currentTime = (seek.value / 100) * video.duration;
});

// Volume control
volume.addEventListener("input", () => {
  video.volume = volume.value;
});

// Fullscreen functionality
fullscreen.addEventListener("click", () => {
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
  window.open("https://dexscreener.com/solana/HU9TSBH3HsY1GFAtCNsAX2B5jCvt7D8WFR29ioL54rgn");
}