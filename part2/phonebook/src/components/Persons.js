import React from 'react'

const Persons = ({persons, removePerson}) => {
  return (
    <div>
      {persons.map(person => (
        <div key={person.name}>
          {person.name} {person.number} {}
          <button onClick={(e)=>removePerson(e, person)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default Persons