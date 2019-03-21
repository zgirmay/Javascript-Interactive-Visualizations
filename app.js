sampleNames = [];
function buildMetadata(sample) {
  d3.json(function (error, response) {
    if (error) {
      console.log(error);
    }
    else {
      sampleNames = response;
      for (var j = 0; j < sampleNames.length; j++) {
        d3.select("#selDataset").append("option")
          .attr("value", sampleNames[j]["name"])
          .text(sampleNames[j]);
      }
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  var data = [{
    values: [23, 36, 18, 23],
    labels: ["Type 1", "Type 2", "Type 3", "Type 4"],
    type: "pie"
  }];

  var layout = {
    margin: {
      b: 0,
      t: 10,
      pad: 0
    },
    height: 400,
    width: 500
  };

  Plotly.plot("pie", data, layout);

  var trace1 = {
    x: [1, 2, 3, 4],
    y: [20, 22, 24, 26],
    text: ['Type 1', 'Type 2', 'Type 3', 'Type 4'],
    mode: 'markers',
    marker: {
      color: ['red', 'blue', 'green', 'orange'],
      size: [20, 40, 60, 80]
    }
  };

  var data = [trace1];

  var layout = {
    margin: {
      l: 25,
      r: 200,
      b: 30,
      t: 10,
      pad: 0
    },
    xaxis: {title: "OTU ID"},

    showlegend: false,
    height: 400,
    width: 1200
  };

  Plotly.newPlot('scatterPlot', data, layout);

}

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
