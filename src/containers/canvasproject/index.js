import './style.css'
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
            <div className="CanvasProject">
                <div className="header">
                    <dl className="titles">
                        <dt>点击链接可加载对应组件</dt>
                        <dd className="title"><Link to="/canvasproject/singleconnect">single connect</Link></dd>
                        <dd className="title"><Link to="/canvasproject/multipleconnect">multiple connect</Link></dd>
                        <dd className="title"><Link to="/canvasproject/smartseat">smart seat</Link></dd>
                        <dd className="title"><Link to="/canvasproject/canvasseat">canvas seat</Link></dd>
                    </dl>
                    <dl className="infos">
                        <dt>组件性能</dt>
                        <dd className="info">load time:<span>{loadTime ? loadTime.toFixed(8) : 0}ms</span></dd>
                        <dd className="info">update time:<span>{updateTime ? updateTime.toFixed(8) : 0}ms</span></dd>
                        <dd className="info">average update time:<span>{records.length ? (records.reduce((acc, time) => acc += time, 0) / records.length).toFixed(2) : 0}ms</span></dd>
                    </dl>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default connect(canvasProject)(CanvasProject)
