async function loadAttendance() {
  const res = await fetch("http://localhost:3000/attendance");
  const data = await res.json();

  const container = document.getElementById("attendanceData");
  container.innerHTML = "";

  const grouped = {};

  data.forEach(item => {
    if (!grouped[item.week]) grouped[item.week] = [];
    grouped[item.week].push(item);
  });

  Object.keys(grouped).forEach(week => {

    const weekDiv = document.createElement("div");
    weekDiv.className = "week-box";

    weekDiv.innerHTML += `
      <div class="week-title">📅 Week ${week}</div>
    `;

    let totalDays = grouped[week].length;
    let payment = totalDays * 500; // ₹500 per day example

    grouped[week].forEach(item => {

      const mapLink = `https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`;

      weekDiv.innerHTML += `
        <div class="card">
          <div>
            <b>${item.driver}</b><br>
            ${item.date} (${item.day})<br>
            ⏰ ${item.time}<br>
            📍 ${item.location.locationName}
          </div>
          <div>
            <a href="${mapLink}" target="_blank" class="map-btn">View Map</a>
          </div>
        </div>
      `;
    });

    weekDiv.innerHTML += `
      <div class="summary">
        Total Days: ${totalDays} | Weekly Payment: ₹${payment}
      </div>
      <button class="delete-btn" onclick="deleteWeek(${week})">
        Delete Week ${week}
      </button>
    `;

    container.appendChild(weekDiv);
  });
}

async function deleteWeek(week) {
  await fetch(`http://localhost:3000/delete-week/${week}`, {
    method: "DELETE"
  });
  loadAttendance();
}
