import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = { content: event.target.content.value }
    if (anecdote.content === '') return
    event.target.content.value = ''
    dispatch(newAnecdote(anecdote))
    dispatch(setNotification(`A new anecdote was created`), 3)
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