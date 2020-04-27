'use strict';
const Agent = require('../models/agent.model');
const Hospital = require('../models/hopital.model');
const Medecin = require('../models/medecin.model');

exports.findOne = (req, res) => {
    Agent.findById(req.params.agentId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found agent with id' + req.params.agentId
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving agent with id" + req.params.agentId
                });
            }
        } else {
            res.json(data);
        }
    });
}

exports.findAll = (req, res) => {
    Agent.getAll((err, data) => {
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

exports.sendBroadcast = (req, res) => {
    Agent.sendBulkSms(req.params.agentId, req.body.msg, req.body.contacts, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}

exports.sendPrivateMessage = (req, res) => {
    Agent.sendMessage(req.params.agentId, req.params.medecinId, req.body.msg, (err, data) => {
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
    Agent.postMessage(req.params.agentId, req.body.msg, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}

exports.findPrivateMessages = (req, res) => {
    Agent.getAllPrivate(req.params.agentId, (err, data) => {
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
    Agent.create(req.body, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while added agent"
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
    Agent.updateById(req.params.agentId, req.body, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found agent with id ' + req.params.agentId
                });
            } else {
                res.status(500).json({
                    message: "Error updating agent with id " + req.params.agentId
                });
            }
        } else {
            res.json(data);
        }
    });
}
exports.delete = (req, res) => {
    Agent.remove(req.params.agentId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found agent with id ' + req.params.agentId
                });
            } else {
                res.status(500).json({
                    message: "Could not delete agent with id " + req.params.agentId
                });
            }
        } else {
            res.json({
                message: 'Agent was deleted successfully'
            });
        }
    });
}

exports.findAllHospital = (req, res) => {
    Hospital.getAll((err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while retrieving Hospital"
                });
        } else {
            res.json(data);
        }
    });
}


exports.createHospital = ((req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty"
        });
    }
    Hospital.create(req.body, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err.message + "Some error occurred while added hospital"
                });
        } else {
            res.json(data);
        }
    });
});

exports.findOneHospital = ((req, res) => {
    Hospital.findById(req.params.hopitalId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found hospital with id' + req.params.agentId
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving hospital with id" + req.params.agentId
                });
            }
        } else {
            res.json(data);
        }
    });
});

exports.updateHospital = ((req, res) => {
    Hospital.updateById(req.params.hopitalId, req.body, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found agent with id ' + req.params.agentId
                });
            } else {
                res.status(500).json({
                    message: "Error updating agent with id " + req.params.agentId
                });
            }
        } else {
            res.json(data);
        }
    });
});

exports.deleteHospital = ((req, res) => {
    Hospital.delete(req.params.hopitalId, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found hospital with id ' + req.params.agentId
                });
            } else {
                res.status(500).json({
                    message: "Could not delete hospital with id " + req.params.agentId
                });
            }
        } else {
            res.json({
                message: 'Hospital was deleted successfully'
            });
        }
    });
});

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