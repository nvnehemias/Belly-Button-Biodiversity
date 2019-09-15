function buildcharts() {
    //Building the dropdown menu to choose id's
    d3.json("data/samples.json").then(function(data) {
        var listid = data.names;
        //We will append a list of option to our html
        var selection = d3.select("select").selectAll("option")
                            .data(listid);
        selection.enter()
                .append("option")
                .attr("value",function (d) {return d})
                .merge(selection)
                .text(function (d) {return d});
        d3.selectAll("#selDataset").on("change", handleSubmit);
    });
}

function handleSubmit() {
    d3.json("data/samples.json").then(function(data) {
        var idchosen = d3.selectAll("#selDataset");
        var dataid  = idchosen.property("value")
        var dataid = parseInt(dataid)
        var datalist = data.metadata;
        d3.selectAll("p").text("")
        for (var i=0;i< datalist.length;i++){
            if (dataid === datalist[i].id){
                var chosendata = [{"id":datalist[i].id},{"ethnicity":datalist[i].ethnicity},{"gender":datalist[i].gender},{"age":datalist[i].age},{"location":datalist[i].location},{"bbtype":datalist[i].bbtype},{"wfreq":datalist[i].wfreq}];
                var selection1 = d3.selectAll("#sample-metadata").selectAll("p")
                                .data(chosendata);
                console.log(chosendata)
                selection1.enter()
                        .append("p")
                        .merge(selection1)
                        .text(function (d) {return d})

                break
            }
        }
    })
}




buildcharts();
/*

var trace1 = {
    type: "bar",
    sample_values : [],
    y : [],
    orientation : "h"
};

var data = [trace1];
Plotly.newPlot("",data)

*/