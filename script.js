const envelope = document.getElementById('openInvitation');
const envelopeScreen = document.getElementById('envelopeScreen');
const invitation = document.getElementById('invitation');
const music = document.getElementById('weddingMusic');
const musicToggle = document.getElementById('musicToggle');

envelope.addEventListener('click', async () => {
  envelope.classList.add('opened');
  envelopeScreen.classList.add('is-opening');
  music.play().then(() => {
    musicToggle.innerHTML = '♫ <span>Pause music</span>';
  }).catch(() => {
    musicToggle.innerHTML = '♫ <span>Play music</span>';
  });
  setTimeout(() => invitation.scrollIntoView({behavior:'smooth'}), 450);
});

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.innerHTML = '♫ <span>Pause music</span>';
    } catch (e) {
      musicToggle.innerHTML = '♫ <span>Add MP3 first</span>';
    }
  } else {
    music.pause();
    musicToggle.innerHTML = '♫ <span>Play music</span>';
  }
});

document.getElementById('scratchCard').addEventListener('click', function () {
  this.classList.add('revealed');
});

const eventDate = new Date('2026-10-31T00:00:00+05:30').getTime();
function updateCountdown() {
  const now = Date.now();
  const distance = eventDate - now;
  if (distance <= 0) {
    document.getElementById('days').textContent = '000';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }
  document.getElementById('days').textContent = String(Math.floor(distance / 86400000)).padStart(3, '0');
  document.getElementById('hours').textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
  document.getElementById('seconds').textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);
