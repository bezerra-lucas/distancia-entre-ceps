require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const CepCoords = require("coordenadas-do-cep");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Funcionou chupetinha! 👌").end();
});

app.post("/calcular-distancia", async (req, res) => {
  const data = {
    start: req.body.start,
    end: req.body.end,
  };

  try {
    const distance = await CepCoords.getDistEntreCeps(data.start, data.end);
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
