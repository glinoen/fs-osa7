import React from 'react'
import PropTypes from 'prop-types'
import { Button,Collapse,Well } from 'react-bootstrap'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button bsStyle="success" onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          <Collapse in={this.state.visible}>
            <Well>
              {this.props.children}
            </Well>
          </Collapse>
          <Button bsStyle="warning" onClick={this.toggleVisibility}>cancel</Button>
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable