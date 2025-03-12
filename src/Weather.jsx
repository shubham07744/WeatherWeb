import axios from 'axios'
import React, { useState } from 'react'

const Weather = () => {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f8f09162c451687398a7151efc0c147e`
            )
            setWeather(response.data) // Extract `data` from response
        } catch (error) {
            console.log("Error while fetching weather data", error)
        }
    }

    const handleClick = () => {
        fetchWeather()
        setCity('')
    }

    return (
        <div className='container'>
            <h2>Get Weather Update</h2>
            <input type='text' placeholder='Enter City Name' value={city} onChange={handleCityChange} /><br/>
            <button className='btn' onClick={handleClick}>Get Weather</button>

            {weather && (
                <div className='info'>
                    <h2>{weather.name}</h2>
                    <p>Climate: {weather.weather[0].description}</p>
                    <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <p>Pressure: {weather.main.pressure} hPa</p>
                    <p>Humidity: {weather.main.humidity} %</p>
                </div>
            )}
        </div>
    )
}

export default Weather
