'use strict';
const db = require('./db');

const Hopital = (hopital) => {
    this.nom = hopital.nom;
    this.adresse = hopital.adresse;
}

Hopital.create = (hopital, result) => {
    let sql = 'INSERT INTO hopitaux SET ?';
    let params = [hopital];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Hopital.findById = (hopitalId, result) => {
    let sql = 'SELECT * FROM hopitaux  WHERE hopitalId = ?';
    db.query(sql, [hopitalId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('hopital found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

Hopital.remove = (hopitalId, result) => {
    let sql = 'DELETE FROM hopitaux WHERE hopitalId = ?';
    db.query(sql, [hopitalId], (err, res) => {
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

Hopital.getAll = result => {
    let sql = 'SELECT * FROM hopitaux';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Hopital.updateById = (hopitalId, hopital, result) => {
    let sql = 'UPDATE hopitaux SET nom = ?, postnom = ?, prenom = ? WHERE hopitalId = ?';
    let params = [hopital.nom, hopital.postnom, hopital.prenom, hopitalId];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { hopitalId: hopitalId, hopital });
            }
        }
    });
}

module.exports = Hopital;