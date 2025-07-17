import { useEffect, useState, useRef } from 'react';
import './NewWeather.css';
import magnify2 from './assets/magnify2.png';
import WeatherIcon from './WeatherIcon.jsx';


const Weather = () => {  //weather function
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);



  const search = async (city) => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {   // catch error if city does not exist
      if (response.status === 404) {
        alert("City not found. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
      return;
    }
    
      const data = await response.json();
      console.log(data);


      const lat = data.coord.lat;
      const lon = data.coord.lon;
      fetchForecast(lat, lon); // fetch 5-day forecast after current data
      


      setWeatherData({  //getting data for description
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      });

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchForecast = async (lat, lon) => {  //setup 5-day forecast
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
    const data = await res.json();

    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).map(item => ({
      date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      description: item.weather[0].description
    }));

    setForecastData(dailyData.slice(0, 5)); // Get next 5 days
  } catch (err) {
    console.error("Error fetching 5-day forecast:", err);
  }
};

  // Default fetch on first load
  useEffect(() => {
    search("New York");
  }, []);

  return (  // setting entire app and search bar
    <div className="Weather">
      <div className="SearchBar">
        <span><input ref={inputRef} 
        type="text" 
        placeholder ="Enter city name"
        onKeyDown={(e) => e.key === 'Enter' && search(inputRef.current.value)}
        className='weather-icon' 
        />
        </span>
        
        <img    // implementing search icon
          src={magnify2}
          alt="Search"
          onClick={() => search(inputRef.current.value)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {weatherData && (
        <>
        <WeatherIcon     // weather icons for app
          iconCode = {weatherData.icon} 
          description={weatherData.description}
          className="weather-icon" 
          />

            <p className="temperature">
                {isCelsius ? `${weatherData.temperature}°C`: `${Math.round((weatherData.temperature * 9) / 5 + 32)}°F`}
            </p>

          <p className="location">{weatherData.location}</p>

        <button className = "toggle-button" onClick={() => setIsCelsius(!isCelsius)} >
            Switch to {isCelsius ? '°F' : '°C'}
        </button>

          <div className="weather-data">
            <div className="column">
              
              <p>{weatherData.humidity}%</p>
              <span className = "humidity">Humidity</span>
            </div>

            <div className="column">
              
              <p>{weatherData.windSpeed} m/s</p>
              <span className = "wind">Wind Speed</span>

            </div>
          </div>

          <div className="forecast-container">  
                {forecastData.map((day, index) => (
          <div className="forecast-day" key={index}>
                <p>{day.date}</p>
                    <img
                       src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt={day.description}/>

                <p>{isCelsius ? `${day.temp}°C` : `${Math.round((day.temp * 9) / 5 + 32)}°F`}</p>

            </div>
  ))}
</div>

          
        </>
      )}
    </div>
  );
};

export default Weather;
