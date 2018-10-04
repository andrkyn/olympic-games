// test CSV output to json in console

var csv = require("csvtojson");
const csvFilePath='csv/csvjsontest.csv';

// Convert a csv file with csvtojson
csv()
    .fromFile(csvFilePath)
    .then(function(jsonObj){ //when parse finished, result will be emitted here.
        console.log(jsonObj);
    });
