export const createBarChart = (array) => {

var colors = d3.schemeCategory10;

var svg = d3.select("#svg");

var padding = {top: 20, right: 30, bottom: 30, left: 80};

var chartArea = {
    "width": parseInt(svg.style("width")) - padding.left - padding.right,
    "height": parseInt(svg.style("height")) - padding.top - padding.bottom
};

var yScale = d3.scaleLinear()
    .domain([0, d3.max(array, function(d, i) {return parseInt(parseFloat((d.pop.replace(/,/g, ''))))  } )   ])
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
    );

rectGrp.selectAll("rect")
    .data(array)
    .enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", function (d, i) {
        return chartArea.height - yScale(parseFloat((d.pop.replace(/,/g, ''))));
    } )
    .attr("x", function (d, i) {
        return xScale(d.year);
    })
    .attr("y", function (d, i) {
        return yScale(parseFloat((d.pop.replace(/,/g, ''))));
    })
    .attr("fill", function (d, i) {
        return colors[i];
    })
    .attr("class", "bar bar-increase")

rectGrp.selectAll("text")
    .data(array)
    .enter()
    .append("text")
    .attr("x", function (d) {return xScale(d.year)})
    .attr("y", function (d) { return yScale(parseFloat((d.pop.replace(/,/g, ''))))})
    .attr("dy", "0em")
    .text(function(d, i) {
        return d.pop;
    })
    .attr("style", "font-size: 20px")

};


