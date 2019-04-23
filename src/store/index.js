import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import forecast from './forecast'

export default createStore(
  combineReducers({
    forecast
  }),
  applyMiddleware(thunk)
)
