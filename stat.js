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
var numMedal = [], arrSeason = [], arrParam = [];
var strParam2;
var fndParam = 0;
var endCycle = 0;
var alg = 0;

for (var j = 0; j < process.argv.length; j++) {
    if (param[j] == 3 && isNaN(param[j])) {
        alg = 1;
    } else {
        alg = 2;
    }
}

for (var i = 0; i < process.argv.length; i++) {


    if (!isNaN(param[i])) {
        query = query + 'and year=?';
    }

    if ((param[i] == 'summer' || param[i] == 'winter')) {
        param[i] = param[i].replace(/summer/g, "0");
        param[i] = param[i].replace(/winter/g, "1");
        query = query + 'and season=?';

    }/*else{
     console.log('\x1b[36m', 'not found in database');
     }*/

    if ((param[i] == 'gold' || param[i] == 'silver' || param[i] == 'bronze') && (!param[i].match(/^\d+/))) {
        param[i] = param[i].replace(/gold/g, "1");
        param[i] = param[i].replace(/silver/g, "2");
        param[i] = param[i].replace(/bronze/g, "3");
        query = query + 'and medal=?';

    }/*else{
        console.log('\x1b[36m', 'not found in database');
    }*/

    var len = 0;
    if (typeof param[i] !== 'undefined') len = param[i].length;

    if ((len == 3) && param[i] !== '') {
        param[i] = param[i].toUpperCase();
        query = query + 'and noc_name=?';
        alg = 1;
    }
}

function test(arg1, arg2, arg3, callback) {
    db.serialize(function () {
        db.all(" SELECT * from athletes,teams,results,games WHERE results.game_id=games.id" +
            " and athletes.team_id=teams.id and results.id=athletes.id " + query,
            [arg1, arg2, arg3], function (err, rows) {
                if (!err) {
                    //console.log(rows.length);
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
        //console.log('Close the database connection.');
    });
}

// for top comand and medal
test(param[0], param[1], param[2], function (a, b, c, d) {
    arr[0] = a;
    arr[1] = b;
    arr[2] = c;
    arr[3] = d;

    if (alg == 1) {
        var strParam = arr[2];
    }
    if (alg == 2) {
        var strParam = arr[1];
    }

    var strSeason = arr[3];
    var kolMedal = arr[0];
    var posParam = arrParam.indexOf(strParam) == -1;

    if (posParam == true) {
        arrParam.push(strParam);
        arrSeason.push(strSeason);
    }

    fndParam = arrParam.findIndex(indCity);
    function indCity(element) {
        return element == strParam;
    }

    if (numMedal[fndParam] == undefined) {
        numMedal[fndParam] = 0;
    }

    for (var i = 0; i <= arrParam.length; i++) {
        if ((kolMedal.valueOf() > 0) && i == arrParam.length) {
            numMedal[fndParam] = numMedal[fndParam] + 1;
        }
    }
    strParam2 = strParam;

    if (endCycle == 1) {

        var progress = '';
        var str;

        if (alg == 1) {
            console.log('------------ Medal--------------');
            console.log('>Season<  >Year<');
        }
        if (alg == 2) {
            console.log('------------ Top comand--------------');
            console.log('>Season<  >Comand<');
        }

        for (var i = 0; i <= arrParam.length - 1; i++) {
            if (numMedal[i] > 0) {
                for (var j = 0; j < numMedal[i]; j++) {
                    progress = progress + '█';
                }
            }
            numMedal[i] = progress;
            progress = '';
            //console.log(' ' + arrSeason[i] + '    ' + arrParam[i] + '  ' + numMedal[i]);
        }

        function threeArray(rows, columns) { // a new array fill
            var arr = new Array();
            for (var i = 0; i < rows; i++) {
                arr[i] = new Array();
                for (var j = 0; j < columns; j++) {
                    arr[i][0] = arrSeason[i];
                    arr[i][1] = arrParam[i];
                    arr[i][2] = numMedal[i];
                }
            }
            return arr;
        }
    }
});
