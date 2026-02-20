const API = "https://pep-project-s21e.onrender.com";


async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    if (data.role === "driver") {
      window.location = "driver.html";
    } else {
      window.location = "owner.html";
    }
  } else {
    alert("Invalid Login");
  }
}

function markAttendance() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    await fetch("/mark-attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        driver: "driver1",
        latitude,
        longitude,
        locationName: "Current Location"
      })
    });

    alert("Attendance Marked");
  });
}
