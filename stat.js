/*here is the histogram code*/
var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database('olympic_history.db');
var mode = process.argv[2];

db.serialize(function() {

    db.all('SELECT * from games', [], function(err, rows) {
        if (!err) {
            console.log(rows.length); // should be 4 at this point.
            rows.forEach(function(row) {
                console.log(row.id);
             });
        }

    });
    db.close();
    console.log('Close the database connection.');
});


