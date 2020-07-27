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
    return persons.find(person=>person.name===name)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName === '') return
    const person = personExists(newName)
    if (person) {
      if (person.number === newNumber) {
        alert(`${newName}: ${newNumber} is already on the list`)
      } else {
        if (window.confirm(`${person.name} is already on the list. Modify the phone number?`)) {
          personService.update(person.id, { name: newName, number: newNumber })
          .then(() => {
            personService
              .getAll()
              .then(response => {
                setPersons(response)
              })
          })
        }
        
      }
    } else {
      personService.create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (event, person) => {
    event.preventDefault()
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
      .then(() => {
        personService
          .getAll()
          .then(response => {
            setPersons(response)
          })
      })
    }
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
      <Persons persons={shownPersons} removePerson={removePerson} />
    </div>
  )
}

export default App
