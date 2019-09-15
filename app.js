//Create a default page 

function buildropdown() {
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
        var dataidstring  = idchosen.property("value")
        var dataid = parseInt(dataidstring)
        var datalist = data.metadata;
        d3.selectAll("p").text("")
        for (var i=0;i< datalist.length;i++){
            if (dataid === datalist[i].id){
                var chosendata = [{"id":datalist[i].id},{"ethnicity":datalist[i].ethnicity},{"gender":datalist[i].gender},{"age":datalist[i].age},{"location":datalist[i].location},{"bbtype":datalist[i].bbtype},{"wfreq":datalist[i].wfreq}];
                var selection1 = d3.selectAll("#sample-metadata").selectAll("p")
                                .data(chosendata);
                selection1.enter()
                        .append("p")
                        .merge(selection1)
                        .text(function (d) {return `${Object.keys(d)}: ${Object.values(d)}`})
                break
            }
        }
        var sampleslist = data.samples
        createTable(dataidstring,sampleslist);
    })
}

function createTable(chosen,list) {
    console.log("this is test for new function");
    //We are looking through so see wich samples will be used when matched with the id chosen
    for (var i = 0;i<list.length;i++){
        if (chosen === list[i].id){
            var bar_chart_value = list[i].sample_values.slice(0,10);
            var otu_ids = list[i].otu_ids.slice(0,10);
            var otu_ids = otu_ids.map(value => "OTU "+value)
            var otu_labels = list[i].otu_labels.slice(0,10);
            console.log(otu_labels);
            var data = [{
                type: "bar",
                x : bar_chart_value.reverse(),
                y : otu_ids.reverse(),
                orientation: 'h'
            }]
            Plotly.newPlot('bar', data)
        }
    }
};



buildropdown();
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