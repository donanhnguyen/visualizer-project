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

class PieChart extends React.Component {

    constructor(props) {
        super(props);
      
    }

    componentDidMount() {
   
    }

    render () {
        var {currentCity, switchToBarChart} = this.props;
    
        return (
            <div>
            <button class='qbutton' onClick={switchToBarChart}>Back to Bar Graph</button>
            <button class='qbutton'><Link class='city-link' to='/'>Back to home page</Link></button>
                <div class='pie-chart-container'>
                    pie chart bitch
                    <br/>
                    {currentCity.name}
                </div>


            </div>
        )
    }
}

export default PieChart;