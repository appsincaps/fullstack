import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const upvote = anecdote => {
  return async dispatch => {
    const updated = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: updated
    })
  }
}

export const newAnecdote = anecdote => {
  return async dispatch => {
    const created = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW',
      data: created
    })
  }
}

const reducer = (state = [], action) => {

  const data = action.data

  switch (action.type) {

    case 'INIT':
      return action.data

    case 'VOTE': 
      const i = state.findIndex( an => an.id === data.id )
      return [ ...state.slice(0,i), data, ...state.slice(i+1) ]

    case 'NEW':
      return state.concat(action.data)

    default:
      return state
  }
}

export default reducer