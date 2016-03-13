import { createSelector } from 'reselect'
import _ from 'lodash'
import { ROLES, ROLE_PRICES, ROLE_NAMES, ROLES_SUPPLY } from 'Consts'

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
      units: counts.map((count, i) => ({
        count,
        roleId: i,
        role: ROLE_NAMES[i],
        selected: player.selected === i,
        available: -ROLE_PRICES[i] >= economics
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
  return _.find(cells, {i, j})
}

const cellNeighbours = (cells, c) => {
  const find = (i, j) => findCellId(cells, i, j)
  return [
    find(c.i, c.j + 1),
    find(c.i + 1, c.j),
    find(c.i + 1, c.j - 1),
    find(c.i, c.j - 1),
    find(c.i - 1, c.j),
    find(c.i - 1, c.j + 1),
  ]
}

const cellNeighbourIds = (cells, c) => (
  cellNeighbours(cells, c).map(cell => cell.cid)
)

const selectedCellNeighbourIdsSelector = createSelector(
  cellsSelector,
  selectedCellSelector,
  (cells, selectedCell) => (selectedCell ? cellNeighbourIds(cells, selectedCell) : null)
)

const playerPeasantCellsSelector = createSelector(
  playerCellsSelector,
  (cells) => {
    return cells.filter(c => c.role === ROLES.PEASANT)
  }
)

const playerCastleCellSelector = createSelector(
  playerCellsSelector,
  (cells) => {
    return cells.filter(c => c.role === ROLES.CASTLE)[0]
  }
)

const supplyChainIdsSetSelector = createSelector(
  cellsSelector,
  playerCellsSelector,
  playerCastleCellSelector,
  playerPeasantCellsSelector,
  playerSelector,
  (cells, playerCells, playerCastle, playerPeasantCells, playerId) => {
    let ids = new Set
    let markedIds = new Set
    const foo = (cells, cell) => {
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
            foo(cells, cell)
          }
        }
      )
    }
    playerCastle && foo(cells, playerCastle)
    playerPeasantCells.forEach(
      cell => foo(cells, cell)
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
  (cells, selectedCellNeighbourIds, supplyChainIdsSet, step, currentPlayer) => {
    if (typeof currentPlayer.selected === 'number') {
      return {
        cells: cells.map(cell => {
          return {
            ...cell,
            highlighted: supplyChainIdsSet.has(cell.cid)
          }
        })
      }
    }
    if (selectedCellNeighbourIds) {
      if (step === 0) return {cells}
      return {
        cells: cells.map(cell => {
          if (_.includes(selectedCellNeighbourIds, cell.cid)) {
            return {
              ...cell,
              highlighted: true
            }
          }
          return cell
        })
      }
    }
    return {cells}
  }
)
