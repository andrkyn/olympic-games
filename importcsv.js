var csv=require('csvtojson');

var csvFilePath='./athlete_events.csv';

//added json-object for loading csv-files into it
csv()
    .fromFile(csvFilePath)
    .then((json)=>{
        console.log(json);


    });

