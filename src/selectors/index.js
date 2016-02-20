import { createSelector } from 'reselect'

cellsSelector = { cells } => { cells }

playerUnitCountSelector = () => ()

/*
playerSelector = (state) => {
  const {players} = state
  const economics = playerUnits.unitsCount.map(priceMapper).reduce(priceReducer)
  return {
    units: players.map( (selected, i) => ({
        count,
        roleId: i,
        role: ROLE_NAMES[i],
        selected: playerUnits.selected == i,
        available: ROLE_PRICES[i] <= -economics
      })
    )
  }
}
*/
