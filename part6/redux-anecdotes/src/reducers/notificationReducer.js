let idTimeout

export const clear = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR',
      message: null
    })
  }
}

export const setNotification = (message, delay) => {
  
  clearTimeout(idTimeout)

  return async dispatch => {
    
    dispatch({
      type: 'SET',
      message
    })
    
    idTimeout = setTimeout(() => dispatch(clear()), delay*1000)
  }
}

const reducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET':
      return action.message
    case 'CLEAR':
      return action.message
    default:
      return state
  }
}

export default reducer