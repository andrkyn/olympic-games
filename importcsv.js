var csv=require('csvtojson');

//var csvFilePath='./csv/athlete_events.csv';
var csvFilePath='./csv/athlete_basaSmall2.csv';

//added json-object for loading csv-files into it
csv()
    .fromFile(csvFilePath)
    .then((json)=>{
        console.log(json);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('olympic_history.db');

           // data array creation
            json.forEach(function (items) {

            })

});

