import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import Cities from "../js/cities";
import * as D3Stuff from '../js/d3-stuff';

class CityIndexItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCityIndex: this.props.match.params.cityId,
            currentCity: Cities[this.props.match.params.cityId],
            currentCityPopulation: Object.keys(Cities[this.props.match.params.cityId].population).map((key) => ({[key]: Cities[this.props.match.params.cityId].population[key]}))
        }
    }

    render () {
        var currentCity = this.state.currentCity;
        return (
            <div>
                <button class='qbutton'><Link class='city-link' to='/'>Back to home page</Link></button>
                <h1>9 year population growth from 2007-2016 for {currentCity.name}</h1>
                <div id="bar-graph">

                </div>
            </div>
        )
    }

}

export default CityIndexItem;