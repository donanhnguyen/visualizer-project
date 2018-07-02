import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import CitiesSplash from "./citiesSplash";
import CityIndexItem from './city_index_item';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Route exact path='/' component={CitiesSplash}/>
                <Route path='/:cityId' component={CityIndexItem} />
            </div>
        )
    }

}

export default App;