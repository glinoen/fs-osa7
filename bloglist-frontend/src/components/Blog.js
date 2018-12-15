import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { basicNotif } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { blogInitialization } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'


class Blog extends React.Component {
  likeMe = async () => {
    let blogi = this.props.blog
    blogi.likes = blogi.likes + 1
    try {
      await blogService.like(blogi)
      await this.props.blogInitialization()
    } catch (exception) {
      console.log(exception)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.comment.value
    e.target.comment.value = ''
    await blogService.postComment(this.props.blog, content)
    await this.props.blogInitialization()
    await this.props.basicNotif(`comment '${content}'`, 10)
  }

  delete = async () => {
    if(window.confirm('delete ' + this.props.blog.title + ' by ' + this.props.blog.author +'?'  )){
      try {
        await blogService.destroy(this.props.blog)
        await this.props.blogInitialization()
        this.props.history.push('/')
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  render() {
    const blogi = this.props.blog
    let blogiElement
    if(blogi === undefined) {
      return null
    }else {
      blogiElement = <div className="content">
        <h2>{blogi.title} {blogi.author}</h2>
        <a href={blogi.url}>{blogi.url} </a>
        <p><b>{blogi.likes}</b> likes  <Button bsStyle="primary" onClick={() => this.likeMe()}>like</Button></p>
        <p>added by {blogi.user.name}</p>
        {blogi.user === undefined || blogi.user.username === this.props.user.username  ?
          <Button bsStyle="danger" onClick={this.delete}>delete</Button> :
          null
        }
        <h3>comments</h3>
        <ul>
          {blogi.comments.map(comment =>
            <li key={comment}>
              <p>{comment}</p>
            </li>)}
        </ul>
        <Form inline onSubmit={this.handleSubmit}>
          <div><input name='comment'/></div>
          <Button bsStyle="success">add comment</Button>
        </Form>
      </div>
    }

    return (
      <div className="wrapper">
        {blogiElement}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  basicNotif,
  blogInitialization
}

export default connect(
  null,
  mapDispatchToProps
) (Blog)