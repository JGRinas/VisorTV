import axios from "axios";

const API_KEY =
  import.meta.env?.VITE_OPENWEATHER_API_KEY ||
  process.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL =
  import.meta.env?.VITE_OPENWEATHER_BASE_URL ||
  process.env.VITE_OPENWEATHER_BASE_URL;

export const fetchWeatherData = async (location: {
  country: string;
  province: string;
}) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: `${location.province},${location.country}`,
        units: "metric",
        appid: API_KEY,
        lang: "es",
      },
    });

    const data = response.data;
    const formattedData = {
      temperature: `${data.main.temp}°C`,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      condition: data.weather[0].description,
      lastUpdated: new Date().toLocaleTimeString(),
      humidity: `${data.main.humidity}%`,
      pressure: `${data.main.pressure} hPa`,
      wind: `${data.wind.speed} km/h`,
      visibility: `${data.visibility / 1000} km`,
    };

    localStorage.setItem("weatherData", JSON.stringify(formattedData));

    return formattedData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("No se pudo obtener la información del clima.");
  }
};
