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

            //create variable and array before json frEach
            var arr = [], arr2 = [];
            var colStr = 0;
            var colColumn = 0;
            var strNoc2;

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
                    strName = strName.replace(/"[^"]+"\s+/g, "");
                    strName = strName.replace(/\s+\(([^\)|\(]*?)\)/g, "");

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

                    //write json data tables "Teams"  to an array
                    var strTeam = items.Team;
                    var strNoc = items.NOC;
                    var strTeam = strTeam.replace(/[-0-9^]/g, "");
                    var pos = arr.indexOf(strNoc) == -1;
                    if (strNoc !== strNoc2) {
                            if (pos == true) {
                                    colStr = colStr + 1;
                                    arr.push(strNoc);
                                    arr2.push(strTeam);
                            }
                    }
                    function foundIndex(element) {
                            return element == strNoc;
                    }

                    var fnd = arr.findIndex(foundIndex);
                    strTeam = arr2[fnd];
                    strNoc2 = strNoc;
                    colColumn++;

                    /* //for testing
                     console.log(strNoc + ' ' + strTeam +'| |Lenght: ' + arr.length + '| |fnd: '+
                     fnd+'|'+'| |colStr: '+colStr+'|');
                     */

                    db.serialize(function () {

                    });

                    // reset array and object at end cycle
                    if (colColumn == json.length) {
                            arr.splice(0, arr.length);
                            arr.splice(0, arr2.length);
                            arr.splice(0, json.length);
                    }


            });
            db.close();
    });

