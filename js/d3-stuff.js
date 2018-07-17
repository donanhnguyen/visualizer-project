


// var margin = {top: 20, right: 10, bottom: 100, left: 40};
// var width = 700 - margin.right - margin.left;
// var height = 500 - margin.top - margin.bottom;

// var svg = d3.select("body")
//     .append("svg")
//     .attr({
//         "width": width + margin.right + margin.left,
//         "height": height + margin.top + margin.bottom
//     })

    // .append("g")
    //     .attr("transform", "translate (" + margin.left + "," + margin.right + ')');
        


export const createBarChart = (array) => {

var svg = d3.select("#svg");

var padding = {top: 20, right: 30, bottom: 30, left: 80};
var chartArea = {
    "width": parseInt(svg.style("width")) - padding.left - padding.right,
    "height": parseInt(svg.style("height")) - padding.top - padding.bottom
};


var yScale = d3.scaleLinear()
    .domain([0, d3.max(array, function(d, i) {return parseInt(d.pop)  } )   ])
    .range([chartArea.height, 0]).nice();
  
var xScale = d3.scaleBand()
    .domain(array.map(function (d) {return d.year})   )
    .range([0, chartArea.width])
    .padding(.2);

var xAxis = svg.append("g")
    .classed("xAxis", true)
    .attr(
        "transform", "translate ("+ padding.left + "," + (chartArea.height + padding.top) + ")"
    )
    .call(d3.axisBottom(xScale));

var yAxisFn = d3.axisLeft(yScale);
var yAxis = svg.append("g")
    .classed("yAxis", true)
    .attr(
        "transform", "translate ("+ padding.left + "," + padding.top + ")"
    );
yAxisFn(yAxis);

var rectGrp = svg.append("g")
    .attr(
        "transform", "translate ("+ padding.left + "," + padding.top + ")"
    )


};

// d3.select("#bar-graph").selectAll("div")
//         .data(array)
//         .enter()
//         .append("div")
//         .attr("class", "bar")
//         .style("height", function (d) {
//             var pop = parseFloat((d.pop.replace(/,/g, '')));
//             var barHeight = (pop / 10000 ) + 80;
//             return barHeight + "px";
//         })
//         .html(function (d) {return d.pop} )
        
//         ;


