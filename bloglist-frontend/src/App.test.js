import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/__mocks__/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      const appDiv = app.find('.content')
      expect(appDiv.text()).toContain('Log in to application')
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => { 
      const user = {
        token: '1234abc',
        username: 'teemutest',
        name: 'Testi Teemu'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('list of blogs is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })


})