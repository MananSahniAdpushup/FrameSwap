import { regexMatcher } from '../helpers/utils.js';
import { CONSTANTS } from '../helpers/constants.js';

const { 
    USE_STATE,
    STATE_VARIABLE,
    VARIABLE_DATA_TYPE,
    INITIAL_STATE,
    UPDATER_FUNCTION
} = CONSTANTS.STATE_CONVERTER_REGEX

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

function getUpdaterFunction(statementString) {
    return regexMatcher(statementString, UPDATER_FUNCTION, true);
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

function getUpdaterFunctionArgument(statement, updaterFunction) {
    const argumentRegex = new RegExp(`${updaterFunction}\\((.*)\\)`);
    const updaterFunctionArgument = statement.match(argumentRegex);
    return updaterFunctionArgument[0];
}

function getArgument(statement) {
    const argumentRegex = /\((.*)\)/;
    const argument = statement.match(argumentRegex);
    return argument[1];
}

function removeUpdaterFunction(content, useStatements) {
    let result = content;
    useStatements.forEach(statement => {
        const updaterFunction = getUpdaterFunction(statement);
        const stateVariableName = getStateVariable(statement);
        const updaterFunctionArgument = getUpdaterFunctionArgument(content, updaterFunction);
        console.log(updaterFunctionArgument);
        const replacementString = `${stateVariableName} = ${getArgument(updaterFunctionArgument)};`;
        result = result.replace(updaterFunctionArgument, replacementString);
    });
    return result;
}

export {
    convertToSvelteStatements,
    getUseStateStatements,
    getUpdaterFunction,
    removeUpdaterFunction
}