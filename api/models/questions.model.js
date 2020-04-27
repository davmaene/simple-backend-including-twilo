'use strict';
const db = require('./db');

const Question = (question) => {
    this.questionnaire = question.questionnaire;
}


Question.create = (question, result) => {
    let sql = 'INSERT INTO questions SET ?';
    let params = [question];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Question.findById = (questionId, result) => {
    let sql = 'SELECT * FROM questions  WHERE questionId = ?';
    db.query(sql, [questionId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('question found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

Question.remove = (questionId, result) => {
    let sql = 'DELETE FROM questions WHERE questionId = ?';
    db.query(sql, [questionId], (err, res) => {
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

Question.getAll = result => {
    let sql = 'SELECT * FROM questions';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Question.updateById = (questionId, question, result) => {
    let sql = 'UPDATE questions SET questionnaire = ? WHERE questionId = ?';
    let params = [question.questionnaire];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { questionId: questionId, question });
            }
        }
    });
}

module.exports = Question;