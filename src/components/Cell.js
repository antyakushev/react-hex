import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinClasses } from '../Utils'
import { PLAYER_COLORS, ROLE_NAMES } from '../Consts'

export default class Cell extends Component {
  render() {
    const { onClick, className, style, role, cid } = this.props
    return (
      <div onClick={onClick} className={className} style={style}>
        <span className="role">{cid + ' ' + role}</span>
      </div>
    )
  }
}

// NOTE: maybe highlighted is not a part of the state?
const mapStateToProps = (state, {
  cid, x, y, player, role, selected, highlighted, onCellClick
}) => (
  {
    onClick: (highlighted) && onCellClick.bind(this, {cid, role, player}),
    player,
    cid: cid,
    role: ROLE_NAMES[role],
    style: {
      left: `${x}vmin`,
      top: `${y}vmin`,
      color: PLAYER_COLORS[player]
    },
    className: joinClasses(
      'cell',
      selected && 'selected',
      highlighted && 'hl',
    )
  }
)

export default connect(mapStateToProps)(Cell)
