const config = require('../config/db.config');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});

connection.connect(err => {
    if (err) throw err;
    console.log('Mysql is connected');
});

module.exports = connection;