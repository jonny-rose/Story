const mysql = require('mysql');

function connection(cb) {
    const connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'workout-database',
        port: 3306
    })

    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        cb(connection);
    })
}

function userTable() {
    connection(function(con) {
        let sql = `CREATE TABLE IF NOT EXISTS users (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            firstname VARCHAR(30) NOT NULL,
            lastname VARCHAR(30) NOT NULL,
            gender VARCHAR(1) DEFAULT 'M' NOT NULL,
            age INT(2) NOT NULL,
            weight INT(3) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            passward VARCHAR(50) NOT NULL,
            updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            )`
            
        con.query(sql , function (error, results, fields) {
            if (error) throw error;
            console.log('User database created');
        });

        con.end();
    });
}

module.exports = {
    userTable : userTable
}



// localhost = 127.0.0.1
// port = 3306


 
