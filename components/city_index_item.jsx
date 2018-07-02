import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import Cities from "../js/cities";

class CityIndexItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCityIndex: this.props.match.params.cityId,
            currentCity: Cities[this.props.match.params.cityId]
        }
    }

    render () {
        var currentCity = this.state.currentCity;
        return (
            <div>
                <Link to='/'>Back to home page</Link>
                <h1>5 year population growth from 2012-2016 for {currentCity.name}</h1>
            </div>
        )
    }

}

export default CityIndexItem;