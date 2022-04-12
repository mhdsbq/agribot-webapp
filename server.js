const express = require("express");
const app = express();

let weatherData = { temperature: [], humidity: [] };

app.use(express.json());

app.get("/weather-history", (req, res) => {
  res.status(200).json(weatherData);
});

app.get("/weather", (req, res) => {
  const latestTemperature =
    weatherData.temperature[weatherData.temperature.length - 1];
  const latestHumidity = weatherData.humidity[weatherData.humidity.length - 1];

  res
    .status(200)
    .json({ temperature: latestTemperature, humidity: latestHumidity });
});

app.post("/weather", (req, res) => {
  if (req.body === null) {
    res.status(400).send("error");
    return;
  }
  console.log(req.body, req.body.humidity);
  temperature = [...weatherData.temperature, req.body.temperature];
  humidity = [...weatherData.humidity, req.body.humidity];
  weatherData = {
    ...weatherData,
    temperature: temperature,
    humidity: humidity,
  };
  res.send("done");
});

app.listen(3000, () => {
  console.log("server active at port 3000");
});
