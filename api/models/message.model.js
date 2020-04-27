'use strict';
const db = require('./db');

const Message = (message) => {
    this.msg = message.msg;
    this.type = message.type;
}


Message.create = (message, result) => {
    let sql = 'INSERT INTO messages SET ?';
    let params = [message];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Message.findById = (messageId, result) => {
    let sql = 'SELECT * FROM messages  WHERE messageId = ?';
    db.query(sql, [messageId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('message found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

Message.remove = (messageId, result) => {
    let sql = 'DELETE FROM messages WHERE messageId = ?';
    db.query(sql, [messageId], (err, res) => {
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

Message.getAll = result => {
    let sql = 'SELECT * FROM messages';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Message.updateById = (messageId, message, result) => {
    let sql = 'UPDATE messages SET msg = ? WHERE messageId = ?';
    let params = [message.numero, message.email];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { messageId: messageId, message });
            }
        }
    });
}

module.exports = Message;