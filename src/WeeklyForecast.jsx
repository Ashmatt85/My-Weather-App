// src/components/FiveDayForecast.jsx

import './NewWeather.css'; // optional styling file
import WeatherIcon from './WeatherIcon';

function FiveDayForecast({ forecastData }) {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="forecast">
      {forecastData.map((day, index) => (
        <div key={index} className="forecast-day">
          <p>{day.date}</p>
          <WeatherIcon iconCode={day.icon} description={day.description} />
          <p>{day.temp}°C</p>
        </div>
      ))}
    </div>
  );
}

export default FiveDayForecast;
