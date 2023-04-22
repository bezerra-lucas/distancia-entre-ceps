require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const axios = require("axios");
const querystring = require("querystring");

app.use(express.json());
app.use(cors());

async function calculateDistance(address1, address2) {
  try {
    const params = querystring.stringify({
      origins: address1,
      destinations: address2,
      travelMode: "driving",
      key: process.env.BING_MAPS_API_KEY,
    });

    const response = await axios.get(
      `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?${params}`
    );

    const distance =
      response.data.resourceSets[0].resources[0].results[0].travelDistance;
    return distance;
  } catch (error) {
    console.log(error);
    return null;
  }
}

app.get("/", (req, res) => {
  res.status(200).send("Funcionou chupetinha! 👌").end();
});

app.post("/calcular-distancia", async (req, res) => {
  const data = {
    start: req.body.start,
    end: req.body.end,
  };

  try {
    const distance = await calculateDistance(data.start, data.end);
    res.status(200).json({
      distance,
    });
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Servidor iniciado");
  console.log("Porta: " + PORT);
});
