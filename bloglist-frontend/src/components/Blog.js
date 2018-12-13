import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { basicNotif } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


class Blog extends React.Component {
  likeMe = async () => {
    let blogi = this.props.blog
    blogi.likes = blogi.likes + 1
    console.log('mitäköhän vittua')

    try {
      await blogService.like(blogi)
      await this.props.f5()
    } catch (exception) {
      console.log(exception)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.comment.value
    e.target.comment.value = ''
    await blogService.postComment(this.props.blog, content)
    await this.props.f5()
    await this.props.basicNotif(`comment '${content}'`, 10)
  }

  delete = async () => {
    if(window.confirm('delete ' + this.props.blog.title + ' by ' + this.props.blog.author +'?'  )){
      try {
        await blogService.destroy(this.props.blog)
        await this.props.f5()
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
        <p>{blogi.likes} likes  <button onClick={() => this.likeMe()}>like</button></p>
        <p>added by {blogi.user.name}</p>
        {blogi.user === undefined || blogi.user.username === this.props.user.username  ?
          <button onClick={this.delete}>delete</button> :
          null
        }
        <h3>comments</h3>
        <ul>
          {blogi.comments.map(comment =>
            <li key={comment}>
              <p>{comment}</p>
            </li>)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <div><input name='comment'/></div>
          <button>add comment</button>
        </form>
      </div>
    }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle} className="wrapper">
        {blogiElement}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  basicNotif
}

export default connect(
  null,
  mapDispatchToProps
) (Blog)