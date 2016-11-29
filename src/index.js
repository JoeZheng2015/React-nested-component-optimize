import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {Router, Route, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import SingleConnect from './containers/SingleConnect'
import MultipleConnect from './containers/MultipleConnect'
import SmartSeat from './containers/SmartSeat'
import CanvasSeat from './containers/CanvasSeat'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}></Route>
            <Route path="/singleconnect" component={SingleConnect}></Route>
            <Route path="/multipleconnect" component={MultipleConnect}></Route>
            <Route path="/smartseat" component={SmartSeat}></Route>
            <Route path="/canvasseat" component={CanvasSeat}></Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
