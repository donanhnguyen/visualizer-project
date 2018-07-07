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
            // currentCityPopulation: Object.keys(Cities[this.props.match.params.cityId].population).map((key) => ({[key]: Cities[this.props.match.params.cityId].population[key]}))
            currentCityPopulation: Object.keys(Cities[this.props.match.params.cityId].population).map((key) => (Cities[this.props.match.params.cityId].population[key]))
        }
    }

    componentDidMount() {
        var array = [5, 10, 15, 20, 25];
        D3Stuff.createBarChart(this.state.currentCityPopulation);
    }

    // componentWillUnmount() {
    //     D3Stuff.refreshBarChart();
    // }

    render () {
        var currentCity = this.state.currentCity;
        console.log(this.state.currentCityPopulation);
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