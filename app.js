//  build  funtion for  metadata
function buildMetadata(selection) {

    // Read  json 
    d3.json("samples.json").then((sampleData) => {
        console.log(sampleData);
        // Parse data and get the sample METADATA
        var parsedData = sampleData.metadata;
        console.log("parsed data inside buildMetadata function")
        console.log(parsedData);
        var sample = parsedData.filter(item => item.id == selection);
        console.log("showing sample[0]:");
        console.log(sample[0]);
        // Define location of metadata and update it
        var metadata = d3.select("#sample-metadata").html("");
        //create objet 
        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });
    


        console.log("next again");
        console.log(metadata);



    });
}

//funtion for creating charts for given sample
function buildCharts(selection) {

    // Read the json data
    d3.json("samples.json").then((sampleData) => {


        var parsedData = sampleData.samples;
        console.log("parsed data inside buildCharts function")
        console.log(parsedData);

        var sampleDict = parsedData.filter(item => item.id == selection)[0];
        console.log("sampleDict")
        console.log(sampleDict);

        //  Use sample_values 
        var sampleValues = sampleDict.sample_values; 
        var barChartValues = sampleValues.slice(0, 10).reverse();
        console.log("sample_values")
        console.log(barChartValues);
        //Use otu_ids 
        var idValues = sampleDict.otu_ids;
        var barChartLabels = idValues.slice(0, 10).reverse();
        console.log("otu_ids");
        console.log(barChartLabels);
        var reformattedLabels = [];
        barChartLabels.forEach((label) => {
            reformattedLabels.push("OTU " + label);
        });

        console.log("reformatted");
        console.log(reformattedLabels);

        var hovertext = sampleDict.otu_labels;
        var barCharthovertext = hovertext.slice(0, 10).reverse();
        console.log("otu_labels");
        console.log(barCharthovertext);

        // Graphs: bar chart location
        
        var barChartTrace = {
            type: "bar",
            y: reformattedLabels,
            x: barChartValues,
            text: barCharthovertext,
            orientation: 'h'
         //chart size
           
        };
        var layout2 = {
            showlegend: false,
            height: 600,
            width: 500,
            title: "TOP 10 Bacteria Cultures Found"
            
        };


        var barChartData = [barChartTrace];

        Plotly.newPlot("bar", barChartData, layout2);

        // Graphs: bubble chart location

        var bubbleChartTrace = {
            x: idValues,
            y: sampleValues,
            text: hovertext,
            mode: "markers",
            marker: {
                color: idValues,
                size: sampleValues
            }
        };

        var bubbleChartData = [bubbleChartTrace];
        //chart size
        var layout = {
            showlegend: false,
            height: 500,
            width: 1200,
            title: {
                display: true,
                text: "Bacteria Cultures Per Sample"
            },
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleChartData, layout);
    });
}

// Function for  page load
function init() {

    // Read json data
    d3.json("samples.json").then((sampleData) => {


        // Fpr Sample names: Parse data
        var parsedData = sampleData.names;
        console.log("parsed data inside init function")
        console.log(parsedData);
        // For dropdown
        var dropdownMenu = d3.select("#selDataset");
        parsedData.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })
        // For initial page show values of first sample
        buildMetadata(parsedData[0]);
        buildCharts(parsedData[0]);

    });
}

function optionChanged(newSelection) {

    // Onscreen selected metadata 
    buildMetadata(newSelection); 
    // Onscreen selected metadata 
    buildCharts(newSelection);
}

// Initialize dashboard on page load
init();

// ╔══╗
// ╚╗╔╝
// ╔╝(¯`v´¯)
// ╚══`.¸.[drs]


