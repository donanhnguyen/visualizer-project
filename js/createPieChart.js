// var d3 = require("./d3.js");

const createPieChart = (array) => {
    console.log(d3);
    var width = 440;
    var height = 440;
    var radius = Math.min(width, height) / 2;

    // var color = ["blue", "green", "red", "orange", "purple", "gray"];
    var color = d3.schemeCategory10
    var color1 = d3.scaleOrdinal(d3.schemeCategory10);
    var svg = d3.select('#pie-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    var arc = d3.arc()
    .innerRadius(150)
    .outerRadius(radius);

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

    //text
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

    //legend
    var legendRectSize=20;
    var legendSpacing=7;
    var legendHeight=legendRectSize+legendSpacing;
 
 
    var legend=svg.selectAll('.legend')
        .data(array)
        .enter()
        .append('g')
        .attr({
            class:'legend',
            transform:function(d,i){
                //Just a calculation for x & y position
                return 'translate(-35,' + ((i*legendHeight)-65) + ')';
            }
        });

        console.log(legend);
    // legend.append('rect')
    //     .attr({
    //         width:legendRectSize,
    //         height:legendRectSize,
    //         rx:20,
    //         ry:20
    //     })
    //     .style({
    //         fill: function (d, i) {return color[i]},
    //         stroke: function (d, i) {return color[i]}
    //     });
 
    // legend.append('text')
    //     .attr({
    //         x:30,
    //         y:15
    //     })
    //     .text(function(d){
    //         return d.data.race;
    //     }).style({
    //         fill:'#929DAF',
    //         'font-size':'14px'
    //     }); 

};

export default createPieChart;