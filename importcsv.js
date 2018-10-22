var csv=require('csvtojson');

var csvFilePath='./athlete_events.csv';
csv()
    .fromFile(csvFilePath)
    .then((json)=>{
        console.log(json);
});