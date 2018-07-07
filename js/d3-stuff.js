export const createBarChart = (array) => {
    d3.select("#bar-graph").selectAll("div")
        .data(array)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function (d) {
            var pop = parseFloat(d.replace(/,/g, ''));
            var barHeight = (pop / 10000 ) + 80;
            console.log(barHeight);
            return barHeight + "px";
        });
};

export const refreshBarChart = () => {
    d3.select("#bar-graph").html("");
};

