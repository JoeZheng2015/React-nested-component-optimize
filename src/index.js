import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {Router, Route, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import CanvasProject from './containers/canvasproject'
import SingleConnect from './containers/canvasproject/SingleConnect'
import MultipleConnect from './containers/canvasproject/MultipleConnect'
import SmartSeat from './containers/canvasproject/SmartSeat'
import CanvasSeat from './containers/canvasproject/CanvasSeat'
import PassiveEvent from './containers/PassiveEvent'
import IntersectionObserver from './containers/IntersectionObserver'
import WhyRedux from './containers/WhyRedux'
import Diff from './containers/Diff'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}></Route>
            <Route path="/canvasproject" component={CanvasProject}>
                <Route path="singleconnect" component={SingleConnect}></Route>
                <Route path="multipleconnect" component={MultipleConnect}></Route>
                <Route path="smartseat" component={SmartSeat}></Route>
                <Route path="canvasseat" component={CanvasSeat}></Route>
            </Route>
            <Route path="/passiveevent" component={PassiveEvent}></Route>
            <Route path="/intersection_observerer" component={IntersectionObserver}></Route>
            <Route path="/why_redux" component={WhyRedux}></Route>
            <Route path="/diff_algorithm" component={Diff}></Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);