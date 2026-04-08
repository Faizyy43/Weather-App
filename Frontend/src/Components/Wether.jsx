import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

// 🎥 LOTTIE
import Lottie from "lottie-react";
import sunnyAnim from "../assets/lottie/sunny.json";
import rainAnim from "../assets/lottie/rain.json";
import cloudAnim from "../assets/lottie/cloud.json";

const Wether = () => {
  const inputref = useRef();

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [dark, setDark] = useState(true);

  // 🌍 AUTO LOCATION
  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      searchByCoords(latitude, longitude);
    });
  };

  const search = async (city) => {
    if (!city) return;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`,
    );
    const data = await res.json();

    updateWeather(data);
    fetchForecast(data.coord.lat, data.coord.lon);
  };

  const searchByCoords = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`,
    );
    const data = await res.json();

    updateWeather(data);
    fetchForecast(lat, lon);
  };

  const updateWeather = (data) => {
    setWeatherData({
      temp: Math.floor(data.main.temp),
      location: data.name,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
    });
  };

  const fetchForecast = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`,
    );
    const data = await res.json();

    const daily = data.list.filter((_, i) => i % 8 === 0);
    setForecast(daily.slice(0, 5));
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

  // 🎥 ANIMATION
  const getAnimation = () => {
    switch (weatherData?.condition) {
      case "Rain":
        return rainAnim;
      case "Clouds":
        return cloudAnim;
      case "Clear":
        return sunnyAnim;
      default:
        return sunnyAnim;
    }
  };

  // 🌿 NATURE BACKGROUND
  const getBg = () => {
    if (!weatherData) return "from-slate-900 to-black";

    switch (weatherData.condition) {
      case "Rain":
        return "from-gray-900 via-slate-800 to-black";
      case "Clear":
        return "from-sky-400 via-blue-500 to-indigo-600";
      case "Clouds":
        return "from-slate-500 via-slate-700 to-slate-900";
      default:
        return "from-slate-900 to-black";
    }
  };

  // 🧠 AI
  const getSuggestion = () => {
    if (!weatherData) return "";

    if (weatherData.temp > 35) return "🔥 Stay hydrated!";
    if (weatherData.condition === "Rain") return "🌧️ Carry umbrella!";
    if (weatherData.temp < 15) return "🧥 Wear warm clothes!";
    return "🌤️ Perfect weather!";
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 transition-all duration-500
      bg-gradient-to-br ${dark ? getBg() : "from-blue-100 to-blue-300"}`}
    >
      {/* 🌙 TOGGLE */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-5 right-5 text-xs bg-white/20 px-4 py-2 rounded-full backdrop-blur-md"
      >
        {dark ? "Light" : "Dark"}
      </button>

      {/* 📱 CARD */}
      <div
        className="w-full max-w-sm
        bg-white/[0.08] backdrop-blur-2xl
        border border-white/10
        rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        p-6 text-white transition-all duration-500"
      >
        {/* SEARCH */}
        <div className="flex gap-2 mb-6">
          <input
            ref={inputref}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="flex-1 px-4 py-2 rounded-full text-black outline-none"
          />
          <img
            src={search_icon}
            onClick={() => search(inputref.current.value)}
            className="w-10 p-2 bg-white rounded-full cursor-pointer hover:scale-110 transition"
          />
        </div>

        {/* MAIN */}
        {weatherData && (
          <>
            <Lottie animationData={getAnimation()} className="w-28 mx-auto" />

            <h1 className="text-5xl text-center font-semibold">
              {weatherData.temp}°C
            </h1>

            <p className="text-center text-slate-300 mt-1">
              {weatherData.location}
            </p>

            {/* DATA */}
            <div className="flex justify-between mt-6 text-sm">
              <div className="flex items-center gap-2">
                <img src={humidity_icon} className="w-5" />
                {weatherData.humidity}%
              </div>
              <div className="flex items-center gap-2">
                <img src={wind_icon} className="w-5" />
                {weatherData.windSpeed} km/h
              </div>
            </div>

            {/* AI */}
            <p className="text-center text-xs mt-4 text-cyan-300">
              {getSuggestion()}
            </p>
          </>
        )}

        {/* FORECAST */}
        <div className="flex gap-3 mt-6 overflow-x-auto no-scrollbar">
          {forecast.map((day, i) => (
            <div
              key={i}
              className="min-w-[75px] bg-white/10 p-3 rounded-xl text-center"
            >
              <p className="text-xs">
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <p className="text-lg">{Math.floor(day.main.temp)}°</p>
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL FIX */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { scrollbar-width: none; }
        `}
      </style>
    </div>
  );
};

export default Wether;
