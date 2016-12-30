import React, { Component } from 'react'
import {Link} from 'react-router'

class App extends Component {
    render() {
        return (
            <div>
                <header>Learning React's demo</header>
                <ul>
                    <li><Link to="/canvasproject">canvas project</Link></li>
                </ul>
            </div>
        );
    }
}

export default App;
