// QUESTION: is it a good practice to access the store directly from the action creators?
import store from '../store'
import {
  selectedCellSelector,
  stepSelector,
  playerSelector,
  currentPlayerSelector,
  playerEconomics,
} from '../selectors'
import { ROLE_STEPS } from 'Consts'

export const begin = (numberOfPlayers = 2) => (
  {
    type: 'BEGIN',
    numberOfPlayers
  }
)

export const selectNewUnit = (role) => {
  const state = store.getState()
  const selected = currentPlayerSelector(state).selected
  const step = stepSelector(state)
  const isSelected = step === 1 && typeof selected === 'number'
  if (step === 0 || isSelected && selected !== role) {
    return {
      type: 'SELECT_NEW_UNIT',
      role,
      player: playerSelector(state),
    }
  }
  if (isSelected && selected === role) {
    return {
      type: 'DESELECT_NEW_UNIT',
      player: playerSelector(state),
    }
  }
  return {
    type: 'NOOP'
  }
}

export const clickCell = ({ cid, role, player }) => {
  const state = store.getState()
  const currentPlayer = playerSelector(state)
  const step = stepSelector(state)
  if (step < 2 && typeof role === 'number' && player === currentPlayer) {
    return {
      type: 'SELECT_UNIT',
      role,
      cid,
      player: currentPlayer,
    }
  }
  const selectedCell = selectedCellSelector(state)
  if (!selectedCell && typeof role !== 'number') {
    return {
      type: 'PLACE_NEW_UNIT',
      cid,
      player: currentPlayer,
      role: currentPlayerSelector(state).selected,
      step
    }
  }
  if (step > 0) {
    return {
      type: ROLE_STEPS[selectedCell.role][step-1].move,
      cid,
      role: selectedCell.role,
      player: currentPlayer,
      step
    }
  }
  // TODO: MOVE_UNIT and PROSELYTIZE
}

// It's what the bishop does
// export const proselytize = (cell) => {
//   return {
//     type: 'PROSELYTIZE',
//     cell,
//   }
// }
