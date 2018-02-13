// First, we will create some constants to define non-data-related parts of the visualization
var w = 700; // Width of our visualization
var h = 500; // Height of our visualization
var xOffset = 40; // Space for x-axis labels
var yOffset = 100; // Space for y-axis labels
var margin = 10; // Margin around visualization
var vals = ['x', 'y']; // List of data attributes
var xVal = vals[0]; // Value to plot on x-axis
var yVal = vals[1]; // Value to plot on y-axis

// set the dimensions and margins of the graph
var margins = { top:20, right:20, bottom:30, left:50};
var width = w - margins.left - margins.right;
var height = h - margins.top - margins.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#scatterplot").append("svg")
            .attr("width", width + margins.left + margins.right)
            .attr("height", height + margins.top + margins.bottom)
            .append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
// Get the data

d3.csv("../../data/anscombe_I.csv", function(error, data){
  if (error) throw error;

  // Make the data numbers so they can be compared
  data.forEach(function(d){ d[xVal] = parseFloat(d[xVal]); });
  data.forEach(function(d){ d[yVal] = parseFloat(d[yVal]); });

  // Scale the range of the data
  x.domain([d3.min(data, function(d) { return d[yVal]; }) - 1, d3.max(data, function(d) { return d[yVal]; }) + 4]);
  y.domain([0, d3.max(data, function(d) { return d[yVal]; })]);

  // Add the scatterplot points
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("r", 5)
     .attr("x", function(d) {return d[xVal];})
     .attr("y", function(d) {return d[yVal];})
     .attr("cx", function(d) {return x(d[xVal]);})
     .attr("cy", function(d) {return y(d[yVal]);})
     .attr("fill","lightblue");

  // Add the X Axis
  svg.append("g")
     .attr("transform", "translate(0, " + height + ")")
     .attr("fill","lightblue")
     .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
     .attr("fill","lightblue")
     .call(d3.axisLeft(y));

  // Add text labels
  var xLabel = svg.append("text")
                  .attr("class", "label")
                  .text(xVal)
                  .attr("x", width - 20)
                  .attr("y", height - 10);

  var yLabel = svg.append("text")
                  .attr("class", "label")
                  .text(yVal)
                  .attr("y", -10)
                  .attr("transform", "rotate(90)");
});
