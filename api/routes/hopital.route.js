'use strict';
const express = require('express');
const router = express.Router();
const hospital = require('../controllers/hopital.controller');

/* GET find one hospital */
router.route('/:hopitalId')
    .get(hospital.findOne)
    .put(hospital.update)
    .delete(hospital.delete);
/* Add new medecin */
router
    .route('/:hopitalId/medecins')
    .get(hospital.getAllMedecin)
    .post(hospital.addMedecin);

/**Find medecin and modify */
router
    .route('/:hopitalId/medecins/:medecinId')
    .get(hospital.findOneMedecin)
    .put(hospital.updateMedecin)
    .delete(hospital.deleteMedecin);
//Medecin send some message
router.post('/:hopitalId/medecins/:medecinId/messages', hospital.sendPublicMessage);
/** GET retrieve all private messages */
router.get('/:hopitalId/medecins/:medecinId/messages/private/', hospital.findPrivateMessages);
/* POST send privatly message*/
router.post('/:hopitalId/medecins/:medecinId/messages/private/:agentId', hospital.sendPrivateMessage);

module.exports = router;