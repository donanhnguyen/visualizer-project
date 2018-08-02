import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import Cities from "../js/cities";

class CitiesSplash extends React.Component {

    constructor(props) {
        super(props);
    }

    allCities () {
        var displayCities = Cities.map((city, index) => {
            return (
                <Link class='city-link' to={`/${index}`}><div class={`${city.name.replace(/\s/g, '')}` + `${' city-pic'}`}></div></Link>
            )
        })
        return displayCities;
    }

    render () {
        return (
            <div class='animated zoomIn'>
                <h1 class='heading'>Here are the top fastest growing cities in America, as of 2018!</h1>
                <div class='cities-splash'>
                    {this.allCities()}
                </div>
            </div>
        )
    }

}

export default CitiesSplash;