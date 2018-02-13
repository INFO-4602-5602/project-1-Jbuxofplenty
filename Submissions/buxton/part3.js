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


var svg1 = d3.select("#linegraph").append("svg")
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

  // Sort the data
  data.sort(function(x, y) {return d3.ascending(x[xVal], y[xVal]);});

  // Define the line
  var valueline = d3.line()
      .x(function(d) { return x(d[xVal]); })
      .y(function(d) { return y(d[yVal]); });

   // Add the valueline line.
   svg1.append("path")
       .data([data])
       .attr("class", "line")
       .attr('stroke-width', 3)
       .attr("stroke","lightgreen")
       .attr("fill", "none")
       .attr("d", valueline);

  // Add the X Axis
  svg1.append("g")
     .attr("transform", "translate(0, " + height + ")")
     .attr("fill","lightgreen")
     .call(d3.axisBottom(x));

  // Add the Y Axis
  svg1.append("g")
     .attr("fill", "lightgreen")
     .call(d3.axisLeft(y));

  // Add text labels
  var xLabel = svg1.append("text")
                  .attr("class", "label")
                  .text(xVal)
                  .attr("x", width - 20)
                  .attr("y", height - 10);

  var yLabel = svg1.append("text")
                  .attr("class", "label")
                  .text(yVal)
                  .attr("y", -10)
                  .attr("transform", "rotate(90)")
                  .style("text-anchor", "start");
});
