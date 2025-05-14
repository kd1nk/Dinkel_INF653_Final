const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const verifyStates = require('../../middleware/verifyStates');

router.route('/')
    .get(statesController.getAllStates)
    .post(statesController.createNewState)
    .put(statesController.updateState)
    .delete(statesController.deleteState);


router.route('/:code')
    .get(verifyStates, statesController.getState)
    .put(verifyStates, statesController.updateState)
    .delete(verifyStates, statesController.deleteState);

router.route('/:code/funfact')
    .get(verifyStates, statesController.getFunFact)
    .post(verifyStates, statesController.postFunFact)
    .patch(verifyStates, statesController.patchFunFact)
    .delete(verifyStates, statesController.deleteFunFact);

router.route('/:code/capital')
    .get(verifyStates, statesController.getCapital);

router.route('/:code/nickname')
    .get(verifyStates, statesController.getNickname);

router.route('/:code/population')
    .get(verifyStates, statesController.getPopulation);

router.route('/:code/admission')
    .get(verifyStates, statesController.getAdmission);

module.exports = router;