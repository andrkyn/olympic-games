var csv=require('csvtojson');

//var csvFilePath='./csv/athlete_events.csv';
//var csvFilePath='./csv/athlete_basaLarge.csv';
var csvFilePath='./csv/athlete_basaSmall4.csv';

//added json-object for loading csv-files into it
csv()
    .fromFile(csvFilePath)
    .then((json)=>{
        //console.log(json);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('olympic_history.db');
var mode = process.argv[2];

        //create variable and array before json frEach
        var arr = [], arr2 = [];
        var colStr = 0;
        var colSport = 0;
        var colColumn = 0;
        var strNoc2;
        var strGames2;
        var strSport2;
        var lengCity = 0;
        var lengCity2 = 0;
        var fndGame = 0;
        var fndSport = 0;
        var fndEvents = 0;
        var lineGame=0;
        var strCity2;
        var arrGames =[], arrCity =[],arrRez = [], arrSeason =[],
            arrPr =[], arrYear = [], arrSport = [], arrEvent =[];

            // data array creation
            json.forEach(function (items) {

                    //write json data tables to an array
                var strName = items.Name;
                var intSex = items.Sex,
                    intAge = items.Age,
                    strParams,
                    par1 = items.Height,
                    par2 = items.Weight,
                    comma,
                    team_id=0,
                    intSex = intSex.replace(/M/i, "1");
                    intSex = intSex.replace(/F/i, "0");
                    intAge = intAge.replace(/NA/g, "0");
                    strName = strName.replace(/"[^"]+"\s+/g, "");
                    strName = strName.replace(/\s+\(([^\)|\(]*?)\)/g, "");

                    if (par1 !== 'NA' && par2 !== 'NA') { comma = ',' } else { comma = ''; }
                    if (par1 !== 'NA') { par1 = '{ Height: ' + par1; } else { par1 = '{'; }
                    if (par2 !== 'NA') { par2 = ' Weight: ' + par2 + ' }'; } else { par2 = '}'; }
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
                    team_id = fnd;
                    strNoc2 = strNoc;
                    colColumn++;

                    /* //for testing
                     console.log(strNoc + ' ' + strTeam +'| |Lenght: ' + arr.length + '| |fnd: '+
                     fnd+'|'+'| |colStr: '+colStr+'|');
                     */

                ////////// add into Game data base  ////////
                var strGames = items.Games;
                var strCity = items.City;
                var year = items.Year;
                var season = items.Season;
                var sport = items.Sport;
                var event = items.Event;
                var medal = items.Medal;
                var athlete_id = items.ID;
                var posGames = arrGames.indexOf(strGames) == -1;
                var posCity = arrCity.indexOf(strCity) == -1;
                var posSport = arrSport.indexOf(sport) == -1;
                var delUndef;


                season = season.replace(/Winter/g, "1");
                season = season.replace(/Summer/g, "0");

                medal = medal.replace(/NA/g, "0");
                medal = medal.replace(/Gold/g, "1");
                medal = medal.replace(/Silver/g, "2");
                medal = medal.replace(/Bronze/g, "3");

                // for tables games
                if (sport !== strSport2) {
                    if (posSport == true) {
                        colSport++;
                        arrSport.push(sport);
                    }
                }
                strSport2 = sport;
                fndSport = arrSport.findIndex(indSport);
                function indSport(element) {
                    return element == sport;
                }// end for tables games

                if (posGames == true) {
                    lineGame++;
                    arrGames.push(strGames);
                    arrCity.push(strCity);
                    arrYear.push(year);
                    arrSeason.push(season);
                    arrEvent.push(event);

                }

                fndGame = arrGames.findIndex(indCity);
                function indCity(element) {
                    return element == strGames;
                }

                lengCity2 = arrCity[fndGame].toString().length;
                if (lengCity <= lengCity2) {
                    arrRez[fndGame] = arrCity[fndGame];
                }

                for (var i = 0; i <= arrGames.length; i++) {
                    if (strGames == arrGames[i] && strCity !== arrCity[i]) {
                        arrPr[fndGame] = strCity;
                        delUndef = arrPr[fndGame].replace(/undefined,/g, "");
                        arrRez[fndGame] = arrCity[fndGame] + ',' + delUndef;
                        lengCity = arrRez[fndGame].toString().length;
                    }
                }

                strGames2 = strGames;
                strCity2 = strCity;

                db.serialize(function () {
                    db.run("BEGIN");
                    // to write data to table "Athletes"
                    var athletes = db.prepare('INSERT OR REPLACE INTO athletes('
                        + 'id, full_name, sex, age, params, team_id)'
                        + 'VALUES (?,?,?,?,?,?)');
                    athletes.run(colColumn, strName, intSex, intAge, strParams, team_id);
                    athletes.finalize();

                    // to write data to table "Games"
                    if (colColumn == json.length) {
                        var games = db.prepare('INSERT OR REPLACE INTO games('
                            + 'id, year, season, city)'
                            + 'VALUES (?,?,?,?)');
                        var events = db.prepare('INSERT OR REPLACE INTO events('
                            + 'id, name)'
                            + 'VALUES (?,?)');
                        for (var i = 0; i < arrRez.length; i++) {
                            games.run(i, arrYear[i], arrSeason[i], arrCity[i]);
                            events.run(i, arrEvent[i]);
                            console.log('Add to events & games table: ' + i);
                        }
                        games.finalize();
                        events.finalize();

                        // to write data to table "Sports"
                        var sports = db.prepare('INSERT OR REPLACE INTO sports('
                            + 'id, name)'
                            + 'VALUES (?,?)');
                        for (var j = 0; j < colSport; j++) {
                            sports.run(j, arrSport[j]);
                            console.log('Add to sport table: ' + j);
                        }
                        sports.finalize();

                        // to write data to table "Teams"
                        var team = db.prepare('INSERT OR REPLACE INTO teams('
                            + 'id, name, noc_name)'
                            + 'VALUES (?,?,?)');
                        for (var i = 0; i < colStr; i++) {
                            team.run(i, arr2[i], arr[i]);
                            console.log('Add to teams table: ' + i);
                        }
                        team.finalize();

                    }

                    // to write data to table "Results"
                    var results = db.prepare('INSERT OR REPLACE INTO results('
                        + 'id, athlete_id, game_id, sport_id, event_id, medal)'
                        + 'VALUES (?,?,?,?,?,?)');
                    results.run(colColumn, athlete_id, fndGame, fndSport, 'null', medal); // поставил null в событиях, если будет необходимость, то выведу в базу
                    results.finalize();

                    db.run("commit");
                });

                // reset array and object at end cycle
                if (colColumn == json.length) {
                    arr.splice(0, arr.length);
                    arr2.splice(0, arr2.length);
                    json.splice(0, json.length);
                    arrCity.splice(0, arrCity.length);
                }

            });

          console.log(' number of lines: ' + colColumn + '\n number of NOC: ' +
              colStr + '\n array Games: ' + arrGames + '\n Line Game: ' + lineGame +
              '\n arrRez: ' + arrRez+'\n mode: ' + mode);

        db.close();
    });

