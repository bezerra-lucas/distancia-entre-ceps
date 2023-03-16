require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const axios = require("axios");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

app.use(express.json());
app.use(cors());

async function calculateDistance(address1, address2) {
  try {
    const response = await client.distancematrix({
      params: {
        origins: [address1],
        destinations: [address2],
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000, // milliseconds
      axiosInstance: axios,
    });

    const distance = response.data.rows[0].elements[0].distance.value;
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
