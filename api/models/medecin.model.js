'use strict';
const db = require('./db');

const Medecin = (medecin) => {
    this.nom = medecin.nom;
    this.postnom = medecin.postnom;
    this.prenom = medecin.prenom;
    this.contact = medecin.contact;
    this.adresse = medecin.adresse;
}

Medecin.create = (medecin, hopitalId, result) => {
    let sql = 'INSERT INTO medecins (nom, postnom, prenom, hopitalId) VALUES (?, ?, ?, ?)';
    let params = [medecin.nom, medecin.postnom, medecin.prenom, hopitalId];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Medecin.findById = (medecinId, hopitalId, result) => {
    let sql = 'SELECT * FROM medecins  WHERE medecinId = ? AND hopitalId = ?';
    db.query(sql, [medecinId, hopitalId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('Medecin found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

Medecin.getAllPrivate = (medecinId, result) => {
    let sql = "SELECT * FROM messages WHERE type = 'private' AND medecinId = ?";
    db.query(sql, [medecinId], (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

/** Send simply web message privatly*/
Medecin.sendMessage = (agentId, medecinId, msg, result) => {
    let sql = 'INSERT INTO messages (msg, type, agentId, medecinId) VALUES (?, ?, ?, ?)';
    let type = 'private';
    db.query(sql, [msg, type, agentId, medecinId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Medecin.postMessage = (medecinId, msg, result) => {
    let sql = 'INSERT INTO messages (msg, type, medecinId) VALUES (?, ?, ?)';
    let type = 'public';
    db.query(sql, [msg, type, medecinId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Medecin.remove = (medecinId, result) => {
    let sql = 'DELETE FROM medecins WHERE medecinId = ?';
    db.query(sql, [medecinId], (err, res) => {
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

Medecin.getAll = (hopitalId, result) => {
    let sql = 'SELECT * FROM medecins WHERE hopitalId = ?';
    db.query(sql, [hopitalId], (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Medecin.updateById = (medecinId, medecin, result) => {
    let sql = 'UPDATE medecins SET nom = ?, postnom = ?, prenom = ? WHERE medecinId = ?';
    let params = [medecin.nom, medecin.postnom, medecin.prenom, medecinId];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { medecinId: medecinId, medecin });
            }
        }
    });
}

module.exports = Medecin;