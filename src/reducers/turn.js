import { nextPlayer } from '../Utils'
const turn = (state, action) => {
  switch (action.type) {
    case 'SELECT_UNIT':
      return {
        ...state,
        step: 1
      }
    case 'MOVE_UNIT':
      // TODO: unsimplify this!
      return {
        ...state,
        player: nextPlayer(state.player),
        step: 0
      }

    // case 'PLACE_NEW_UNIT':

    case 'PROSELYTIZE':
      return {
        ...state,
        player: nextPlayer(state.player),
        step: 0
      }
    default:
      return state || {
        player: 0,
        step: 0
      }
  }
}

export default turn
