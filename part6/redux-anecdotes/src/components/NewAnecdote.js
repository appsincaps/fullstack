import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { error, success, remove } from '../reducers/notificationReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  const addNew = event => {
    event.preventDefault()
    dispatch(newAnecdote(event))
    dispatch(success(`A new anecdote was created`))
    setTimeout(() => dispatch(remove()), 5000)
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