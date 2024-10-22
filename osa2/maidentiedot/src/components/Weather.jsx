import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const [lat, lon] = country.capitalInfo.latlng;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [country, apiKey]);

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`Weather icon showing ${weather.weather[0].description}`}
            style={{ width: "100px" }}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default Weather;
