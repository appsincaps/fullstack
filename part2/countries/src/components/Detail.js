import React from 'react'
import Languages from './Languages'
import Flag from './Flag'
import Weather from './Weather'

const Detail = ({country, weather, setWeather}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <Languages languages={country.languages} />
      <Flag flag={country.flag} />
      <Weather country={country} weather={weather} setWeather={setWeather} />
    </div>
  )
}

export default Detail