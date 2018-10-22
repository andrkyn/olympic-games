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

            //write json data tables athletes to an array
            var strName = items.Name;
            var intSex = items.Sex,
                intAge = items.Age,
                strParams,
                par1 = items.Height,
                par2 = items.Weight,
                comma,
                team_id = items.ID,
                intSex = intSex.replace(/M/i, "1");
                intSex = intSex.replace(/F/i, "0");
                intAge = intAge.replace(/NA/g, "0");

                    if (par1 !== 'NA' && par2 !== 'NA') {
                            comma = ','
                    } else {
                            comma = '';
                    }

                    if (par1 !== 'NA') {
                            par1 = '{ Height: ' + par1;
                    } else {
                            par1 = '{';
                    }

                    if (par2 !== 'NA') {
                            par2 = ' Weight: ' + par2 + ' }';
                    } else {
                            par2 = '}';
                    }
                    strParams = par1 + comma + par2;
            })

    });

