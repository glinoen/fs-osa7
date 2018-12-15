import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Togglable from './Togglable'
import Blogger from './Blogger'
import { loggedOut } from '../reducers/loginReducer'
import { Button, Table } from 'react-bootstrap'

class Footer extends React.Component {

  logout = () => {

    window.localStorage.clear()
    this.props.loggedOut(null)
    this.props.history.push('/')
  }

  render() {
    if (this.props.user === null) {
      return null
    } else {
      return(
        <div style={{  marginBottom: '30px' }}>
          <div>
            <Table striped>
              <tbody>
                <tr>
                  <td><h1>Blog App</h1></td>
                  <td><b>{this.props.user.name} logged in</b></td>
                  <td><Button bsStyle="danger" onClick={() => this.logout()}>log out</Button></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <Table bordered>
              <tbody>
                <tr>
                  <td><NavLink exact to="/">blogs</NavLink></td>
                  <td><NavLink exact to="/users">users</NavLink></td>
                </tr>
              </tbody>
            </Table>
          </div>
          {this.props.user !== null &&
            <Togglable buttonLabel='create new blog'>
              <Blogger />
            </Togglable>
          }
        </div>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  loggedOut
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Footer)