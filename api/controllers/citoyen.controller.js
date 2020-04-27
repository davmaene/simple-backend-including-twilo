'use strict';
const Citoyen = require('../models/citoyen.model');

exports.findOne = (req, res) => {
    Citoyen.findById(req.params.citoyenId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found citoyen with id' + req.params.citoyenId
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving citoyen with id" + req.params.citoyenId
                });
            }
        } else {
            res.json(data);
        }
    });
}

exports.findAll = (req, res) => {
    Citoyen.getAll((err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while retrieving citoyens"
                });
        } else {
            res.json(data);
        }
    });
}

exports.sendPrivateMessage = (req, res) => {
    Citoyen.sendMessage(req.params.agentId, req.params.citoyenId, req.body.msg, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while retrieving private messages"
                });
        } else {
            res.json(data);
        }
    });
}

exports.sendPublicMessage = (req, res) => {
    Citoyen.postMessage(req.params.citoyenId, req.body.msg, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}

exports.add = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty"
        });
    }
    Citoyen.create(req.body, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while added citoyen"
                });
        } else {
            res.json(data);
        }
    });
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty"
        });
    }
    Citoyen.updateById(req.params.citoyenId, req.body, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found citoyen with id ' + req.params.citoyenId
                });
            } else {
                res.status(500).json({
                    message: "Error updating citoyen with id " + req.params.citoyenId
                });
            }
        } else {
            res.json(data);
        }
    });
}

exports.delete = (req, res) => {
    Citoyen.remove(req.params.citoyenId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found citoyen with id ' + req.params.citoyenId
                });
            } else {
                res.status(500).json({
                    message: "Could not delete citoyen with id " + req.params.citoyenId
                });
            }
        } else {
            res.json({
                message: 'citoyen was deleted successfully'
            });
        }
    });
}