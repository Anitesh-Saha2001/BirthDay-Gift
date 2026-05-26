const targetDate = new Date("2026-05-28T00:00:00+05:30").getTime();
const unlockDate = Date.now() + (2 * 60 * 1000);

const units = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

const message = document.querySelector("#countdown-message");
const secretContent = document.querySelector("#secret-content");
const unlockMessage = document.querySelector("#unlock-message");

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    units.days.textContent = "00";
    units.hours.textContent = "00";
    units.minutes.textContent = "00";
    units.seconds.textContent = "00";
    message.textContent =
      "Happy Birthday, Progya ✨ Let the celebration begin.";
  } else {
    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (distance / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (distance / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
      (distance / 1000) % 60
    );

    units.days.textContent = pad(days);
    units.hours.textContent = pad(hours);
    units.minutes.textContent = pad(minutes);
    units.seconds.textContent = pad(seconds);
  }

  const unlockDistance = unlockDate - now;

  if (unlockDistance <= 0) {
    secretContent.classList.remove("hidden");
    unlockMessage.textContent =
      "✨ The secret surprise is now unlocked ✨";
  } else {
    const h = Math.floor(
      (unlockDistance / (1000 * 60 * 60)) % 24
    );
    const m = Math.floor(
      (unlockDistance / (1000 * 60)) % 60
    );

    unlockMessage.textContent =
      `Secret unlocks in ${pad(h)}h ${pad(m)}m after the countdown ends`;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
const sealBtn =
  document.querySelector("#sealBtn");

const envelope =
  document.querySelector("#envelope");

if (sealBtn && envelope) {

  sealBtn.addEventListener(
    "click",
    () => {

      envelope.classList.toggle(
        "open"
      );

    }
  );

}

const canvas = document.querySelector("#sky");
const context = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: Math.min(70, Math.floor(window.innerWidth / 18)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 3 + 1.5,
    speed: Math.random() * 0.45 + 0.15,
    hue: ["#e94b74", "#f6b84b", "#84c7ad", "#4666b0"][Math.floor(Math.random() * 4)],
  }));
}

function drawHeart(x, y, size, color) {
  context.save();
  context.translate(x, y);
  context.scale(size / 18, size / 18);
  context.beginPath();
  context.moveTo(0, 5);
  context.bezierCurveTo(-14, -5, -9, -18, 0, -10);
  context.bezierCurveTo(9, -18, 14, -5, 0, 5);
  context.fillStyle = color;
  context.globalAlpha = 0.32;
  context.fill();
  context.restore();
}

function animate() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle) => {
    particle.y -= particle.speed;
    particle.x += Math.sin((particle.y + particle.size) * 0.015) * 0.18;
    if (particle.y < -20) {
      particle.y = window.innerHeight + 20;
      particle.x = Math.random() * window.innerWidth;
    }
    drawHeart(particle.x, particle.y, particle.size * 5, particle.hue);
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animate();
