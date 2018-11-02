/*here is the histogram code*/

var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database('olympic_history.db', sqlite3.OPEN_READONLY);
var mode = process.argv[2];

    var arr = [[],[],[],[]];
    var numCol =0;
    var colRow =0;

    db.serialize(function () {
        db.all('SELECT * from results', [], function (err, rows) {
            if (!err) {
                console.log(rows.length); // should be 4 at this point.
                rows.forEach(function (row) {
                    //console.log(row.game_id);
                    numCol++;
                    //console.log(row.id);
                    arr[0][row.id] = row.game_id;
                    arr[1][row.id] = row.medal;

                    // console.log('end');
                    // console.log(numCol + ' |game_id --- ' + arr[0][numCol] + ' |medal_id--- ' + arr[1][numCol] +
                    //     ' |NOC ' + arr[2][numCol]);
                });
            }

        });
        db.close();

        // console.log('end');
        // console.log(numCol + ' |game_id --- ' + arr[0][1] + ' |medal_id--- ' + arr[1][1] +
        //     ' |NOC ' + arr[2][1]);

        console.log(numCol + ' |game_id --- ' + arr[0][numCol] + ' |medal_id--- ' + arr[1][numCol] +
            ' |NOC ' + arr[2][numCol]);

        console.log('Close the database connection.');
    });

