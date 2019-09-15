
function createinfo(data,id) {
    for (var i = 0; i < data.length; i++) {
        if (id === data.metadata[i].id) {
            var chosendata = data.metadata[i]
            var selection1 = d3.selet(".panel-body").selectAll("div")
                                .data(chosendata)
            selection1.enter()
                    .append("p")
                    .text(function (d) {return d.id})
        }
    }
}


function buildcharts() {
    //Building the dropdown menu to choose id's
    d3.json("data/samples.json").then(function(data) {
        var listid = data.names;
        //We will append a list of option to our html
        var selection = d3.select("select").selectAll("option")
                            .data(listid);
        selection.enter()
                .append("option")
                .text(function (d) {return d});
        //var selectedoption = d3.select("#selDataset option:checked").text();
        //console.log(selectedoption)
        //d3.select("option").on("click",createinfo(data,))
        //obtain the id number that was chosen then put that value in to the function so that if displays the
        //info for that id
        //createinfor(data,idselect);

    });
}
buildcharts();


//function createDroplist() {
//console.log(datanew);
d3.select("#selDataset")
    .selectAll("option")
//    .data(data)
    .enter()
    .append("option");

//}


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