
// var margin = {top: 20, right: 10, bottom: 100, left: 40};
// var width = 700 - margin.right - margin.left;
// var height = 500 - margin.top - margin.bottom;

// var yScale = d3.scaleLinear()
//     .domain([0, d3.max(array, function (d, i) {return d.pop} )   ])
//     .range([width, 0 ]).nice();

export const createBarChart = (array) => {
d3.select("#bar-graph").selectAll("div")
        .data(array)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function (d) {
            var pop = parseFloat((d.pop.replace(/,/g, '')));
            var barHeight = (pop / 10000 ) + 80;
            return barHeight + "px";
        })
        .html(function (d) {return d.pop} )
        
        ;

};



