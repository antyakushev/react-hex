const player = (state, action) => {
  switch (action.type) {
    case 'PROSELYTIZE':
      return nextPlayer(state)
    default:
      return state || 0
  }
}

export default player
