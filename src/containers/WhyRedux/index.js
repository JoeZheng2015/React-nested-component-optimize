import './style.css'
import React from 'react'

const Good = ({ good, increment, decrement }) => (
    <div>
        {good.name} {good.number}
        <button className="Shop__btn" onClick={() => increment(good.id)}>+</button>
        <button className="Shop__btn" onClick={() => decrement(good.id)}>-</button>
    </div>
)
const Goods = ({ goods, increment, decrement }) => (
    <div>
        {
            goods.map(good => <Good key={good.id} good={good} increment={increment} decrement={decrement} />)
        }
    </div>
)

class Shop extends React.Component {
    state = {
        goods: [
            { id: 0, name: 'iphone', number: 0 },
            { id: 1, name: 'mbp', number: 0 },
        ]
    }
    render() {
        return (
            <div className="Shop">
                <Goods goods={this.state.goods} increment={this.increment} decrement={this.decrement} />
            </div>
        )
    }
    increment = (goodId) => {
        this.updateGoods(goodId, true)
    }
    decrement = (goodId) => {
        this.updateGoods(goodId, false)
    }
    updateGoods(goodId, isIncrement) {
        this.setState({
            goods: this.state.goods.map(good => {
                if (good.id === goodId) {
                    return Object.assign({}, good, {
                        number: isIncrement ? good.number + 1 : good.number - 1,
                    })
                }
                return good
            })
        })
    }
}

export default Shop