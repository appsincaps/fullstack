import React, { useState } from 'react'



const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const personExists = (name) => {
    return persons.some(person=>person.name===name)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (personExists(newName)) {
      alert(`${newName} is already added to the list`)
    } else {
      setPersons(persons.concat({ name: newName }))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={nameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=><div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App
