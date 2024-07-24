import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/places.json");

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {
  const placeId = req.body.placeId;

  // res.status(500).json();

  try {
    const fileContent = await fs.readFile("./data/places.json", "utf-8");
    const placesData = JSON.parse(fileContent);

    const place = placesData.find((place) => place.id === placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    let userPlacesFileContent = await fs.readFile(
      "./data/user-places.json",
      "utf-8"
    );

    let userPlacesData;
    try {
      userPlacesData = JSON.parse(userPlacesFileContent);
    } catch (e) {
      userPlacesData = [];
    }

    let updatedUserPlaces = userPlacesData;
    if (!userPlacesData.some((p) => p.id === place.id)) {
      updatedUserPlaces = [...userPlacesData, place];
    }

    await fs.writeFile(
      "./data/user-places.json",
      JSON.stringify(updatedUserPlaces, null, 2)
    );

    res.status(200).json({ userPlaces: updatedUserPlaces });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id;

  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent);

  const placeIndex = userPlacesData.findIndex((place) => place.id === placeId);

  let updatedUserPlaces = userPlacesData;

  if (placeIndex >= 0) {
    updatedUserPlaces.splice(placeIndex, 1);
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
