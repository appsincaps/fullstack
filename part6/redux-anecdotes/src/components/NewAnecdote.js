import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  const addNew = event => {
    event.preventDefault()
    dispatch(newAnecdote(event))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input type='text' name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewAnecdote