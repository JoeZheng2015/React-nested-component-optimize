import React from 'react'
import {Link} from 'react-router'
import connect from '../../utils/connect'
import {canvasProject} from '../../selectors'

class CanvasProject extends React.Component {
    state = {
        records: [],
    }
    componentWillReceiveProps(nextProps) {
        const {pathname} = this.props.location

        if (pathname === nextProps.location.pathname && this.props.updateId === nextProps.updateId - 1) {
            this.setState({
                records: [
                    ...this.state.records,
                    nextProps.updateTime,
                ]
            })
        }
        else if (pathname !== nextProps.location.pathname){
            this.setState({
                records: [],
            })
        }
    }
    render() {
        const {loadTime, updateTime} = this.props
        const {records} = this.state

        return (
            <div className="CanvasProject" style={{height: '100vh'}}>
                <div className="header">
                    <ul className="titles">
                        <li className="title"><Link to="/canvasproject/singleconnect">single connect</Link></li>
                        <li className="title"><Link to="/canvasproject/multipleconnect">multiple connect</Link></li>
                        <li className="title"><Link to="/canvasproject/smartseat">smart seat</Link></li>
                        <li className="title"><Link to="/canvasproject/canvasseat">canvas seat</Link></li>
                    </ul>
                    <ul className="info">
                        <li>load time:<span>{loadTime ? loadTime.toFixed(8) : 0}ms</span></li>
                        <li>update time:<span>{updateTime ? updateTime.toFixed(8) : 0}ms</span></li>
                        <li>average update time:<span>{records.length ? (records.reduce((acc, time) => acc += time, 0) / records.length).toFixed(2) : 0}ms</span></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default connect(canvasProject)(CanvasProject)
