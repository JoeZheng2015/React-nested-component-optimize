import './style.css'
import React from 'react'
import {Link} from 'react-router'
import connect from '../../utils/connect'
import {canvasProject} from '../../selectors'
import classnames from 'classnames'

const Pages = [
    {
        pathname: '/canvasproject/singleconnect',
        text: 'single connect'
    },
    {
        pathname: '/canvasproject/multipleconnect',
        text: 'multiple connect'
    },
    {
        pathname: '/canvasproject/smartseat',
        text: 'smart seat'
    },
    {
        pathname: '/canvasproject/canvasseat',
        text: 'canvas seat'
    },
]

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
        const {loadTime, updateTime, location} = this.props
        const {records} = this.state

        return (
            <div className="CanvasProject">
                <div className="header">
                    <dl className="titles">
                        <dt>点击链接可加载对应组件</dt>
                        {
                            Pages.map(page => (
                                <dd
                                    key={page.text}
                                    className={classnames('title', {active: page.pathname === location.pathname})}>
                                    <Link to={page.pathname}>{page.text}</Link>
                                </dd>
                                )
                            )
                        }
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
