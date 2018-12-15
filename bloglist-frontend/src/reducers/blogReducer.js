import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  if (action.type === 'INIT_BLOGS') {
    return action.data
  }

  return store
}


export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer