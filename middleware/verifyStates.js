const statesData = require('../model/statesData.json');

const stateCodes = statesData.map(state => state.code);

const verifyStates = (req, res, next) => {
    const stateParam = req.params.code;

    if(!stateParam){
        return res.status(400).json({'message': 'State parameter is required.'});
    }

    const upperState = stateParam.toUpperCase();

    if(!stateCodes.includes(upperState)){
        return res.status(400).json({'message': 'Invalid state abbreviation parameter'});
    }

    req.code = upperState;
    next();
};

module.exports = verifyStates;