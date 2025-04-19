const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  const data = await response.json();

  return data;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const data = await response.json();

  return data.sort((a, b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const response = await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });

    const data = await response.json();
    return {
      success: response.ok,
      ...data,
    };
  } catch (error) {
    console.error("Error submitting launch:", error);
    return {
      success: false,
      message: "Error submitting launch",
    };
  }
}

// // Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    const response = await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message || "Launch aborted",
    };
  } catch (err) {
    console.error("Abort request failed:", err);
    return {
      success: false,
      message: "Error aborting launch",
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
