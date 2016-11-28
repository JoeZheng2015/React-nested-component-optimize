import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {Router, Route, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}></Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
