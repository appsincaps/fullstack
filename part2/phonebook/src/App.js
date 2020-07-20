import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterList = (event) => {
    setFilter(event.target.value)
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
      setPersons(persons.concat({ name: newName, number: newNumber }))
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
      <div>
        filter shown with <input onChange={filterList} value={filter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={nameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={numberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {shownPersons.map(person=><div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App
