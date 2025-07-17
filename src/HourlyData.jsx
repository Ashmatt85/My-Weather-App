

function HourlyForecast({ data }) {
  return (
    <div className="hourly-forecast">
      <h2>Hourly Forecast</h2>
      {/* Example: Loop through hourly data */}
      {data.map((hour, index) => (
        <div key={index}>
          <p>{hour.time}: {hour.temp}°</p>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;
