import React from 'react'
import Languages from './Languages'
import Flag from './Flag'

const Detail = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <Languages languages={country.languages} />
      <Flag flag={country.flag} />
    </div>
  )
}

export default Detail