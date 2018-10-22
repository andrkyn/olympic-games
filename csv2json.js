// test CSV output to json in console

/*var csv = require("csvtojson");
const csvFilePath='csv/csvjsontest.csv';

// Convert a csv file with csvtojson
csv()
    .fromFile(csvFilePath)
    .then(function(jsonObj){ //when parse finished, result will be emitted here.
        console.log(jsonObj);
    });*/
var csvjson = require('csvjson');
var fs = require('fs');
var options = {
    delimiter : ',' , // optional
    quote     : '"' // optional
};

var file_data = fs.readFileSync('csv/csvjsontest.csv', { encoding : 'utf8'});
var result = csvjson.toObject(file_data, options);

console.log(result); //Converted json object from csv data
