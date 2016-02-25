import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinClasses } from '../Utils'
import { PLAYER_COLORS, ROLE_NAMES } from '../Consts'

export default class Cell extends Component {
  render() {
    const {onClick, className, style, role} = this.props
    return (
      <div onClick={onClick} className={className} style={style}>
        <span className='role'>{role}</span>
      </div>
    );
  }
}

// NOTE: maybe highlighted is not a part of the state?
const mapStateToProps = (undefined, {cid, x, y, player, role, selected, highlighted, onCellClick}) => (
  {
    onClick: onCellClick.bind(this, cid, role),
    player,
    role: ROLE_NAMES[role],
    style: {
      left: `${x}vmin`,
      top: `${y}vmin`
    },
    className: joinClasses(
      'cell'
      ,selected && 'selected'
      ,highlighted && 'hl'
      ,PLAYER_COLORS[player]
    )
  }
)

export default connect(mapStateToProps)(Cell)
