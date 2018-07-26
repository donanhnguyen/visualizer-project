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
        return (
            <div class='pie-chart-container'>
                pie chart bitch
                <br/>
                {this.props.currentCity.name}
            </div>
        )
    }
}

export default PieChart;