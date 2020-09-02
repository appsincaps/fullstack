import React from 'react'
import anecdoteService from '../services/anecdotes'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { error, success, remove } from '../reducers/notificationReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = { content: event.target.content.value }
    const created = await anecdoteService.createNew(anecdote)
    dispatch(newAnecdote(created))
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