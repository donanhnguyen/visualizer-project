import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import App from './app';

class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <HashRouter>
                    <App />
                </HashRouter>
            </div>
        )
    }

}

export default Root;