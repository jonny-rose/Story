const mysql = require('mysql');

function connection(cb) {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
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
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
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

function findUserByEmailAndPassword(email, password) {
    return new Promise((resolve, reject)=> {
        connection(function(con) {
            let sql = `SELECT * FROM users WHERE email = ? AND password = ?`
                
            con.query(sql, [email, password], function (error, results, fields) {
                if (error) {
                    reject(error)
                }
                console.log(`Finding users in db with email ${email} and password ${password}`);

                resolve(results)
            });
    
            con.end();
        });
    })
}

function userSignup({firstName, lastName, gender, age, email, password}) {
    return new Promise((resolve, reject)=> {
        connection(function(con) {
            let sql = `Insert into users (firstname, lastname, gender, age, email, password) values (?, ?, ?, ?, ?, ?)`
                
            con.query(sql, [firstName, lastName, gender, age, email, password], function (error, results, fields) {
                if (error) {
                    reject(error)
                }
                console.log(`Finding users in db with email ${email} and password ${password}`);

                resolve(results)
            });
    
            con.end();
        });
    })
}

module.exports = {
    userTable : userTable,
    findUserByEmailAndPassword,
    userSignup
}






 
