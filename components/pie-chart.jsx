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

class PieChart extends React.Component {

    constructor(props) {
        super(props);
      
    }

    componentDidMount() {
   
    }

    render () {
        return (
            <div>
                pie chart bitch
                <br/>
                {this.props.currentCity.name}
            </div>
        )
    }
}

export default PieChart;