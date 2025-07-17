
function WeatherIcon({ iconCode, description, className }) {
  if (!iconCode) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <img
      src={iconUrl}
      alt={description || 'Weather icon'}
      className = "weather-icon"
    />
  );
}

export default WeatherIcon;

