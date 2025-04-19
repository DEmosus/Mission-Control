const http = require("http");

require("dotenv").config();
const app = require("./app");
const { mongoConnect } = require("./utils/mongo");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();
    console.log("Planets data loaded successfully");
  } catch (error) {
    console.error("Error loading planets data:", error);
  }
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
