import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import Cities from "../js/cities";
import createBarChart from '../js/createBarChart';
import PieChart from './pie-chart'; 
class CityIndexItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCityIndex: this.props.match.params.cityId,
            currentCity: Cities[this.props.match.params.cityId],
            currentCityPopulation: Cities[this.props.match.params.cityId].population,
            loaded: false,
            pieChart: false,
        }
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({loaded: true});
            createBarChart(this.state.currentCityPopulation);
        }.bind(this), 700);
    }

    componentDidUpdate () {
        if (this.state.loaded) {
            createBarChart(this.state.currentCityPopulation);
        }
    }

    switchToPieChart () {
        this.setState({
            pieChart: true,
            loaded: false,
        });
    }

    switchToBarChart () {
        this.setState({
            pieChart: false,
            loaded: true
        })
    }

    render () {
        var currentCity = this.state.currentCity;
        
        if (this.state.loaded) {
            return (
                <div>
                    <button class='qbutton'><Link class='city-link' to='/'>Back to home page</Link></button>
                    <h1>9 year population growth from 2007-2016 for {currentCity.name}</h1>
                    <div class='animated' id="bar-graph">
                        <svg id='bar-chart' width="1000" height="400">
                        </svg>
                    </div>
                    <button class='qbutton' onClick={this.switchToPieChart.bind(this)}>Racial Demographics</button>
                </div>
            )  
        } else if (!this.state.loaded && !this.state.pieChart) {
            return (
                <div class="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
                </div>
            )
        } else if (this.state.pieChart) {
            return (
                <PieChart currentCity={currentCity} switchToBarChart={this.switchToBarChart.bind(this)}/>
            )
        }
        
    }

}

export default CityIndexItem;