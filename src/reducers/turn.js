import { nextPlayer, isLastCombatStep } from 'Utils'
import { ROLES, ROLE_UNITS_PER_TURN, ROLE_STEPS } from 'Consts'

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
    case 'DESELECT_NEW_UNIT':
      return setStep(state, 0)
    case 'PLACE_NEW_UNIT':
      if (state.step < ROLE_UNITS_PER_TURN[action.role]) {
        return nextStep(state)
      } else {
        return nextTurn(state)
      }
    case 'SELECT_UNIT':
      return setStep(state, 1)
    case 'MOVE_UNIT':
    case 'PROSELYTIZE':
    case 'HORSE_JUMP':
      // TODO: unsimplify this!
      if (isLastCombatStep(action.role, action.step)) {
        return nextTurn(state)
      } else {
        return nextStep(state)
      }
    default:
      return state || {
        player: 0,
        step: 0
      }
  }
}

export default turn
