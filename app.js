
function buildropdown() {
    //Building the dropdown menu to choose id's
    d3.json("data/samples.json").then(function(data) {
        listid = [""]
        for (var i=0;i<data.names.length;i++){
            listid.push(data.names[i]);
        }
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
                var sampleslist = data.samples
                createTable(dataidstring,sampleslist);
                gaugefunction(datalist[i].wfreq)
                break
            }
        }
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
            var layout = {
                height: 500,
                width: 400
            }
            Plotly.newPlot('bar', data, layout);
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

function gaugefunction(wfreq){
    var traceA = {
        type: "pie",
        showlegend: false,
        hole: 0.4,
        rotation: 90,
        values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9",""],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: ['rgba(14, 127, 0,.5)', 
          'rgba(60, 154, 10, .5)',
          'rgba(110, 154, 22, .5)',
          'rgba(145, 154, 33, .5)',
          'rgba(170, 202, 42, .5)', 
          'rgba(190, 154, 72, .5)',
          'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)',
          'rgba(230, 235, 200, .5)',
          'rgba(255, 255, 255, 0)', 
          "white"]
        },
        labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9",""],
        hoverinfo: "label"
      };
      
      var degrees = 115, radius = .6;
      var radians = degrees * Math.PI / 180;
      var x = -1 * radius * Math.cos(radians);
      var y = radius * Math.sin(radians);

      y0value = LinePosition(wfreq)
      console.log(y0value);
      
      var layout = {
        shapes:[{
            type: 'line',
            x0: 0,
            y0: y0value,
            x1: 0.5,
            y1: 0.5,
            line: {
              color: 'black',
              width: 2
            }
          }],
        title: 'Belly Button Washing Frequency',
        height: 500,
        width: 600,
        xaxis: {visible: false, range: [-1, 1]},
        yaxis: {visible: false, range: [-1, 1]}
      };
      
      
      
      var data = [traceA];
      
    Plotly.plot("gauge", data, layout, {staticPlot: true});
}

function LinePosition(value){
    switch (value) {
        case 0:
            return 0.4;
            break;
        case 1:
            return 0.9;
            break;
        case 2:
            return 0.9;
            break;
        case 3:
            return 1.3;
            break;
        case 4:
            return 1.3;
            break;
    };
};

buildropdown();
