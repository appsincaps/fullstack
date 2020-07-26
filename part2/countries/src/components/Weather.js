import React, { useEffect } from 'react'
import axios from 'axios'

const Weather = ({country, weather, setWeather}) => {

  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current` +
              `?access_key=${api_key}` +
              `&query=${country.capital},${country.name}`

  useEffect(() => {
    axios
      .get(url)
      .then(result => {
        //console.log(result)
        const data =  {  
                        temperature:  result.data.current.temperature,
                        wind_speed:   result.data.current.wind_speed,
                        wind_dir:     result.data.current.wind_dir,
                        icons:        result.data.current.weather_icons
                      }
        setWeather(data)
      })
  }, [url, setWeather])

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <div><b>Temperature:</b> {weather.temperature}</div>
      <div><b>Wind:</b> {weather.wind_speed} direction {weather.wind_dir}</div>
      {weather.icons?.map(icon=><img key={icon} src={icon} alt='icon'/>)}
    </div>
  )
}

export default Weather