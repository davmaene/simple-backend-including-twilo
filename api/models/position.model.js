'use strict';
const db = require('./db');

const Position = (position) => {
    this.longitude = position.longitude;
    this.latitude = position.latitude;
}
Position.create = (position, result) => {
    let sql = 'INSERT INTO positions SET ?';
    let params = [position];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
Position.removeAll = (result) => {
    let sql = 'DELETE FROM positions';
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, res);
            }
        }
    });
}
Position.getAll = result => {
    let sql = 'SELECT * FROM positions';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = Position;