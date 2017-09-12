import React from 'react'

const logText = (el) => {
    const pre = document.querySelector('.preElement')
    const after = document.querySelector('.afterElement')
    const items = [].slice.call(document.querySelectorAll('.item'))

    console.log(el, pre && pre.textContent, items.map(item => item && item.textContent), items.map(item => item && item.style.width), after && after.textContent)
}
class Item extends React.Component {
    componentWillMount() {
        logText(`item${this.props.value} componentWillMount`)
    }
    componentWillReceiveProps() {
        logText(`item${this.props.value} componentWillReceiveProps`)
    }
    componentWillUpdate() {
        logText(`item${this.props.value} componentWillUpdate`)
    }
    componentDidMount() {
        logText(`item${this.props.value} componentDidMount`)
    }
    componentDidUpdate() {
        logText(`item${this.props.value} componentDidUpdate`)
    }
    componentWillUnmount() {
        logText(`item${this.props.value} componentWillUnmount`)
    }
    render() {
        console.log(`item${this.props.value} render`)
        return <div className="item" style={{width: this.props.value}}>{this.props.value}</div>
    }
}
class List extends React.Component {
    state = {
        list: [
            {index: 1, value: 2},
            {index: 2, value: 3},
            {index: 3, value: 4},
        ],
    }
    render() {
        const { list } = this.state
        console.log('list render')
        return (
            <div>
                <button onClick={this.onClick}>click me to update state</button>
                <p className="preElement">{list.map(item => item.value)}</p>
                {
                    list.map((item, index) => <Item key={item.index} index={item.index} value={item.value}></Item>)
                }
                <p className="afterElement">{list.map(item => item.value)}</p>
            </div>
        )
    }
    onClick = () => {
        // index 0 插入一个新的 DOM
        // index 1 更新 DOM 的 textContent 和 style.width
        // index 4 插入一个新的 DOM
        this.setState({
            list: [
                {index: 0, value: 0},
                {index: 1, value: 4},
                {index: 4, value: 16},
            ]
        })
    }
    componentDidMount() {
        logText('list componentDidMount')
    }
    componentWillUpdate() {
        logText('list componentWillUpdate')
    }
    componentDidUpdate() {
        logText('list componentDidUpdate')
    }
}

export default List
