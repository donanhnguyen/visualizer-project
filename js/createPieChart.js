const createPieChart = (array) => {

    console.log(d3);
    console.log(array);

    var width = 500;
    var height = 500;
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
    .innerRadius(0)
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




    
};

export default createPieChart;