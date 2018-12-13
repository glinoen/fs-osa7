const defaultMessage = ''

const initialState = { content: defaultMessage }

const notificationReducer = (store = initialState, action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION' :
      return { content : action.data }
    case 'RESET' :
      return { content: '' }
    default :
      return store
  }
}

export const basicNotif = (content, time) => {
  return (dispatch) => {
    console.log('HUHUUU################')
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, time * 1000)
  }
}

export default notificationReducer