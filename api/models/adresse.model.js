'use strict';
const db = require('./db');

const Adresse = (adresse) => {
    this.province = adresse.province;
    this.ville = adresse.ville;
    this.commune = adresse.commune;
    this.quartier = adresse.quartier;
    this.avenue = adresse.avenue;
    this.numero = adresse.numero;
}


Adresse.create = (adresse, result) => {
    let sql = 'INSERT INTO adresses SET ?';
    let params = [adresse];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Adresse.findById = (adresseId, result) => {
    let sql = 'SELECT * FROM adresses  WHERE adresseId = ?';
    db.query(sql, [adresseId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('adresse found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

Adresse.remove = (adresseId, result) => {
    let sql = 'DELETE FROM adresses WHERE adresseId = ?';
    db.query(sql, [adresseId], (err, res) => {
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

Adresse.getAll = result => {
    let sql = 'SELECT * FROM adresses';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Adresse.updateById = (adresseId, adresse, result) => {
    let sql = 'UPDATE adresses SET province = ?, ville = ?, commune = ?, quartier = ?, avenue = ?, numero = ? WHERE adresseId = ?';
    let params = [adresse.province, adresse.ville, adresse.commune, adresse.quartier, adresse.avenue, adresse.numero, adresseId];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { adresseId: adresseId, adresse });
            }
        }
    });
}

module.exports = Adresse;