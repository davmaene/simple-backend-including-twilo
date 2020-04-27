'use strict';
const Hopital = require('../models/hopital.model');

exports.findAll = (req, res) => {
    Hopital.getAll((err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while retrieving agents"
                });
        } else {
            res.json(data);
        }
    });
}
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty"
        });
    }
    Hopital.create(req.body, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while added hopital"
                });
        } else {
            res.json(data);
        }
    });
}

exports.findOne = (req, res) => {
    Hopital.findById(hopitalId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found agent with id' + req.params.hopitalId
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving agent with id" + req.params.hopitalId
                });
            }
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
    Hopital.updateById(req.params.hopitalId, req.body, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found agent with id ' + req.params.hopitalId
                });
            } else {
                res.status(500).json({
                    message: "Error updating agent with id " + req.params.hopitalId
                });
            }
        } else {
            res.json(data);
        }
    });
}

exports.deleteHospital = (req, res) => {
    Hopital.remove(req.params.hopitalId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found hospital with id ' + req.params.hopitalId
                });
            } else {
                res.status(500).json({
                    message: "Could not delete hostpital with id " + req.params.hopitalId
                });
            }
        } else {
            res.json({
                message: 'Hospital was deleted successfully'
            });
        }
    });
}