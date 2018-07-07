export const createBarChart = (array) => {
    d3.select("#bar-graph").selectAll("div")
        .data(array)
        .enter()
        .append("div")
        .attr("class", "bar-chart")
        .style("height", function (d) {
            var pop = parseFloat(d.replace(/,/g, ''));
            var barHeight = (pop / 10000 );
            console.log(parseFloat(d.replace(/,/g, '')) / 10000);
            return barHeight + "px";
        });
};

export const refreshBarChart = () => {
    d3.select("#bar-graph").html("");
};

