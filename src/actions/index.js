// QUESTION: is it a good practice to access the store directly from the action creators?
import store from '../store'

export const begin = (numberOfPlayers=2) => (
  {
    type: 'BEGIN',
    numberOfPlayers
  }
)

export const selectNewUnit = (role) => {
  return {
    type: 'SELECT_NEW_UNIT',
    role,
  }
}

export const clickCell = (cid, role) => {
  if (typeof role === 'number') {
    return {
      type: 'SELECT_UNIT',
      role,
      cid,
    }
  } else {
    return {
      type: 'PLACE_NEW_UNIT',
      cid,
      role: store.getState().playerUnits.selected
    }
  }
  // TODO: MOVE_UNIT and PROSELYTIZE
}


export const placeNewUnit = (cid) => {
  return {
    type: 'PLACE_NEW_UNIT',
    cid,
  }
}

export const selectUnit = (cid, role) => {
  return {
    type: 'SELECT_UNIT',
    role,
    cid,
  }
}

// Beware! Someone may be killed!
export const moveUnit = (toCid) => {
  return {
    type: 'MOVE_UNIT',
    toCid,
  }
}

// It's what the bishop does
export const proselytize = (cell) => {
  return {
    type: 'PROSELYTIZE',
    cell,
  }
}
