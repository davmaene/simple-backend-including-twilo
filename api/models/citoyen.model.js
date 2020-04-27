'use strict';
const db = require('./db');

const Citoyen = (citoyen) => {
    this.nom = citoyen.nom;
    this.postnom = citoyen.postnom;
    this.prenom = citoyen.prenom;
    this.age = citoyen.age;
    this.sexe = citoyen.sexe;
    this.contact = citoyen.contact;
    this.adresse = citoyen.adresse;
}

Citoyen.create = (citoyen, result) => {
    let sql = 'INSERT INTO citoyens SET ?';
    let params = [citoyen];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Citoyen.findById = (citoyenId, result) => {
    let sql = 'SELECT * FROM citoyens  WHERE citoyenId = ?';
    db.query(sql, [citoyenId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('citoyen found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}


/** Send simply web message privatly*/

Citoyen.postMessage = (citoyenId, msg, result) => {
    let sql = 'INSERT INTO messages (msg, type, citoyenId) VALUES (?, ?, ?)';
    let type = 'public';
    db.query(sql, [msg, type, citoyenId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Citoyen.remove = (citoyenId, result) => {
    let sql = 'DELETE FROM citoyens WHERE citoyenId = ?';
    db.query(sql, [citoyenId], (err, res) => {
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

Citoyen.getAll = result => {
    let sql = 'SELECT * FROM citoyens';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Citoyen.updateById = (citoyenId, citoyen, result) => {
    let sql = 'UPDATE citoyens SET nom = ?, postnom = ?, prenom = ?, age = ?, sexe = ? WHERE citoyenId = ?';
    let params = [citoyen.nom, citoyen.postnom, citoyen.prenom, citoyenId];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { citoyenId: citoyenId, citoyen });
            }
        }
    });
}



module.exports = Citoyen;