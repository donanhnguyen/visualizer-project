const createPieChart = (array) => {

    console.log(d3);

    var width = 440;
    var height = 440;
    var radius = Math.min(width, height) / 2;

    // var color = d3.scaleOrdinal(d3.schemeCategory20b);
    var color = ["blue", "green", "red", "orange", "purple", "gray"];

    var svg = d3.select('#pie-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    var arc = d3.arc()
    .innerRadius(150)
    .outerRadius(radius);

    var labelArc = d3.arc()
        .outerRadius(radius - 50)
        .innerRadius(radius - 50)

    var pie = d3.pie()
    .value(function(d) { return d.percentage; })
    .sort(null);

    var path = svg.selectAll('path')
    .data(pie(array))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
        return color[i];
    })
    .attr('class', 'pie-slice')

    path.transition()
    .duration(1000)
    .attrTween('d', function(d) {
        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
            return arc(interpolate(t));
        };
    });

    restOfTheData(svg, pie, array, arc);




    
};

const restOfTheData = (svg, pie, array, arc) => {
    var text = svg.selectAll('text')
    .data(pie(array))
    .enter()
    .append("text")
    .transition()
    .duration(1000)
    .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".60em")
    .attr("text-anchor", "middle")
    .text(function(d){
        return d.data.percentage + "%";
    })
    .attr("style", "font-size: 15px; fill: white")
};

export default createPieChart;