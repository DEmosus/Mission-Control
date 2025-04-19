const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", (data) => {
        if (isHabitablePlanet(data) && data["kepler_name"]) {
          savePlanet({ keplerName: data["kepler_name"] });
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async() => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({}, { _id: 0, __v: 0 });
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      { keplerName: planet.keplerName },
      { $set: planet },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error saving planet:", error);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets
};
 