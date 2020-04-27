'use strict';
const db = require('./db');
const twilio = require('./send.sms');
const config = require('../config/twilio.config');

const Agent = (agent) => {
    this.nom = agent.nom;
    this.postnom = agent.postnom;
    this.prenom = agent.prenom;
    this.contact = agent.contact;
    this.adresse = agent.adresse;
}

/* Create new agent of ministrie */
Agent.create = (agent, result) => {
    let sql = 'INSERT INTO agents SET ?';
    let params = [agent];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

/** Retreive agent with id */
Agent.findById = (agentId, result) => {
    let sql = 'SELECT * FROM agents  WHERE agentId = ?';
    db.query(sql, [agentId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('Agent found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}


Agent.getAllPrivate = (agentId, result) => {
    let sql = "SELECT * FROM messages WHERE type = 'private' AND agentId = ?";
    db.query(sql, [agentId], (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}


/** Send bulk sms to all contacts */
// Agent.sendBulkSms = (agentId, msg, contacts, result) => {
//         const sql = 'INSERT INTO messages (msg, type, agentId) VALUES (?, ?, ?)';
//         const type = 'sms';
//         const service = twilio.notify.services(config.TWILIO_NOTIFY_SERVICE_SID);
//         const bindings = contacts.map(number => {
//             return JSON.stringify({ binding_type: type, address: number });
//         });
//         service.notifications
//             .create({
//                 toBinding: bindings,
//                 body: msg
//             })
//             .then((notification) => {
//                 console.log(notification);
//                 db.query(sql, [msg, type, agentId], (err, res) => {
//                     if (err) {
//                         result(err, null);
//                     } else {
//                         result(null, res);
//                     }
//                 });
//             })
//             .catch(err => console.error(err));
//     }
    /** Send simply web message privatly*/
Agent.sendMessage = (agentId, medecinId, msg, result) => {
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

/** Post message on the public chat */

Agent.postMessage = (agentId, msg, result) => {
    let sql = 'INSERT INTO messages (msg, type, agentId) VALUES (?, ?, ?)';
    let type = 'public';
    db.query(sql, [msg, type, agentId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Agent.remove = (agentId, result) => {
        let sql = 'DELETE FROM agents WHERE agentId = ?';
        db.query(sql, [agentId], (err, res) => {
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
    /* Define the sql query to retrieve all agents in database */
Agent.getAll = result => {
    let sql = 'SELECT * FROM agents';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Agent.updateById = (agentId, agent, result) => {
    let sql = 'UPDATE agents SET nom = ?, postnom = ?, prenom = ? WHERE agentId = ?';
    let params = [agent.nom, agent.postnom, agent.prenom, agentId];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { agentId: agentId, agent });
            }
        }
    });
}


module.exports = Agent;