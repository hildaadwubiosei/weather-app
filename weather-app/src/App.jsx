import { useState } from 'react'
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import './App.css'

function App() {
  const [city, setCity] = useState("") // State to store the city input
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_APP_API_KEY;


  const fetchWeather = async () => {
    if (!city) return; // Don't fetch if no weather is entered
    setError(null); // Reset before making new request

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok){
        throw new Error("City not found") // if API response is not okay show an error
      }
      const data = await response.json(); // convert API response to JSON
      setWeather(data); // Store the weather data in a state
    } catch (err) {
      setError(err.message); //Store the error message
      setWeather(null); // Clear the weather data if there is an error
    }
  }

  const getWeatherIcon = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case "clear sky":
        return <WiDaySunny size={50} color="gold" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloud size={50} color="gray" />;
      case "shower rain":
      case "rain":
        return <WiRain size={50} color="blue" />;
      case "snow":
        return <WiSnow size={50} color="white" />;
      default:
        return <WiCloud size={50} color="gray" />;
    }
  };

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <input type="text" placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)}/>
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          {weather && weather.weather && getWeatherIcon(weather.weather[0].description)}
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}
export default App
