function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}
datasource  = d3.json("data/samples.json");
//lengthdatasource = datasource.samples.length;
//console.log(lengthdatasource);

function createDroplist() {
    var droplist = d3.select(".well");
    var droplist2 = droplist.select("#selDataset");
    var data = d3.json("data/samples.json")
    var listofsamples = data.samples.length;
    for (var i = 0; i <listofsamples; i++) {
        document.write(`<option value =${i}>${data.samples[i].id}</option>`);
    }
}
/*
function makeBargraph() {
    // Obtaining the value that was inputted
    var entered_value = d3.select("#selDataset").property("value");

    // This value will find the place that the subject id is located at
    var listplace = (entered_value - 940);

    d3.json("data/samples.json").then(function(data) {
        sample_values = data[listplace].sample_values,
        console.log(sample_values)
        otu_ids = data[listplace].otu_ids,
        console.log(otu_ids)
    })
}


var trace1 = {
    type: "bar",
    sample_values : [],
    y : [],
    orientation : "h"
};

var data = [trace1];
Plotly.newPlot("",data)

*/