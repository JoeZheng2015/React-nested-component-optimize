import './style.css'
import React, { Component } from 'react'

export default class Intersection extends Component {
    constructor(args) {
        super(args)

        this.state = {
            list: new Array(101).join(0).split('').map((l, i) => i),
            page: 1,
            numPerPage: 20,
        }
    }
    render() {
        const {list, page, numPerPage} = this.state

        return (
            <div className="IntersectionObserver">
                <ul className="IntersectionObserver__items">
                    {
                        list.slice(0, page * numPerPage).map(item => <li className="IntersectionObserver__item" key={item}>{item}</li>)
                    }
                </ul>
                <div className="IntersectionObserver__observer" ref="observer">
                    {
                        page * numPerPage >= list.length ?
                            '已经没有更多了' : '正在加载更多'
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        if (this.refs.observer) {
            const observer = this.refs.observer

            if (IntersectionObserver) {
                const io = new window.IntersectionObserver(
                    (entries) => {
                        const {intersectionRatio} = entries[0]
                        const isVisible = intersectionRatio > 0
                        if (isVisible) {
                            this.setState({
                                page: this.state.page + 1,
                            })
                        }
                    },
                    {
                        threshold: [0],
                    }
                )
                io.observe(observer)
            }
            else {
                alert('您的浏览器不支持 IntersectionObserver，请升级')
            }
        }
    }
}
