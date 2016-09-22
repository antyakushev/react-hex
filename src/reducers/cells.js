import _ from 'lodash'
import { isLastCombatStep } from 'Utils'
import { ROLES } from 'Consts'

const n = 5
const r = 30
const r0 = r * Math.cos(Math.PI / 6)
const directions = (() => Array.apply(null, Array(2)).map(
  (_, i) => (2 * Math.PI * i) / 6)
)()

const Utils = {
  oppositeSide: (side) => (side + 3) % 6,
  getArrayElement: (a, i, j) => a[i] && a[i][j]
}

const Cell = (i, j) => {
  const x0 = (-2 - n) * r0
  const y0 = 0
  const x = x0 + 2 * Math.cos(directions[0]) * r0 * j + (i * r0)
  const y = y0 + 2 * Math.sin(directions[1]) * r0 * i
  return {
    cid: `${i}-${j}`,
    i,
    j,
    x: x * 2 / (n * 2 - 1),
    y: y * 2 / (n * 2 - 1) - 10,
    role: null,
    player: null,
  }
}

function createCells(n) {
  const a = []
  for (let i = 1; i < n * 2; i++) {
    a[i] = []
    for (let j = 1; j < n * 2; j++) {
      if (i + j <= n || i + j >= n * 4 - n) {
        a[i][j] = undefined
      } else {
        a[i][j] = Cell(i, j)
      }
    }
  }
  return a
}

function getFlatCellsState(cells) {
  let newCells = [];
  for (let i = 1; i < n * 2; i++) {
    for (let j = 1; j < n * 2; j++) {
      const cell = Utils.getArrayElement(cells, i, j)
      cell && newCells.push(cell) //  cell ? cell.getData() : undefined
    }
  }
  return newCells
}


const cell = (state, action) => {
  switch (action.type) {
    case 'BEGIN':
      if (state.i === n && state.j === 1) {
        return {
          ...state,
          role: ROLES.CASTLE,
          player: 0
        }
      }
      if (state.i === n && state.j === (n * 2) - 1) {
        return {
          ...state,
          role: ROLES.CASTLE,
          player: 1
        }
      }
      return state

    case 'PLACE_NEW_UNIT':
      if (state.cid !== action.cid) {
        return state
      }
      return {
        ...state,
        role: action.role,
        player: action.player
      }
    case 'SELECT_NEW_UNIT':
      return {
        ...state,
        selected: false
      }
    case 'SELECT_UNIT':
      return {
        ...state,
        selected: state.cid === action.cid
      }
    case 'MOVE_UNIT':
    case 'HORSE_JUMP':
      if (state.selected) return {
        ...state,
        role: null,
        player: null,
        selected: false,
      }
      if (state.cid === action.cid) return {
        ...state,
        role: action.role,
        player: action.player,
        selected: !isLastCombatStep(action.role, action.step),
      }
      if (action.type === 'HORSE_JUMP') {
        if (state.cid === action.mid)
        return {
          ...state,
          role: null,
          player: null,
        }
      }
      return state
    case 'PROSELYTIZE':
      if (state.selected) return {
        ...state,
        selected: false,
      }
      if (state.cid === action.cid) return {
        ...state,
        player: action.player,
      }
      return state
    default:
      return state
  }
}

const cells = (state, action) => {

  state = state || getFlatCellsState(createCells(n))

  switch (action.type) {
    case 'BEGIN':
    case 'SELECT_UNIT':
    case 'SELECT_NEW_UNIT':
    case 'PLACE_NEW_UNIT':
    case 'MOVE_UNIT':
    case 'PROSELYTIZE':
      return state.map(c =>
        cell(c, action)
      )
    case 'HORSE_JUMP':
      // VERY DIRTY. Will be solved and nice and natural when rewritten to MobX.
      const from = _.find(state, { selected: true })
      const to = _.find(state, { cid: action.cid })
      const mid = _.find(state, { i: (from.i + to.i) / 2, j: (from.j + to.j) / 2 })
      if (mid && mid.player !== action.player) // no mid found means cells are neighbours
        action.mid = mid.cid
      return state.map(c =>
        cell(c, action)
      )
    default:
      return state
  }
}

export default cells
