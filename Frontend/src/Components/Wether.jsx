import React, { useEffect, useRef, useState } from "react";
import "./Wether.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Wether = () => {
  const inputref = useRef();

  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temp: "",
    location: "",
    icon: clear_icon,
  });

  const [city, setCity] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (!city) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Ahmedabad");
  }, []);

  return (
    <div className="wether">
      <div className="search-bar">
        <input
          ref={inputref}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search"
        />
        <img src={search_icon} alt="search" onClick={() => search(inputref.current.value)} />
      </div>

      <img src={weatherData.icon} alt="weather" className="wether-icon" />
      <p className="temp">{weatherData.temp}°C</p>
      <p className="location">{weatherData.location}</p>

      <div className="wether-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wether;