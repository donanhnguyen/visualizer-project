var d3 = require("./d3.js");

const createPieChart = (dataset) => {

var width = 1200;
var height = 500;

var radius = Math.min(width, height) / 2;

var legendRectSize = 40; 
var legendSpacing = 12;

// define color scale
var color1 = d3.schemeCategory10;
var color = d3.scaleOrdinal(d3.schemeCategory20c);
// more color scales: https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9

var svg = d3.select('#pie-chart') 
  .append('svg') 
  .attr('width', width) 
  .attr('height', height)
  .append('g') 
  .attr('transform', 'translate(' + (400) + ',' + (height / 2) + ')');

var arc = d3.arc()
  .innerRadius(0) 
  .outerRadius(radius); 

var pie = d3.pie() // start and end angles of the segments
  .value(function(d) { return d.percentage; }) // how to extract the numerical data from each entry in our dataset
  .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null


var tooltip = d3.select('#pie-chart') 
  .append('div')                                   
  .attr('class', 'tooltip'); 

tooltip.append('div')                          
  .attr('class', 'label');                          

tooltip.append('div')                    
  .attr('class', 'count');                  

tooltip.append('div')  
  .attr('class', 'percent');

dataset.forEach(function(d) {
  d.percentage = +d.percentage; // calculate count as we iterate through the data
  d.enabled = true; // add enabled property to track which entries are checked
});

// creating the chart
var path = svg.selectAll('path')
  .data(pie(dataset)) 
  .enter() 
  .append('path') 
  .attr('d', arc) 
  .attr('fill', function(d, i) { return color1[i]; }) 
    .attr("class", "pie-slice")
  .each(function(d) { this._current - d; }); 

    path.transition()
    .duration(1000)
    .attrTween('d', function(d) {
        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
            return arc(interpolate(t));
        };
    });

//text
    // var text = svg.selectAll('text')
    // .data(pie(dataset))
    // .enter()
    // .append("text")
    // .transition()
    // .duration(1000)
    // .attr("transform", function (d) {
    //     return "translate(" + arc.centroid(d) + ")";
    // })
    // .attr("dy", ".60em")
    // .attr("text-anchor", "middle")
    // .text(function(d){
    //     return d.data.percentage + "%";
    // })
    // .attr("style", "font-size: 15px; fill: white")
//text


path.on('mouseover', function(d) {      
 var total = d3.sum(dataset.map(function(d) {  
  return (d.enabled) ? d.percentage : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
  }));                                                      
 var percent = Math.round(1000 * d.data.percentage / total) / 10; // calculate percent
 tooltip.select('.label').html(d.data.race); // set current label           
//  tooltip.select('.count').html('$' + d.data.percentage); // set current count            
 tooltip.select('.percent').html(percent + '%'); // set percent calculated above          
 tooltip.style('display', 'block'); // set display                     
});                                                           

path.on('mouseout', function() {                    
  tooltip.style('display', 'none'); 
 });

path.on('mousemove', function(d) {                
  tooltip.style('top', (d3.event.layerY + 10) + 'px') 
    .style('left', (d3.event.layerX + 10) + 'px'); 
  });

// define legend

var legend = svg.selectAll('.legend') 
  .data(pie(dataset)) 
  .enter()
  .append('g') 
  .attr('class', 'legend') 
  .attr('transform', function(d, i) {                   
    var height = legendRectSize + legendSpacing; 
    var offset =  height * dataset.length / 2; 
    var horz = 18 * legendRectSize; 
    var vert = i * height - offset;               
      return 'translate(' + 500 + ',' + vert + ')';     
   });

// adding colored squares to legend
legend.append('rect')                                
  .attr('width', legendRectSize)                        
  .attr('height', legendRectSize)                    
  .style('fill', function(d, i) { return color1[i]; }) 
  .style('stroke', function(d, i) { return color1[i]; }) 
  .on('click', function(race) {
    var rect = d3.select(this); // this refers to the colored squared just clicked
    var enabled = true; // set enabled true to default
    var totalEnabled = d3.sum(dataset.map(function(d) { // can't disable all options
      return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
    }));

    if (rect.attr('class') === 'disabled') { // if class is disabled
      rect.attr('class', ''); // remove class disabled
    } else { // else
      if (totalEnabled < 2) return; // if less than two labels are flagged, exit
      rect.attr('class', 'disabled'); // otherwise flag the square disabled
      enabled = false; // set enabled to false
    }

    pie.value(function(d) { 
      if (d.race === race.data.race) d.enabled = enabled; // if entry label matches legend label
        return (d.enabled) ? d.percentage : 0; // update enabled property and return count or 0 based on the entry's status
    });

    path = path.data(pie(dataset)); // update pie with new data

    path.transition() // transition of redrawn pie
      .duration(700) // 
      .attrTween('d', function(d) { // 'd' specifies the d attribute that we'll be animating
        var interpolate = d3.interpolate(this._current, d); // this = current path element
        this._current = interpolate(0); // interpolate between current value and the new value of 'd'
        return function(t) {
          return arc(interpolate(t));
        };
      });
  });

// adding text to legend
legend.append('text')                                    
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing) 
  .attr('style', 'font-size: 18px')
  .text(function(d) { return d.data.race; }); 
}

export default createPieChart;