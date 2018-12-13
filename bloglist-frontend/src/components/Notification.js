import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      color: 'mediumseagreen'
    }
    if (this.props.notification.content === '') {
      return(null)
    } else {
      return (
        <div style={style}>
          {this.props.notification.content}
        </div>
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
