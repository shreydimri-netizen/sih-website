const RANGES = {
  temp: { min: 32, max: 36 },
  humidity: { min: 50, max: 60 }
};

function randomInRange(min, max, decimals = 1) {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

function getReadings() {
  return {
    temp: randomInRange(29, 39),
    humidity: randomInRange(42, 68),
    activity: Math.round(randomInRange(10, 90, 0)),
    weight: randomInRange(18, 32)
  };
}

function updateDashboard() {
  const readings = getReadings();

  document.getElementById("tempValue").textContent = readings.temp;
  document.getElementById("humidityValue").textContent = readings.humidity;
  document.getElementById("activityValue").textContent = readings.activity;
  document.getElementById("weightValue").textContent = `${readings.weight} kg`;

  const alerts = [];

  if (readings.temp < RANGES.temp.min || readings.temp > RANGES.temp.max) {
    alerts.push(`Temperature outside healthy range: ${readings.temp}°C`);
  }
  if (readings.humidity < RANGES.humidity.min || readings.humidity > RANGES.humidity.max) {
    alerts.push(`Humidity outside healthy range: ${readings.humidity}%`);
  }
  if (readings.activity < 15) {
    alerts.push(`Low bee activity detected: ${readings.activity} entries/min`);
  }

  renderAlerts(alerts);
  renderStatus(alerts);
}

function renderAlerts(alerts) {
  const list = document.getElementById("alertList");
  list.innerHTML = "";

  if (alerts.length === 0) {
    const li = document.createElement("li");
    li.className = "no-alerts";
    li.textContent = "✓ No alerts — current hive conditions look normal.";
    list.appendChild(li);
    return;
  }

  alerts.forEach(message => {
    const li = document.createElement("li");
    li.className = "warn";
    li.textContent = `⚠ ${message}`;
    list.appendChild(li);
  });
}

function renderStatus(alerts) {
  const banner = document.getElementById("statusBanner");
  const text = document.getElementById("statusText");

  banner.classList.remove("ok", "warn");

  if (alerts.length === 0) {
    banner.classList.add("ok");
    text.textContent = "Hive status: Healthy • All monitored signals are within range";
  } else {
    banner.classList.add("warn");
    text.textContent = `Hive status: Needs attention • ${alerts.length} alert${alerts.length > 1 ? "s" : ""} detected`;
  }
}

const modal = document.getElementById("modal");
const openModal = () => modal.classList.remove("hidden");
const closeModal = () => modal.classList.add("hidden");

document.getElementById("scanBtn").addEventListener("click", openModal);
document.getElementById("verifyBtn").addEventListener("click", openModal);
document.getElementById("demoBtn").addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalDone").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.getElementById("refreshBtn").addEventListener("click", updateDashboard);

document.getElementById("loginBtn").addEventListener("click", () => {
  alert("Demo mode: beekeeper authentication would connect here.");
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

updateDashboard();
