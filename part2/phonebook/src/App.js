import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [ persons,    setPersons]     = useState([])
  const [ newName,    setNewName ]    = useState('')
  const [ newNumber,  setNewNumber ]  = useState('')
  const [ filter,     setFilter ]     = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personExists = (name) => {
    return persons.some(person=>person.name===name)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName === '') return
    if (personExists(newName)) {
      alert(`${newName} is already added to the list`)
    } else {
      personService.create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const shownPersons = filter === '' ?
        persons : 
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} nameChange={nameChange} 
        newNumber={newNumber} numberChange={numberChange} 
        handleSubmit={handleSubmit} 
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App
