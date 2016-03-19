import { nextPlayer } from 'Utils'
import { ROLES, ROLE_UNITS_PER_TURN } from 'Consts'

const setStep = (state, step) => ({
  ...state,
  step
})

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
    case 'BEGIN':
      return {
        ...state,
        started: true
      }
    case 'SELECT_NEW_UNIT':
      return setStep(state, 1)
    case 'PLACE_NEW_UNIT':
      if (state.step < ROLE_UNITS_PER_TURN[action.role]) {
        return nextStep(state)
      } else {
        return nextTurn(state)
      }
    case 'SELECT_UNIT':
      return setStep(state, 1)
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
