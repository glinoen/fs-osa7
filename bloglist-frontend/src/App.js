import React from 'react'
import Blog from './components/Blog'
import Blogger from './components/Blogger'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Notification from './components/Notification'
import { basicNotif } from './reducers/notificationReducer'
import { userInitialization } from './reducers/userReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    this.props.userInitialization()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user:user })
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    console.log(event.target.value)
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
      this.setState({ username: '', password: '', user })
    } catch(exception) {
      this.props.basicNotif('wrong username or password', 5)
      this.setState({
        password: ''
      })
    }
  }

  logout = () => {
    window.localStorage.clear()
    this.setState({ user: null })
  }

  f5 = () => {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    console.log('RRRAAAAAA!')
  }

  render() {
    console.log('rendered')
    const loginForm = () => (
      <div className="content">
        <Notification />
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div className="content">
        {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <ul key={blog.id}>
            <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
          </ul>
        )}
      </div>
    )

    const Footer = () => {
      if (this.state.user === null) {
        return null
      } else {
        return(
          <div>
            <Notification />
            <h2>blog app</h2>
            <div>
              <Link to="/">blogs</Link> &nbsp;
              <Link to="/users">users</Link> &nbsp;
            </div>
            <table>
              <tbody>
                <tr>
                  <td>&nbsp; {this.state.user.name} logged in</td>
                  <td>&nbsp;<button onClick={() => this.logout()}>log out</button></td>
                </tr>
              </tbody>
            </table>
          </div>)
      }
    }

    const Users = ({ users }) => (
      <div>
        <h2>users</h2>
        <table>
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
        </table>
      </div>
    )

    const User = ({ user }) => {
      if(user === undefined) {
        return null
      } else {
        return(
          <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
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

    const Home = () => {
      if (this.state.user === null) {
        return loginForm()

      } else {
        return blogForm()
      }
    }

    const userById = (id) => {
      console.log('trigger1')
      const user = this.props.users.find(x => x.id === id)
      return user
    }

    const blogById = (id) => {
      console.log('trigger2')
      const blog = this.state.blogs.find(x => x.id === id)
      return blog
    }

    return (
      <Router>
        <div>
          <div className="wrapper">
            <Footer />
            <Route exact path="/" render={() => <Home />}/>
            {this.state.user !== null &&
              <Togglable buttonLabel='create new blog'>
                <Blogger action={this.fresher}/>
              </Togglable>
            }
            <Route exact path="/users" render={() =>
              <Users users ={this.props.users}/>}
            />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)} />}
            />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={blogById(match.params.id)} user={this.state.user} f5={this.f5} />}
            />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  basicNotif,
  userInitialization
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)
