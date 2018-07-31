import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import Cities from "../js/cities";
import createPieChart from '../js/createPieChart';
import createFakePieChart from '../js/createFakePieChart';
class PieChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        var {currentCity} = this.props;
        setTimeout(function () {
            this.setState({loaded: true});
            createPieChart(currentCity.demographics);

        }.bind(this), 400);
    }

    render () {
        var {currentCity, switchToBarChart} = this.props;
        if (this.state.loaded) {
            return (
                <div>
                <button class='qbutton' onClick={switchToBarChart}>Back to Bar Graph</button>
                <button class='qbutton'><Link class='city-link' to='/'>Back to home page</Link></button>
                    <div class='pie-chart-container'>
                        <h1>2018 Racial Demographics for {currentCity.name}</h1>

                        <div id="pie-chart">
                            
                        </div>
                    </div>


                </div>
            )
        } else {
            return (
                <div class="pie-chart-spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
                </div>
            )
        }

    }
}

export default PieChart;