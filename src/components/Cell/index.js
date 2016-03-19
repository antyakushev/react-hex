import React, { Component } from 'react'
import styles from './style.css'
import { connect } from 'react-redux'
import { joinClasses } from 'Utils'
import { PLAYER_COLORS, ROLE_NAMES, ROLES } from 'Consts'

export default class Cell extends Component {
  render() {
    const { onClick, className, style, role, cid } = this.props
    return (
      <div onClick={onClick} className={className} style={style}>
        <span className={styles.role}>{role}</span>
      </div>
    )
  }
}

// NOTE: maybe highlighted is not a part of the state?
const mapStateToProps = (state, {
  cid, x, y, player, role, selected, highlighted, onCellClick
}) => (
  {
    onClick: highlighted && onCellClick.bind(this, {cid, role, player}), //|| (typeof role === 'number' && (role !== ROLES.CASTLE))
    player,
    cid: cid,
    role: ROLE_NAMES[role],
    style: {
      left: `${x}vmin`,
      top: `${y}vmin`,
      color: PLAYER_COLORS[player]
    },
    className: joinClasses(
      styles.cell,
      selected && styles.selected,
      highlighted && styles.hl,
    )
  }
)

export default connect(mapStateToProps)(Cell)
