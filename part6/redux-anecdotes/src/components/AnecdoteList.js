import React from 'react'
import { upvote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const vote = anecdote => {
    props.upvote(anecdote)
    props.setNotification(`"${anecdote.content}" was upvoted`, 2)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {

  const filtered = state.filter === ''
    ? [...state.anecdotes]
    : [...state.anecdotes].filter( a => a.content.includes(state.filter))

  const orderedList = filtered.sort((a,b) => b.votes - a.votes)

  return {
    anecdotes: orderedList
  }
}

const mapDispatchToProps = {
  upvote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)