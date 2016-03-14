import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.css'
import { selectNewUnit } from 'actions'
import { playerUnitsSelector } from 'selectors'
import UnitSwitcher from 'UnitSwitcher'

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
    const { units, onUnitClick } = this.props
    return (
      <ul className={ styles.units }>
        {
          units.map((c, i) =>
            <UnitSwitcher key={i} {...c} onUnitClick={onUnitClick} />
          )
        }
      </ul>
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

export default connect(playerUnitsSelector, mapDispatchToProps)(Units)
