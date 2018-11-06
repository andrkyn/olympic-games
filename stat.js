/*here is the histogram code*/

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('olympic_history.db', sqlite3.OPEN_READONLY);

var arr = [[], [], [], []];
var numCol = 0;
var param = [];

param[0] = process.argv[2];
param[1] = process.argv[3];
param[2] = process.argv[4];

var query = '';
var arrNoc = [], numMedal = [], arrSeason = [], arrYear = [];
var strNoc2;
var strYear2;
var fndNoc = 0;
var fndYear = 0;
var endCycle = 0;
var alg = 0;

for (var i = 0; i < process.argv.length; i++) {
    if (!isNaN(param[i])) {
        console.log('это число');
        query = query + 'and year=?';
        alg = 2;
    }

    if ((param[i] == 'summer' || param[i] == 'winter')) {
        param[i] = param[i].replace(/summer/g, "0");
        param[i] = param[i].replace(/winter/g, "1");
        query = query + 'and season=?';
        //alg = 2;
    }

    if ((param[i] == 'gold' || param[i] == 'silver' || param[i] == 'bronze') && (!param[i].match(/^\d+/))) {
        param[i] = param[i].replace(/gold/g, "1");
        param[i] = param[i].replace(/silver/g, "2");
        param[i] = param[i].replace(/bronze/g, "3");
        query = query + 'and medal=?';
        //alg = 2;
    } else {
        console.error('Not parametr');
    }

    var len = 0;
    if (typeof param[i] !== 'undefined') len = param[i].length;
    if ((len == 3) && param[i] !== '') {
        param[i] = param[i].toUpperCase();
        query = query + 'and noc_name=?';
        alg = 1;
    }
}
console.log('alg: ' + alg);
function test(arg1, arg2, arg3, callback) {
    db.serialize(function () {
        db.all(" SELECT * from athletes,teams,results,games WHERE results.game_id=games.id" +
            " and athletes.team_id=teams.id and results.id=athletes.id " + query,
            [arg1, arg2, arg3], function (err, rows,) {
                if (!err) {
                    console.log(rows.length);
                    rows.forEach(function (row) {
                        //console.log(row.game_id);
                        numCol++;
                        var val1, val2, val3, val4;
                        val1 = row.medal;
                        val2 = row.noc_name;
                        val3 = row.year;
                        val4 = row.season;

                        if (val4 == 1) {
                            val4 = "Winter";
                        } else {
                            val4 = "Summer";
                        }

                        if (rows.length == numCol) {
                            endCycle = 1;
                        }
                        callback(val1, val2, val3, val4);
                    });
                }
            });
        db.close();
        console.log('Close the database connection.');
    });
}

/// for medal
if (alg == 1) {
    test(param[0], param[1], param[2], function (a, b, c, d) {
        arr[0] = a;
        arr[1] = b;
        arr[2] = c;
        arr[3] = d;

        var strNoc = arr[2];
        var strSeason = arr[3];
        var kolMedal = arr[0];
        var posNoc = arrNoc.indexOf(strNoc) == -1;


        if (posNoc == true) {
            arrNoc.push(strNoc);
            arrSeason.push(strSeason);
        }

        fndNoc = arrNoc.findIndex(indCity);
        function indCity(element) {
            return element == strNoc;
        }

        if (numMedal[fndNoc] == undefined) {
            numMedal[fndNoc] = 0;
        }

        for (var i = 0; i <= arrNoc.length; i++) {
            if ((kolMedal.valueOf() > 0) && i == arrNoc.length) {
                numMedal[fndNoc] = numMedal[fndNoc] + 1;
            }
        }
        strNoc2 = strNoc;

        if (endCycle == 1) {
            var progre = '';
            var str;
            console.log('------------ Medal--------------');
            console.log('Season  Year');

            for (var i = 0; i <= arrNoc.length - 1; i++) {
                if (numMedal[i] > 0) {
                    for (var j = 0; j < numMedal[i]; j++) {
                        progre = progre + '█|';
                    }
                }
                numMedal[i] = progre;
                progre = '';
                console.log(arrSeason[i] + '  ' + arrNoc[i] + '  ' + numMedal[i]);

            }

        }
    });
}

// for top comand
if (alg == 2) {
    test(param[0], param[1], param[2], function (a, b, c, d) {
        arr[0] = a;
        arr[1] = b;
        arr[2] = c;
        arr[3] = d;

        var strYear = arr[1];
        var strSeason = arr[3];
        var kolMedal = arr[0];
        var posYear = arrYear.indexOf(strYear) == -1;


        if (posYear == true) {
            arrYear.push(strYear);
            arrSeason.push(strSeason);
        }

        fndYear = arrYear.findIndex(indCity);
        function indCity(element) {
            return element == strYear;
        }

        if (numMedal[fndYear] == undefined) {
            numMedal[fndYear] = 0;
        }

        for (var i = 0; i <= arrYear.length; i++) {
            if ((kolMedal.valueOf() > 0) && i == arrYear.length) {
                numMedal[fndYear] = numMedal[fndYear] + 1;
            }
        }
        strYear2 = strYear;

        ///////////////////////////////////////
        if (endCycle == 1) {
            var progre = '';
            var str;
            console.log('------------ Top comand--------------');
            console.log('Season  Year');

            for (var i = 0; i <= arrYear.length - 1; i++) {
                if (numMedal[i] > 0) {
                    for (var j = 0; j < numMedal[i]; j++) {
                        progre = progre + '█|';
                    }
                }
                numMedal[i] = progre;
                progre = '';
                console.log(arrSeason[i] + '  ' + arrYear[i] + '  ' + numMedal[i]);

            }

        }
    });
}

//console.log(process.argv.length);
