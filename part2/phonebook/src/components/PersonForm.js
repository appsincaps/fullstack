import React from 'react'

const PersonForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input onChange={props.nameChange} value={props.newName}/>
      </div>
      <div>
        number: <input onChange={props.numberChange} value={props.newNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm