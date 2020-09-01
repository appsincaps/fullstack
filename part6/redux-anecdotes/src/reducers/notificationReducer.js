export const error = message => {
  return {
    type: 'ERROR',
    message
  }
}

export const success = message => {
  return {
    type: 'SUCCESS',
    message
  }
}

export const remove = () => {
  return {
    type: 'REMOVE',
    message: null
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ERROR':
      return action.message
    case 'SUCCESS':
      return action.message
    case 'REMOVE':
      return action.message
    default:
      return state
  }
}

export default reducer