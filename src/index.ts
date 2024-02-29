import express, { Request, Response } from "express";
import axios from "axios";
import * as path from "path";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.post("/weather", async (req: Request, res: Response) => {
  const city: string = req.body.city;
  const apiKey: string | undefined = process.env.API_KEY; // Correct variable name

  try {
    if (!apiKey) {
      throw new Error("API_KEY not provided");
    }
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const weatherData = response.data;
    res.json({
      description: weatherData.weather[0].description,
      temperature: weatherData.main.temp,
      clouds: weatherData.clouds.all,
      city: weatherData.name,
    });
    console.log(weatherData);
  } catch (error) {
    res.status(500).json({ error: `Error fetching weather data for ${city}.` });
  }
});

const port: number = 3033;

const start = (): void => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
