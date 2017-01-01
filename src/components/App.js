import React, { Component } from 'react'
import {Link} from 'react-router'

class App extends Component {
    render() {
        return (
            <dl className="Demo">
                <dt className="Demo__Title">Learning React's demo</dt>
                <dd className="Demo__Link"><Link to="/canvasproject">canvas project</Link></dd>
            </dl>
        );
    }
}

export default App;
