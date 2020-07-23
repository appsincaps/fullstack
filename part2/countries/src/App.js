import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'

const App = () => {

  const [ search,     setSearch ]     = useState('')
  const [ countries,  setCountries ]  = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(result => {
        setCountries(result.data)
      })
  }, [])

  const filteredCountries = countries
    .filter((country) => country.name.toLowerCase().includes(search.toLowerCase()))

  const searchHandler = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <div>
      <Search search={search} onChange={searchHandler} />
      <Results list={filteredCountries} />
    </div>
  )
}

export default App;