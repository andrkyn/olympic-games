var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./olympic_history.db');

var check;
db.serialize(() =>{

    db.each('SELECT * FROM athletes', function (row) {
    console.log(row);

});
});

db.close();
