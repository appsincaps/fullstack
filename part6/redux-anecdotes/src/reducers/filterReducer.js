export const change = filter => {
  return {
    type: 'CHANGE',
    filter
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.filter
    default:
      return state
  }
}

export default reducer