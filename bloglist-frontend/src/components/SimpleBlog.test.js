import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

  const blog = {
    title: 'TestiBlogo',
    author: 'testemane',
    likes: 5
  }

  it('renders title, author and likes', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')
    const likesDiv = blogComponent.find('.likes')
    
    expect(likesDiv.text()).toContain(blog.likes)&&
    expect(contentDiv.text()).toContain(blog.author)&&
    expect(contentDiv.text()).toContain(blog.title)
  })

  it('clicking like button twice calls the function twice', () => {
    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)


  })
})