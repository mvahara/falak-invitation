const welcome = document.getElementById("welcome");
const invitation = document.getElementById("invitation");
const openBtn = document.getElementById("openInvite");

const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

// Open the wedding invitation
openBtn.addEventListener("click", async () => {
  welcome.classList.add("hidden");
  invitation.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });

  try {
    await music.play();
    musicLabel.textContent = "Pause Music";
    musicBtn.setAttribute("aria-label", "Pause wedding music");
  } catch (error) {
    musicLabel.textContent = "Play Music";
  }

  setupScratchCard();
});

// Music play / pause
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Pause Music";
      musicBtn.setAttribute("aria-label", "Pause wedding music");
    } catch (error) {
      musicLabel.textContent = "Music unavailable";
      alert("Please add music.mp3 to your website folder.");
    }
  } else {
    music.pause();
    musicLabel.textContent = "Play Music";
    musicBtn.setAttribute("aria-label", "Play wedding music");
  }
});

// Wedding countdown
// Change the time below if your ceremony starts at a specific time.
const weddingDate = new Date(2026, 9, 31, 0, 0, 0);

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  if (difference <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    document.getElementById("countdownMessage").textContent =
      "Today is the special day! ♡";
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");
  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

  document.getElementById("countdownMessage").textContent =
    "Counting down to 31 October 2026";
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Scratch-to-reveal effect
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const scratchWrap = document.getElementById("scratchWrap");
const revealBtn = document.getElementById("revealBtn");

let isScratching = false;
let scratchReady = false;

function setupScratchCard() {
  if (scratchReady) return;
  scratchReady = true;

  const rect = scratchWrap.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.scale(dpr, dpr);

  // Soft blue scratch surface
  const gradient = ctx.createLinearGradient(
    0, 0, rect.width, rect.height
  );

  gradient.addColorStop(0, "#aebfdf");
  gradient.addColorStop(0.5, "#e5ecf8");
  gradient.addColorStop(1, "#aebfdf");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  ctx.fillStyle = "#344f7d";
  ctx.textAlign = "center";
  ctx.font = "25px Georgia";
  ctx.fillText("♡", rect.width / 2, rect.height / 2 - 8);

  ctx.font = "12px Poppins, sans-serif";
  ctx.fillText(
    "SCRATCH HERE TO REVEAL",
    rect.width / 2,
    rect.height / 2 + 22
  );

  ctx.globalCompositeOperation = "destination-out";
}

function scratchAt(event) {
  if (!isScratching) return;

  event.preventDefault();

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();

  checkScratchProgress();
}

canvas.addEventListener("pointerdown", (event) => {
  isScratching = true;
  canvas.setPointerCapture(event.pointerId);
  scratchAt(event);
});

canvas.addEventListener("pointermove", scratchAt);

canvas.addEventListener("pointerup", () => {
  isScratching = false;
});

canvas.addEventListener("pointercancel", () => {
  isScratching = false;
});

function checkScratchProgress() {
  const pixels = ctx.getImageData(
    0, 0, canvas.width, canvas.height
  ).data;

  let transparent = 0;
  let total = 0;

  // Sample pixels for performance on mobile phones
  for (let i = 3; i < pixels.length; i += 4 * 20) {
    total++;
    if (pixels[i] < 50) transparent++;
  }

  if (total > 0 && transparent / total > 0.35) {
    canvas.style.display = "none";
  }
}

revealBtn.addEventListener("click", () => {
  canvas.style.display = "none";
});

// RSVP through WhatsApp
document.getElementById("rsvpForm").addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const guests = document.getElementById("guestCount").value;
    const attendance = document.getElementById("attendance").value;

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    const message =
      "Wedding RSVP - Dr. Falak & Mohammad Sarik\n\n" +
      "Guest name: " + name + "\n" +
      "Number of guests: " + guests + "\n" +
      "Attendance: " + attendance + "\n" +
      "Date: 31 October 2026\n" +
      "Venue: Aanand Hall";

    // Replace with the family's WhatsApp number.
    // Include country code, without + or spaces.
    const familyWhatsAppNumber = "91XXXXXXXXXX";

    if (familyWhatsAppNumber.includes("X")) {
      alert(
        "Please add the family's WhatsApp number in script.js " +
        "before using RSVP."
      );
      return;
    }

    const url =
      "https://wa.me/" + familyWhatsAppNumber +
      "?text=" + encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }
);
