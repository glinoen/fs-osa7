import React from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Notification from './components/Notification'
import { basicNotif } from './reducers/notificationReducer'
import { userInitialization } from './reducers/userReducer'
import { blogInitialization } from './reducers/blogReducer'
import { loggedIn } from './reducers/loginReducer'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, FormGroup, FormControl, ControlLabel, Button, Table } from 'react-bootstrap'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.userInitialization()
    this.props.blogInitialization()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.loggedIn(user)
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.props.loggedIn(user)
      this.setState({ username: '', password: '' })
    } catch(exception) {
      this.props.basicNotif('wrong username or password', 5, 'danger')
      this.setState({
        password: ''
      })
    }
  }


  render() {
    const loginForm = () => (
      <div className="content">
        <h2>Log in to application</h2>
        <form onSubmit={this.login}>
          <FormGroup>
            <ControlLabel>username:</ControlLabel>
            <FormControl
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
            <ControlLabel>password:</ControlLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
            <Button bsStyle="success" type="submit">login</Button>
          </FormGroup>
        </form>
      </div>
    )

    const blogForm = () => (
      <div >
        <h3>blogs</h3>
        <ListGroup>
          {this.props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <ListGroupItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    )



    const Users = ({ users }) => (
      <div>
        <h3>users</h3>
        <Table striped>
          <tbody>
            <tr>
              <th></th>
              <th>blogs added</th>
            </tr>
            {users.map(user => {
              return(
                <tr key={user.id}>
                  <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td> {user.blogs.length }</td>
                </tr>)
            }
            )}
          </tbody>
        </Table>
      </div>
    )

    const User = ({ user }) => {
      if(user === undefined) {
        return null
      } else {
        return(
          <div>
            <h2>{user.name}</h2>
            <b>Added blogs</b>
            <ul>
              {user.blogs.map(blog =>
                <li key={blog._id}>
                  <p>{blog.title} by {blog.author}</p>
                </li>)}
            </ul>
          </div>
        )
      }
    }

    const userById = (id) => {
      const user = this.props.users.find(x => x.id === id)
      return user
    }

    const blogById = (id) => {
      const blog = this.props.blogs.find(x => x.id === id)
      return blog
    }

    return (
      <Router >
        <div className="container">
          <div className="wrapper">
            <Notification />
            <Route render={({ history }) =>
              <Footer history={history} />}
            />
            {this.props.user === null ?
              <Route exact path="/" render={() =>
                loginForm()}
              /> :
              <Route exact path="/" render={() =>
                blogForm()}
              />
            }

            <Route exact path="/users" render={() =>
              <Users users ={this.props.users}/>}
            />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)} />}
            />
            <Route exact path="/blogs/:id" render={({ match, history }) =>
              <Blog blog={blogById(match.params.id)} history={history} user={this.props.user}/>}
            />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    notification: state.notification,
    user: state.user
  }
}

const mapDispatchToProps = {
  basicNotif,
  userInitialization,
  blogInitialization,
  loggedIn,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)
