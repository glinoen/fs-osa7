import blogService from '../services/blogs'

const userReducer = (store = [], action) => {
  if (action.type === 'INIT_USERS') {
    return action.data
  }

  return store
}


export const userInitialization = () => {
  return async (dispatch) => {
    const users = await blogService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer