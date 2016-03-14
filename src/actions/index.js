// QUESTION: is it a good practice to access the store directly from the action creators?
import store from '../store'
import { selectedCellSelector, stepSelector, playerSelector, currentPlayerSelector, playerEconomics } from '../selectors'

export const begin = (numberOfPlayers = 2) => (
  {
    type: 'BEGIN',
    numberOfPlayers
  }
)

export const selectNewUnit = (role) => {
  return {
    type: 'SELECT_NEW_UNIT',
    role,
    player: playerSelector(store.getState()),
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
      type: 'MOVE_UNIT',
      cid,
      role: selectedCell.role,
      player: currentPlayer,
      step
    }
  }
  // TODO: MOVE_UNIT and PROSELYTIZE
}

// It's what the bishop does
export const proselytize = (cell) => {
  return {
    type: 'PROSELYTIZE',
    cell,
  }
}
