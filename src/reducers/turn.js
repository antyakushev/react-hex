const turn = (state, action) => {
  switch (action.type) {
    case 'SELECT_UNIT':
      return {
        ...state,
        step: 1
      }
    

    // case 'PLACE_NEW_UNIT':

    case 'PROSELYTIZE':
      return {
        ...state,
        player: nextPlayer(state.player)
      }
    default:
      return state || {
        player: 0,
        step: 0
      }
  }
}

export default turn
