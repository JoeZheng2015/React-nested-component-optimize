import reducer from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const middlewares = [thunk]
if (process.env.NODE_ENV  !== 'production') {
    middlewares.push(createLogger())
}

export default function configureStore() {
    return createStore(
        reducer,
        applyMiddleware(...middlewares)
    )
}