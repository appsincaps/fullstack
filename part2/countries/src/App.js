import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'

const App = (props) => {

  const [ search,     setSearch ]     = useState('')
  const [ countries,  setCountries ]  = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(result => {
        setCountries(result.data)
      })
  }, [])

  const searchHandler = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <div>
      <Search search={search} onChange={searchHandler} />
      <Results />
    </div>
  )
}

export default App;