import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectNewUnit } from '../actions'
import UnitSwitcher from './UnitSwitcher'
import { ROLE_PRICES, ROLE_NAMES } from '../Consts'

/*
class List extends Component {
  render() {
    const {collection, className, onUnitClick} = this.props
    return (
      <ul className={className}>
        {
          collection.map( (c, i) =>
            <UnitSwitcher key={i} {...c} onUnitClick={onUnitClick}/>
          )
        }
      </ul>
    );
  }
}
*/

class Units extends Component {
  render() {
    const {units, onUnitClick} = this.props
    return (
      <ul className='units'>
        {
          units.map( (c, i) =>
            <UnitSwitcher key={i} {...c} onUnitClick={onUnitClick}/>
          )
        }
      </ul>
    )
  }
}

const priceMapper = (count, i) => (count * ROLE_PRICES[i])
const priceReducer = (a, b) => (a + b)

const mapStateToProps = ({playerUnits}) => {
  const economics = playerUnits.unitsCount.map(priceMapper).reduce(priceReducer)
  return {
    units: playerUnits.unitsCount.map( (count, i) => ({
        count,
        roleId: i,
        role: ROLE_NAMES[i],
        selected: playerUnits.selected == i,
        available: ROLE_PRICES[i] <= -economics
      })
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onUnitClick: (role) => {
      dispatch(selectNewUnit(role))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Units)
