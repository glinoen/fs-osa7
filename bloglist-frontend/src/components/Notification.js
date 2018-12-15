import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

class Notification extends React.Component {
  render() {

    if (this.props.notification.content === '') {
      return(null)
    } else if(this.props.notification.style === 'danger') {
      return(
        <Alert bsStyle="danger">
          {this.props.notification.content}
        </Alert>
      )
    } else {
      return (
        <Alert bsStyle="success">
          {this.props.notification.content}
        </Alert>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


export default connect(
  mapStateToProps
)(Notification)
