'use strict';
const express = require('express');
const router = express.Router();
const agent = require('../controllers/agent.controller');
/** GET all agents */
router
    .route('/')
    .get(agent.findAll)
    .post(agent.add);
/** GET agent by id */
router
    .route('/:agentId')
    .get(agent.findOne)
    .put(agent.update)
    .delete(agent.delete);
/* POST send publicly message*/
router.post('/:agentId/messages', agent.sendPublicMessage);
/** GET retrieve all private messages */
router.get('/:agentId/messages/private/', agent.findPrivateMessages);
/* POST send privatly message*/
router.post('/:agentId/messages/private/:medecinId', agent.sendPrivateMessage);
/* POST send BroadCast SMS */
router.post('/:agentId/messages/broadcasts', agent.sendBroadcast);
/* GET All hospital */
router
    .route('/:agentId/hopitaux')
    .get(agent.findAllHospital)
    .post(agent.createHospital);
/* GET find one hospital */
router.route('/:agentId/hopitaux/:hopitalId')
    .get(agent.findOneHospital)
    .put(agent.updateHospital)
    .delete(agent.deleteHospital);
/* Add new medecin */
router
    .route('/:agentId/hopitaux/:hopitalId/medecins')
    .get(agent.getAllMedecin)
    .post(agent.addMedecin);

/**Find medecin and modify */
router
    .route('/:agentId/hopitaux/:hopitalId/medecins/:medecinId')
    .get(agent.findOneMedecin)
    .put(agent.updateMedecin)
    .delete(agent.deleteMedecin);


module.exports = router;