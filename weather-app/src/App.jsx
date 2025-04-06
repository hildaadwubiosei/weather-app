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
        return <WiDaySunny size={150} color="gold" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloud size={150} color="gray" />;
      case "shower rain":
      case "rain":
        return <WiRain size={150} color="blue" />;
      case "snow":
        return <WiSnow size={150} color="white" />;
      default:
        return <WiCloud size={150} color="gray" />;
    }
  };

  const getBackgroundStyle = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return "linear-gradient(to right, #fceabb, #f8b500)";
      case "Clouds":
        return "linear-gradient(to right, #bdc3c7, #2c3e50)";
      case "Rain":
        return "linear-gradient(to right, #4b79a1, #283e51)";
      case "Snow":
        return "linear-gradient(to right, #e6dada, #274046)";
      case "Thunderstorm":
        return "linear-gradient(to right, #485563, #29323c)";
      default:
        return "linear-gradient(to right, #83a4d4, #b6fbff)";
    }
  };

  const backgroundStyle = {
    background: getBackgroundStyle(weather?.weather[0]?.main),
    minHeight: "100vh",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
  };


  
  

  return (
    <div className='container'>
    <div style={backgroundStyle} className='App'>
      <h1 className='Weather App'>Weather App</h1>
      <input id="input" type="text" placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)}/>
      <button id="button" onClick={fetchWeather}>Get Weather</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <h2 >Weather in {weather.name}</h2>
          <p id='icon'>{weather && weather.weather && getWeatherIcon(weather.weather[0].description)}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
    </div>
  )
}
export default App
