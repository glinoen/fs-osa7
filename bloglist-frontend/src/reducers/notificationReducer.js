const defaultMessage = ''

const initialState = { content: defaultMessage }

const notificationReducer = (store = initialState, action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION' :
      return { content : action.data, style: action.style }
    case 'RESET' :
      return { content: '' }
    default :
      return store
  }
}

export const basicNotif = (content, time, style) => {
  return (dispatch) => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: content,
      style: style
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, time * 1000)
  }
}

export default notificationReducer