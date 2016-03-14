import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.css'
import { joinClasses } from 'Utils'
import { ROLES } from 'Consts'

class Switcher extends Component {
  render() {
    return (
      <li className={this.props.className} onClick={this.props.onClick}>
        {this.props.text}
      </li>
    )
  }
}

const mapStateToProps = (state, { roleId, role, count, selected, available, onUnitClick }) => (
  {
    onClick: onUnitClick.bind(this, roleId),
    text: `${role} ${count}`,
    className: joinClasses(
      styles.unit,
      selected && styles.selected,
      available && styles.available
    )
  }
)

export default connect(mapStateToProps)(Switcher)
