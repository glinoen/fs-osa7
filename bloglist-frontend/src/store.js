import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'


const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
  user: loginReducer

})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

console.log(store.getState())

export default store