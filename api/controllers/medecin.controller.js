'use strict';
const Medecin = require('../models/medecin.model');

exports.findOne = (req, res) => {
    Medecin.findById(req.params.medecinId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found medecin with id' + req.params.medecinId
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving medecin with id" + req.params.medecinId
                });
            }
        } else {
            res.json(data);
        }
    });
}

exports.findAll = (req, res) => {
    Medecin.getAll((err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while retrieving medecins"
                });
        } else {
            res.json(data);
        }
    });
}

exports.sendPrivateMessage = (req, res) => {
    Medecin.sendMessage(req.params.agentId, req.params.medecinId, req.body.msg, (err, data) => {
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
    Medecin.postMessage(req.params.medecinId, req.body.msg, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}

exports.findPrivateMessages = (req, res) => {
    Medecin.getAllPrivate(req.params.medecinId, (err, data) => {
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



exports.add = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty"
        });
    }
    Medecin.create(req.body, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while added medecin"
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
    Medecin.updateById(req.params.medecinId, req.body, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found medecin with id ' + req.params.medecinId
                });
            } else {
                res.status(500).json({
                    message: "Error updating medecin with id " + req.params.medecinId
                });
            }
        } else {
            res.json(data);
        }
    });
}

exports.delete = (req, res) => {
    Medecin.remove(req.params.medecinId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found medecin with id ' + req.params.medecinId
                });
            } else {
                res.status(500).json({
                    message: "Could not delete medecin with id " + req.params.medecinId
                });
            }
        } else {
            res.json({
                message: 'medecin was deleted successfully'
            });
        }
    });
}