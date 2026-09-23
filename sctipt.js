// Healthy ranges for the hive
const RANGES = {
  temp: { min: 32, max: 36 },
  humidity: { min: 50, max: 60 },
};

function randomInRange(min, max, decimals = 1) {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

function getReadings() {
  // Simulated sensor readings (occasionally out of range, to show alerts working)
  return {
    temp: randomInRange(29, 39),
    humidity: randomInRange(42, 68),
    activity: Math.round(randomInRange(10, 90, 0)),
    weight: randomInRange(18, 32),
  };
}

function updateDashboard() {
  const readings = getReadings();

  document.getElementById("tempValue").textContent = readings.temp;
  document.getElementById("humidityValue").textContent = readings.humidity;
  document.getElementById("activityValue").textContent = readings.activity;
  document.getElementById("weightValue").textContent = readings.weight;

  const alerts = [];

  if (readings.temp < RANGES.temp.min || readings.temp > RANGES.temp.max) {
    alerts.push(`Temperature out of range: ${readings.temp}°C`);
  }
  if (readings.humidity < RANGES.humidity.min || readings.humidity > RANGES.humidity.max) {
    alerts.push(`Humidity out of range: ${readings.humidity}%`);
  }
  if (readings.activity < 15) {
    alerts.push(`Low bee activity detected: ${readings.activity} per minute`);
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
    li.textContent = "No alerts — hive conditions look normal.";
    list.appendChild(li);
    return;
  }

  alerts.forEach((message) => {
    const li = document.createElement("li");
    li.className = "warn";
    li.textContent = message;
    list.appendChild(li);
  });
}

function renderStatus(alerts) {
  const banner = document.getElementById("statusBanner");
  const text = document.getElementById("statusText");

  banner.classList.remove("ok", "warn");

  if (alerts.length === 0) {
    banner.classList.add("ok");
    text.textContent = "Hive status: Healthy";
  } else {
    banner.classList.add("warn");
    text.textContent = `Hive status: Needs attention (${alerts.length} alert${alerts.length > 1 ? "s" : ""})`;
  }
}

document.getElementById("refreshBtn").addEventListener("click", updateDashboard);

// Load initial readings on page load
updateDashboard();
