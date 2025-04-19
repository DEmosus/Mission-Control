const axios = require("axios");
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const SPACEX_API_URL = "https://api.spacexdata.com/v5/launches/query";

async function populateLaunches() {
  console.log("Downloading launch data...");
  try {
    const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: { name: 1 },
          },
          {
            path: "payloads",
            select: { customers: 1 },
          },
        ],
      },
    });

    if(response.status !== 200) {
      throw new Error("Launch data download failed");
    }

    const launchDocs = response.data.docs;

    for (const launchDoc of launchDocs) {
      const customers = launchDoc.payloads.flatMap(
        (payload) => payload.customers
      );

      const launch = {
        flightNumber: launchDoc.flight_number,
        mission: launchDoc.name,
        rocket: launchDoc.rocket.name,
        launchDate: new Date(launchDoc.date_local),
        upcoming: launchDoc.upcoming,
        success: launchDoc.success,
        customers: customers,
      };

      console.log(`${launch.flightNumber} ${launch.mission}`);
      await saveLaunch(launch);
    }
  } catch (err) {
    console.error(
      "Failed to load launch data:",
      err.response?.data || err.message
    );
  }
}

async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch data already loaded!");
  } else {
    await populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase
    .findOne()
    .sort("-flightNumber")
    .exec();
  if (!latestLaunch) {
    return 1;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches(skip, limit) {
  return await launchesDatabase
    .find({}, { _id: 0, __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ flightNumber: 1 });
}

async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["NASA"],
    upcoming: true,
    success: true,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    { flightNumber: launchId },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

module.exports = {
  loadLaunchesData,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
};
