import React from 'react'
import { upvote } from '../reducers/anecdoteReducer'
import { setNotification, clear } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filtered = filter === ''
    ? [...anecdotes]
    : [...anecdotes].filter( a => a.content.includes(filter))

  const orderedList = filtered.sort((a,b) => b.votes - a.votes)

  const vote = anecdote => {
    dispatch(upvote(anecdote))
    dispatch(setNotification(`"${anecdote.content}" was upvoted`, 2))
  }

  return (
    <div>
      {orderedList.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList