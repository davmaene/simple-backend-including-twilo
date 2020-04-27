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

exports.delete = (req, res) => {
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

exports.getAllMedecin = ((req, res) => {
    Medecin.getAll(req.params.hopitalId, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while retrieving medecins"
                });
        } else {
            res.json(data);
        }
    });
});

exports.addMedecin = ((req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty"
        });
    }
    Medecin.create(req.body, req.params.hopitalId, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while added medecin"
                });
        } else {
            res.json(data);
        }
    });
});

exports.findOneMedecin = ((req, res) => {
    Medecin.findById(req.params.medecinId, req.params.hopitalId, (err, data) => {
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
});

exports.updateMedecin = ((req, res) => {
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

});

exports.deleteMedecin = ((req, res) => {
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
});

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