'use strict';
const db = require('./db');

const Cas = (cas) => {
    this.etat = cas.etat;
}

Cas.create = (cas, result) => {
    let sql = 'INSERT INTO cas SET ?';
    let params = [cas];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Cas.findById = (casId, result) => {
    let sql = 'SELECT * FROM cas WHERE casId = ?';
    db.query(sql, [casId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('cas found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

Cas.remove = (casId, result) => {
    let sql = 'DELETE FROM cas WHERE casId = ?';
    db.query(sql, [casId], (err, res) => {
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

Cas.getAll = result => {
    let sql = 'SELECT * FROM cas';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Cas.updateById = (casId, cas, result) => {
    let sql = 'UPDATE cas SET etat = ? WHERE casId = ?';
    let params = [cas.etat];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { casId: casId, cas });
            }
        }
    });
}

module.exports = Cas;