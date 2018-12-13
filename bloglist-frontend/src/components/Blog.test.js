import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  const blogi = {
    user: 'juuhel',
    likes: 3,
    author: 'gnucci',
    title: 'my favorite libraries',
    url: 'www.com'
  }

  const blogComponent = shallow(<Blog blog={blogi} user={'jaahas'}></Blog>)
  let contentDiv = blogComponent.find('.content')

  it('only title and author visible', () => {
    expect(contentDiv.text()).toBe(blogi.title + ' ' +  blogi.author)
  })

  it('after clicking name the details are displayed', () => {
    contentDiv.simulate('click')
  
    
    contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blogi.author) &&
    expect(contentDiv.text()).toContain(blogi.title) &&
    expect(contentDiv.text()).toContain(blogi.likes) &&
    expect(contentDiv.text()).toContain(blogi.url) 
    console.log(contentDiv.text())

  })
})