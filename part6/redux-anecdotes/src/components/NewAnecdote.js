import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = { content: event.target.content.value }
    if (anecdote.content === '') return
    event.target.content.value = ''
    props.newAnecdote(anecdote)
    props.setNotification(`A new anecdote was created`, 3)
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

export default connect(
  null,
  { newAnecdote, setNotification}
 )(NewAnecdote)