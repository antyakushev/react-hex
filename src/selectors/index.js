import { createSelector } from 'reselect'
import { ROLE_PRICES, ROLE_NAMES } from '../Consts'

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
