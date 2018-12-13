import React from 'react'
import blogService from '../services/blogs'
import { basicNotif } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class Blogger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      comments: []
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createNewBlog = async (event) => {
    event.preventDefault()
    const blogi = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      comments: this.state.comments
    }

    try {
      await blogService.create(blogi)
      await this.props.basicNotif(`a new blog '${blogi.title}' added`, 10)
      this.setState({ title: '', author: '', url: '' })

    } catch(exception) {
      console.log(exception)
    }
  }

  render() {

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.createNewBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>

      </div>
    )
  }
}


const mapDispatchToProps = {
  basicNotif
}

export default connect(
  null,
  mapDispatchToProps
) (Blogger)