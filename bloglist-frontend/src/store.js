import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
  users: userReducer,
  notification: notificationReducer

})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

console.log(store.getState())

export default store