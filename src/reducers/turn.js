import { nextPlayer } from '../Utils'
import { ROLES } from '../Consts'

const nextStep = (state) => ({
  ...state,
  step: state.step + 1
})

const nextTurn = (state) => ({
  ...state,
  player: nextPlayer(state.player),
  step: 0
})

const turn = (state, action) => {
  switch (action.type) {
    case 'PLACE_NEW_UNIT':
      if (action.role === ROLES.PEASANT && state.step === 0) {
        return nextStep(state)
      } else {
        return nextTurn(state)
      }
    case 'SELECT_UNIT':
      return nextStep(state)
    case 'MOVE_UNIT':
      // TODO: unsimplify this!
      return nextTurn(state)
    case 'PROSELYTIZE':
      return nextTurn(state)
    default:
      return state || {
        player: 0,
        step: 0
      }
  }
}

export default turn
