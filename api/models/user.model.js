'use strict';
const db = require('./db');

const User = (user) => {
    this.username = user.username;
    this.password = user.password;
}


User.create = (user, result) => {
    let sql = 'INSERT INTO users SET ?';
    let params = [user];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

User.findById = (userId, result) => {
    let sql = 'SELECT * FROM users  WHERE userId = ?';
    db.query(sql, [userId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('user found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

User.remove = (userId, result) => {
    let sql = 'DELETE FROM users WHERE userId = ?';
    db.query(sql, [userId], (err, res) => {
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

User.getAll = result => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

User.updateById = (userId, user, result) => {
    let sql = 'UPDATE users SET username = ?, password = ? WHERE userId = ?';
    let params = [user.usernaire];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { userId: userId, user });
            }
        }
    });
}

module.exports = User;