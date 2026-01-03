let current = 0;
const total = 5; // s0 to s5
const music = document.getElementById("bgMusic");
const emojis = ["💖","🕊️","🎈","✨","🧿","🌸","🌻"];
let emojiInterval = null;
let musicStarted = false; 

window.onload = function() {
    startEmojis();
};

function show(n) {
  const activeScreen = document.querySelector(".screen.active");
  if(activeScreen) {
      activeScreen.classList.remove("active");
  }
  
  const nextScreen = document.getElementById("s" + n);
  if(nextScreen) {
      nextScreen.classList.add("active");
      
      const nav = document.querySelector('.nav');
      // Hide global nav on all screens (s0-s5) as we use custom buttons everywhere
      if (n <= 5) {
          nav.style.display = 'none'; 
      } else {
          nav.style.display = 'flex'; 
      }
  }
  current = n;
}

function startExperience() {
  const btn = document.getElementById("startBtn");

  if (!musicStarted) {
      music.play().then(() => {
          musicStarted = true;
          btn.innerText = "Tap to Enter ✨";
      }).catch(e => {
          console.log("Audio failed", e);
          musicStarted = true;
          btn.innerText = "Tap to Enter ✨";
      });
  } else {
      show(1);
  }
}

function next() {
  if (current < total) show(current + 1);
}

function prev() {
  if (current > 0) show(current - 1);
}

// Background gentle floating
function startEmojis() {
  if (emojiInterval) return;

  emojiInterval = setInterval(() => {
    const e = document.createElement("div");
    e.className = "emoji";
    e.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    e.style.left = Math.random() * 100 + "vw";
    e.style.animationDuration = (4 + Math.random() * 3) + "s";
    document.getElementById("emoji-layer").appendChild(e);
    setTimeout(() => e.remove(), 7000);
  }, 600);
}

// FINAL CELEBRATION: Huge burst of emojis
function celebrate() {
    alert("Make a wish in your heart... ✨");
    
    // Spawn 100 emojis quickly
    for(let i=0; i<100; i++) {
        setTimeout(() => {
            const e = document.createElement("div");
            e.className = "emoji";
            e.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            e.style.left = Math.random() * 100 + "vw";
            // Make them faster for effect
            e.style.animationDuration = (2 + Math.random() * 2) + "s"; 
            document.getElementById("emoji-layer").appendChild(e);
            setTimeout(() => e.remove(), 4000);
        }, i * 50); // Staggered release
    }
}