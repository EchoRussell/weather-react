import React, { useState } from "react";
import "./Environment.css";
import axios from "axios";
export default function Environment() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function displayWeather(response) {
    setLoaded(true);

    setWeather({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: Math.round(response.data.main.humidity * 3.6),
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city.."
          onChange={updateCity}
        />
        <button type="submit"> Search </button>
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <div className="weather-info">
          <ul>
            <li>
              {" "}
              The temperature in {city} is {weather.temperature} °C
            </li>
            <li> Humidity {weather.humidity} %</li>
            <li>Description: {weather.description} </li>
            <li> Wind: {weather.wind} km/h</li>
            <img src={weather.icon} alt={weather.description} />{" "}
          </ul>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
