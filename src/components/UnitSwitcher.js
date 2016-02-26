import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinClasses } from '../Utils'
import { ROLES } from '../Consts'

class Switcher extends Component {
  render() {
    return (
      <li className={this.props.className} onClick={this.props.onClick}>
        {this.props.text}
      </li>
    );
  }
}

const mapStateToProps = (undefined, {roleId, role, count, selected, available, onUnitClick}) => (
  {
    onClick: onUnitClick.bind(this, roleId),
    text: `${role} ${count}`,
    className: joinClasses(
      'unit'
      ,selected && 'selected'
      ,available && 'available'
    )
  }
)

export default connect(mapStateToProps)(Switcher)
