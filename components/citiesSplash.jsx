import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import Cities from "../js/cities";
import CityIndexItem from './city_index_item';

class CitiesSplash extends React.Component {

    constructor(props) {
        super(props);
    }

    allCities () {
        var displayCities = Cities.map((city, index) => {
            return (
                <Link to={`/${index}`}>{city.name}</Link>
            )
        })
        return displayCities;
    }

    render () {
        return (
            <div>
                <h1>Here are the top fastest growing cities in America!</h1>
                <div>
                    {this.allCities()}
                </div>
            </div>
        )
    }

}

export default CitiesSplash;