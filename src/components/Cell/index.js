import React, { Component } from 'react'
import styles from './style.css'
import { connect } from 'react-redux'
import onClickOutside from 'react-onclickoutside'
import { joinClasses } from 'Utils'
import { PLAYER_COLORS, ROLE_NAMES, ROLES } from 'Consts'

const mapStateToProps = (state, {
  cid, x, y, player, role, selected, highlighted, onCellClick, onOutsideCellClick
}) => (
  {
    handleClick: highlighted && onCellClick.bind(this, {cid, role, player}),
    handleClickOutside: onOutsideCellClick.bind(this, {cid, role, player}),
    disableOnClickOutside: !selected,
    outsideClickIgnoreClass: styles.hl,
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

@connect(mapStateToProps)
@onClickOutside
class Cell extends Component {
  render() {
    const { handleClick, className, style, role, cid } = this.props
    return (
      <div onClick={handleClick} className={className} style={style}>
        <span className={styles.role}>{role}</span>
      </div>
    )
  }
}

export default Cell
