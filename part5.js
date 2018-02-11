// First, we will create some constants to define non-data-related parts of the visualization
var w1 = 300; // Width of our visualization
var h1 = 200; // Height of our visualization
var xOffset = 40; // Space for x-axis labels
var yOffset = 100; // Space for y-axis labels
var margin = 10; // Margin around visualization
var vals = ['x', 'y']; // List of data attributes
var xVal = vals[0]; // Value to plot on x-axis
var yVal = vals[1]; // Value to plot on y-axis

// set the dimensions and margins of the graph
var margins = { top:20, right:20, bottom:30, left:50};
var width1 = w1 - margins.left - margins.right;
var height1 = h1 - margins.top - margins.bottom;

// set the ranges
var x1 = d3.scaleLinear().range([0, width1]);
var y1 = d3.scaleLinear().range([height1, 0]);

var svg3 = d3.select("#scatterplotSet").append("svg")
            .attr("width", width1 + margins.left + margins.right)
            .attr("height", height1 + margins.top + margins.bottom)
            .append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

var svg4 = d3.select("#scatterplotSet").append("svg")
            .attr("width", width1 + margins.left + margins.right)
            .attr("height", height1 + margins.top + margins.bottom)
            .append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

var svg5 = d3.select("#scatterplotSet").append("svg")
            .attr("width", width1 + margins.left + margins.right)
            .attr("height", height1 + margins.top + margins.bottom)
            .append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

var svg6 = d3.select("#scatterplotSet").append("svg")
            .attr("width", width1 + margins.left + margins.right)
            .attr("height", height1 + margins.top + margins.bottom)
            .append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

create_graph("/data/anscombe_I.csv", svg3, "Anscombe_I");
create_graph("/data/anscombe_II.csv", svg4, "Anscombe_II");
create_graph("/data/anscombe_III.csv", svg5, "Anscombe_III");
create_graph("/data/anscombe_IV.csv", svg6, "Anscombe_IV");

// Create Event Handlers for mouse (mouse out)
function create_graph(filename, svg, dataset) {

  // Get the data
  d3.csv(filename, function(error, data){
    if (error) throw error;

    // Make the data numbers so they can be compared
    data.forEach(function(d){ d[xVal] = parseFloat(d[xVal]); });
    data.forEach(function(d){ d[yVal] = parseFloat(d[yVal]); });

    // Scale the range of the data
    x1.domain(d3.extent(data, function(d) { return d[xVal]; }));
    y1.domain([0, d3.max(data, function(d) { return d[yVal]; })]);

    // Add the scatterplot points
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("r", 5)
       .attr("x", function(d) {return d[xVal];})
       .attr("y", function(d) {return d[yVal];})
       .attr("cx", function(d) {return x1(d[xVal]);})
       .attr("cy", function(d) {return y1(d[yVal]);})
       .attr("fill","lightblue");

    // Add the X Axis
    svg.append("g")
       .attr("transform", "translate(0, " + height1 + ")")
       .attr("fill","lightblue")
       .call(d3.axisBottom(x1));

    // Add the Y Axis
    svg.append("g")
       .attr("fill","lightblue")
       .call(d3.axisLeft(y1));

    // Add text labels
    var xLabel = svg.append("text")
                    .attr("class", "label")
                    .text(xVal)
                    .attr("x", width1 - 20)
                    .attr("y", height1 - 10);

    var yLabel = svg.append("text")
                    .attr("class", "label")
                    .text(yVal)
                    .attr("y", -10)
                    .attr("transform", "rotate(90)");

    var graphLabel = svg.append("text")
                    .attr("class", "label")
                    .text(dataset)
                    .attr("x", width1 / 2 - 40)
                    .style("font-size", "14px")
                    .attr("y", height1 + 30);
  });
}
