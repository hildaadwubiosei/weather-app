import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("") // State to store the city input

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <input type="text" placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)}/>
    </div>
  );
}

export default App
