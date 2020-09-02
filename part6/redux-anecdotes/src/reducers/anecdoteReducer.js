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

export const upvote = id => {
  return {
    type: 'VOTE',
    data: {
      id
    }
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

  switch (action.type) {

    case 'INIT':
      return action.data

    case 'VOTE': 
      const i = state.findIndex( a => a.id === action.data.id )
      const upvoted = { ...state[i], votes: state[i].votes+1 }
      return [ ...state.slice(0,i), upvoted, ...state.slice(i+1) ]

    case 'NEW':
      return state.concat(action.data)

    default:
      return state
  }
}

export default reducer