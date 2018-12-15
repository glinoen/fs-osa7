import React from 'react'
import blogService from '../services/blogs'
import { basicNotif } from '../reducers/notificationReducer'
import { blogInitialization } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

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
      await this.props.blogInitialization()

    } catch(exception) {
      console.log(exception)
    }
  }

  render() {

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.createNewBlog}>
          <FormGroup>
            <ControlLabel>title</ControlLabel>
            <FormControl
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleLoginFieldChange}
            />
            <ControlLabel>author</ControlLabel>
            <FormControl
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleLoginFieldChange}
            />
            <ControlLabel>url</ControlLabel>
            <FormControl
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleLoginFieldChange}
            />
            <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>

      </div>
    )
  }
}


const mapDispatchToProps = {
  basicNotif,
  blogInitialization
}

export default connect(
  null,
  mapDispatchToProps
) (Blogger)