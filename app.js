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
    //We are looking through so see wich samples will be used when matched with the id chosen
    for (var i = 0;i<list.length;i++){
        if (chosen === list[i].id){
            var bar_chart_value = list[i].sample_values;
            var otu_ids_old = list[i].otu_ids;
            var otu_ids = otu_ids_old.map(value => "OTU "+value).slice(0,10);
            var otu_labels = list[i].otu_labels;
            var data = [{
                type: "bar",
                x : bar_chart_value.slice(0,10).reverse(),
                y : otu_ids.reverse(),
                text: otu_labels.slice(0,10),
                orientation: 'h'
            }]
            Plotly.newPlot('bar', data)
        }
    }
    createBubble(otu_ids_old,bar_chart_value,bar_chart_value,otu_labels);
};

function createBubble(x,y,markervalue,label) {

    //Generate a list random colors using for loop and Math.random()
    colors = []
    for (var i=0;i<markervalue.length;i++){
        mylist = [];
        for (var j=1; j<226;j++){
            mylist.push(j);
        };
        var rand1 = mylist[Math.floor(Math.random() * mylist.length)];
        var rand2 = mylist[Math.floor(Math.random() * mylist.length)];
        var rand3 = mylist[Math.floor(Math.random() * mylist.length)];
        colors.push(`rgb(${rand1},${rand2},${rand3})`); 
    }

    //Create the traces for the bubble graph
    var trace = {
        x: x,
        y: y,
        text: label,
        mode: "markers",
        marker: {
            color: x,
            size: markervalue
        }
    };
    var data = [trace];
    var layout = {
        title: 'Marker Size',
        showlegend: false,
        height: 550,
        width: 1250
      };
    Plotly.newPlot('bubble', data, layout);
}

buildropdown();
