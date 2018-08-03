var d3 = require("./d3.js");

const createPieChart = (dataset) => {

var width = 1200;
var height = 500;

var radius = Math.min(width, height) / 2;

var legendRectSize = 40; 
var legendSpacing = 12;

var color1 = d3.schemeCategory10;

var svg = d3.select('#pie-chart') 
  .append('svg') 
  .attr('width', width) 
  .attr('height', height)
  .append('g') 
  .attr('transform', 'translate(' + (400) + ',' + (height / 2) + ')');

var arc = d3.arc()
  .innerRadius(0) 
  .outerRadius(radius); 

var pie = d3.pie() 
  .value(function(d) { return d.percentage; }) 
  .sort(null); 


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
  d.percentage = +d.percentage; 
  d.enabled = true; 
});

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
  return (d.enabled) ? d.percentage : 0;                                      
  }));                                                      
 var percent = Math.round(1000 * d.data.percentage / total) / 10;
 tooltip.select('.label').html(d.data.race);                     
 tooltip.select('.percent').html(percent + '%');       
 tooltip.style('display', 'block');                     
});                                                           

path.on('mouseout', function() {                    
  tooltip.style('display', 'none'); 
 });

path.on('mousemove', function(d) {                
  tooltip.style('top', (d3.event.layerY + 10) + 'px') 
    .style('left', (d3.event.layerX + 10) + 'px'); 
  });


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


legend.append('rect')                                
  .attr('width', legendRectSize)                        
  .attr('height', legendRectSize)                    
  .style('fill', function(d, i) { return color1[i]; }) 
  .style('stroke', function(d, i) { return color1[i]; }) 
  .on('click', function(race) {
    var rect = d3.select(this); 
    var enabled = true; 
    var totalEnabled = d3.sum(dataset.map(function(d) { 
      return (d.enabled) ? 1 : 0;
    }));

    if (rect.attr('class') === 'disabled') { 
      rect.attr('class', ''); 
    } else {
      if (totalEnabled < 2) return; 
      rect.attr('class', 'disabled'); 
      enabled = false; 
    }

    pie.value(function(d) { 
      if (d.race === race.data.race) d.enabled = enabled; 
        return (d.enabled) ? d.percentage : 0; 
    });

    path = path.data(pie(dataset)); 

    path.transition() 
      .duration(700) 
      .attrTween('d', function(d) { 
        var interpolate = d3.interpolate(this._current, d); 
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });
  });


legend.append('text')                                    
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing) 
  .attr('style', 'font-size: 18px')
  .text(function(d) { return d.data.race; }); 
}

export default createPieChart;