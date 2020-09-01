import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote, newAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addNew = event => {
    event.preventDefault()
    dispatch(newAnecdote(event))
  }

  const ordered = [...anecdotes].sort((a,b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {ordered.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(upvote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input type='text' name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App