function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
          .text(sample)
          .property("value", sample);
    });
    optionChanged(sampleNames[0]);
  })
}

function optionChanged(newId) {
  buildMetadata(newId);
  buildCharts(newId);
}

function buildMetadata(id) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == id);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}:${value}`);
    });
  });
};

//function buildCharts(sample) {
//   d3.json("samples.json").then(data) => {
//     var samples = data.samples;
//     var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
//     var sample = sampleArray[0];
//     var PANEL = d3.select("#bar");

//     PANEL.html("")
//     Object.entries(sample).forEach(([key, value]) => {
//       PANEL.append("h6").text(`${key}:${value}`);
//     });
//   });  
// };

function buildCharts(id) {
  d3.json("samples.json").then(data => {
    var data_samples = data.samples;
    var filterData = data_samples.filter(sampleObj => sampleObj.id === id);
    var dataObj = filterData[0];
    
    var trace1 = [{
      x: dataObj.sample_values.slice(0,10),
      y: dataObj.otu_ids.map(id => "OTU " + id.toString()).slice(0,10),
      text: dataObj.otu_labels,
      name: "otu",
      type: "bar",
      orientation: "h"
    }];
    Plotly.newPlot("bar", trace1);
  });
};
init();