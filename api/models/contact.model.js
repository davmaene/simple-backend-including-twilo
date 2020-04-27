'use strict';
const db = require('./db');

const Contact = (contact) => {
    this.numero = contact.numero;
    this.email = contact.email;
}


Contact.create = (contact, result) => {
    let sql = 'INSERT INTO contacts SET ?';
    let params = [contact];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Contact.findById = (contactId, result) => {
    let sql = 'SELECT * FROM contacts  WHERE contactId = ?';
    db.query(sql, [contactId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('contact found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

Contact.remove = (contactId, result) => {
    let sql = 'DELETE FROM contacts WHERE contactId = ?';
    db.query(sql, [contactId], (err, res) => {
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

Contact.getAll = result => {
    let sql = 'SELECT * FROM contacts';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Contact.updateById = (contactId, contact, result) => {
    let sql = 'UPDATE contacts SET numero = ?, email = ? WHERE contactId = ?';
    let params = [contact.numero, contact.email];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { contactId: contactId, contact });
            }
        }
    });
}

module.exports = Contact;