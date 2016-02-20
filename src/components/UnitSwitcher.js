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

const mapStateToProps = (undefined, {roleId, role, selected, available, onUnitClick}) => (
  {
    onClick: onUnitClick.bind(this, roleId),
    text: role,
    className: joinClasses(
      'unit'
      ,selected && 'selected'
      ,available && 'available'
    )
  }
)

export default connect(mapStateToProps)(Switcher)
