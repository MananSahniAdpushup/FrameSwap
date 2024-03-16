const { regexMatcher } = require('../helpers/utils');
const { 
    STATE_CONVERTER_REGEX: {
        USE_STATE,
        STATE_VARIABLE,
        VARIABLE_DATA_TYPE,
        INITIAL_STATE
    }
} = require('../helpers/constants');

function getUseStateStatements(data) {
    return regexMatcher(data, USE_STATE);
}

function getStateVariable(statementString) {
    return regexMatcher(statementString, STATE_VARIABLE, true);
}

function getVariableDataType(statementString) {
    return regexMatcher(statementString, VARIABLE_DATA_TYPE, true);
}

function getInitialState(statementString) {
    return regexMatcher(statementString, INITIAL_STATE, true);
}

function convertToSvelteStatements(data) {
    let useStatements = getUseStateStatements(data);
    return useStatements.map(statement => {
        let variableDataType = getVariableDataType(statement);
        let stateVariable = getStateVariable(statement);
        let initialState = getInitialState(statement);
        return `${variableDataType} ${stateVariable} = ${initialState};`;
    });
}

module.exports = {
    convertToSvelteStatements
}