
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyData';

function WeatherMain(){
    const [city, setCity] = useState('New York');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {

        const fetchWeatherData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
                if (!response.ok) {
                    throw new Error('Location not found. Please check the city name.');
                }
                const data = await response.json();
                setWeatherData({

                    current: {...data.current, minitemp_c, maxtemp_c },
                    hourly: data. forecast.forecastday[0].day
                    
                });
            } catch (err) {
                setError(err.message);
                setWeatherData(null);
            } finally {
                setLoading(false);
            }
        };

        if (city) {
            fetchWeatherData();
        }

    }, [city]);
    return (
        <div className = "main">

            <div className = "container">

                <SearchBar onSearch={setCity} />
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {weatherData && (
                 <>
                    <CurrentWeather data = {weatherData.current}/>
                    <HourlyForecast data = {weatherData.hourly}/>
                    
                 </>
                )}  
            </div>

        </div>
    )
}
export default WeatherMain;