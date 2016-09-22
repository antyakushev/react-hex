import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  ROLES,
  ROLE_PRICES,
  ROLE_NAMES,
  SELECTABLE_ROLES,
  ROLES_SUPPLY,
  ROLE_STEPS,
} from 'Consts'

const cellsSelector = ({ cells }) => cells
const playersSelector = ({ players }) => players
const turnSelector = ({ turn }) => turn

export const playerSelector = createSelector(
  turnSelector,
  ({ player }) => player
)

export const stepSelector = createSelector(
  turnSelector,
  ({ step }) => step
)

export const currentPlayerSelector = createSelector(
  playerSelector,
  playersSelector,
  (player, players) => players[player]
)

export const playerCellsSelector = createSelector(
  cellsSelector,
  playerSelector,
  (cells, player) => (
    cells.filter(cell => cell.player === player)
  ),
)

export const selectedCellSelector = createSelector(
  playerCellsSelector,
  (cells) => cells.filter(cell => cell.selected)[0]
)

export const playerUnitCountsSelector = createSelector(
  // TODO: count for all players at once
  playerCellsSelector,
  (cells) => cells.reduce(
    (prev, next) => {
      if (typeof next.role === 'number') {
        if (prev[next.role]) {
          prev[next.role]++
        } else {
          prev[next.role] = 1
        }
      }
      return prev
    }, [0, 0, 0] // TODO: get rid of these zeros
  )
)

const priceMapper = (count, i) => (count * ROLE_PRICES[i])
const priceReducer = (a, b) => (a + b)

export const playerEconomics = createSelector(
  playerUnitCountsSelector,
  counts => counts.map(priceMapper).reduce(priceReducer, 0)
)


export const playerUnitsSelector = createSelector(
  playerUnitCountsSelector,
  playerEconomics,
  currentPlayerSelector,
  (counts, economics, player) => (
    {
      units: counts
      .filter((count, i)=> SELECTABLE_ROLES[i])
      .map((count, i) => ({
        count,
        roleId: i,
        role: ROLE_NAMES[i],
        selected: player.selected === i,
        available: -ROLE_PRICES[i] >= Math.min(economics, 0), // Negative price units are always available
        // QUESTION: how to change player.selected
        // in case of unavailability?
        // Maybe move it back here and write one more selector.
        // Or write separate reducer which will utilize economics
        // selector to determine wether it is neccessary to switch
        // currently selected unit.
        // Or switch to the peasant on every turn change.
      }))
    }
  )
)

const findCellId = (cells, i, j) => {
  return _.find(cells, { i, j })
}

const cellNeighbours = (cells, c, r = 1) => {
  const find = (i, j) => findCellId(cells, i, j)
  const moreCells = r > 1 ? cellNeighbours(cells, c, r - 1) : []
  return [
    ...moreCells,
    find(c.i, c.j + r),
    find(c.i + r, c.j),
    find(c.i + r, c.j - r),
    find(c.i, c.j - r),
    find(c.i - r, c.j),
    find(c.i - r, c.j + r),
  ]
}

const cellNeighbourIds = (cells, c, r, player, onFoe, onVoid) => (
  cellNeighbours(cells, c, r)
  .filter(cell =>
    cell && (
      (onVoid && typeof cell.player !== 'number') || onFoe && (
        typeof cell.player === 'number' && cell.player !== player
      )
    )
  )
  .map(cell => cell && cell.cid)
)

const selectedCellNeighbourIdsSelector = createSelector(
  cellsSelector,
  selectedCellSelector,
  stepSelector,
  playerSelector,
  (cells, selectedCell, step, player) => (
    selectedCell
    ? cellNeighbourIds(
      cells,
      selectedCell,
      ROLE_STEPS[selectedCell.role][step - 1].radius,
      player,
      ROLE_STEPS[selectedCell.role][step - 1].onFoe,
      ROLE_STEPS[selectedCell.role][step - 1].onVoid,
    )
    : null
  )
)

const playerSupplyCellsSelector = createSelector(
  playerCellsSelector,
  (cells) => {
    return cells.filter(c => _.includes(ROLES_SUPPLY, c.role))
  }
)

const playerSelectableCellsIdsSelector = createSelector(
  playerCellsSelector,
  (cells) => {
    return cells && cells
    .filter(c => SELECTABLE_ROLES[c.role])
    .map(c => c.cid)
  }
)

const supplyChainIdsSetSelector = createSelector(
  cellsSelector,
  playerCellsSelector,
  playerSupplyCellsSelector,
  playerSelector,
  (cells, playerCells, playerSupplyCells, playerId) => {
    const ids = new Set
    const markedIds = new Set
    const spreadSupply = (cells, cell) => {
      cellNeighbours(cells, cell).forEach(
        cell => {
          if (!cell) return;
          if (typeof cell.role !== 'number') {
            ids.add(cell.cid)
          } else if (
            !markedIds.has(cell.cid) &&
            cell.player === playerId &&
            !_.includes(ROLES_SUPPLY, cell.role)
          ) {
            markedIds.add(cell.cid)
            spreadSupply(cells, cell)
          }
        }
      )
    }
    playerSupplyCells.forEach(
      cell => spreadSupply(cells, cell)
    )

    return ids
  }
)

export const highlightedCellsSelector = createSelector(
  cellsSelector,
  selectedCellNeighbourIdsSelector,
  supplyChainIdsSetSelector,
  stepSelector,
  currentPlayerSelector,
  playerSelectableCellsIdsSelector,
  (cells, selectedCellNeighbourIds, supplyChainIdsSet, step, currentPlayer, playerSelectableCellsIds) => {
    if (typeof currentPlayer.selected === 'number') {
      // Player considers adding new unit
      return {
        cells: cells.map(cell => {
          return {
            ...cell,
            highlighted: supplyChainIdsSet.has(cell.cid) //|| _.includes(playerSelectableCellsIds, cell.cid)
          }
        })
      }
    } else if (selectedCellNeighbourIds || playerSelectableCellsIds) {
      // Player selected existing unit
      const ids = step === 0 ? playerSelectableCellsIds : selectedCellNeighbourIds
      return {
        cells: cells.map(cell => {
          if (_.includes(ids, cell.cid)) {
            return {
              ...cell,
              highlighted: true
            }
          }
          return cell
        })
      }
    }
    return { cells }
  }
)
