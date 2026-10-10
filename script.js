// Countdown uses India Standard Time (UTC+05:30).
const target = new Date("2026-10-31T00:00:00+05:30").getTime();
const pad = value => String(value).padStart(2, "0");
function updateCountdown() {
  let ms = Math.max(0, target - Date.now());
  const days = Math.floor(ms / 86400000); ms %= 86400000;
  const hours = Math.floor(ms / 3600000); ms %= 3600000;
  const minutes = Math.floor(ms / 60000); ms %= 60000;
  const seconds = Math.floor(ms / 1000);
  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
  if (Date.now() >= target) document.querySelector(".count-layout h1").innerHTML = "Today begins<br><em>forever</em>";
}
updateCountdown();
setInterval(updateCountdown, 1000);
const heartButton = document.getElementById("heartButton");
heartButton.addEventListener("click", () => {
  heartButton.classList.add("revealed");
  document.getElementById("heartMessage").classList.add("visible");
  document.querySelector(".heart-hint").textContent = "WITH LOVE";
});
