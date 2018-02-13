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
var x_label = 0;
var y_label = 0;

// append the d3 object to the scatterplot2 div
var svg2 = d3.select("#scatterplot2").append("svg")
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
  var points = svg2.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("r", 5)
     .attr("x", function(d) {return d[xVal];})
     .attr("y", function(d) {return d[yVal];})
     .attr("cx", function(d) {return x(d[xVal]);})
     .attr("cy", function(d) {return y(d[yVal]);})
     .on("mouseover", handleMouseOver)
     .on("mouseout", handleMouseOut)
     .on("click", handleMouseClick)
     .attr("fill","lightblue");

  // Add the X Axis
  svg2.append("g")
     .attr("transform", "translate(0, " + height + ")")
     .attr("fill","lightblue")
     .call(d3.axisBottom(x));

  // Add the Y Axis
  svg2.append("g")
     .attr("fill","lightblue")
     .call(d3.axisLeft(y));

  // Used for storing the X and Y coordinates of the datapoint on the scatterplot in the p tag
  var xText = d3.select("#scatterLabel").append('text')
    .attr('fill', '#000')
    .text("(X, Y): (" + String(x_label));
  var yText = d3.select("#scatterLabel").append('text')
    .attr('fill', '#000')
    .text(", " + String(y_label) + ")");


  // Add text labels
  var xLabel = svg2.append("text")
                  .attr("class", "label")
                  .text(xVal)
                  .attr("x", width - 20)
                  .attr("y", height - 10);

  var yLabel = svg2.append("text")
                  .attr("class", "label")
                  .text(yVal)
                  .attr("y", -10)
                  .attr("transform", "rotate(90)");
});

// Create Event Handlers for mouse (mouse over)
function handleMouseOver(d) {
      // Use D3 to select element, change color and size
      d3.select(this)
        .attr("fill", "green")
        .attr("r", "10");
    }

// Create Event Handlers for mouse (mouse out)
function handleMouseOut(d) {
      // Use D3 to select element, change color and size
      d3.select(this)
        .attr("fill", "lightblue")
        .attr("r", "5");
    }

// Create Event Handlers for mouse (click)
function handleMouseClick(d) {
  x_label = d[xVal];
  y_label = d[yVal];

  // Remove any old text
  d3.select("#scatterLabel").selectAll("text").remove();

  // Used for storing the X and Y coordinates of the datapoint on the scatterplot in the p tag
  var xText = d3.select("#scatterLabel").append('text')
    .attr('fill', '#000')
    .text("(X, Y): (" + String(x_label));
  var yText = d3.select("#scatterLabel").append('text')
    .attr('fill', '#000')
    .text(", " + String(y_label) + ")");
}
