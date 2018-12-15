const loginReducer = (store = null, action) => {
  switch(action.type) {
    case 'LOGIN' :
      return action.data
    case 'LOGOUT' :
      return action.data
    default :
      return store
  }
}

export const loggedIn = (content) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN',
      data: content
    })
  }
}

export const loggedOut = (content) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      data: content
    })
  }
}

export default loginReducer