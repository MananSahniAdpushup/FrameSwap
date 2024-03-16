const fs = require('fs');
const { modifyReactEvents } = require('./converters/eventConverter');
const { convertToSvelteStatements } = require('./converters/stateConverter');

const stateData = fs.readFileSync('./components/StateComponent.jsx', 'utf8');

const modifiedEventsData = modifyReactEvents(stateData);
const svelteStatements = convertToSvelteStatements(stateData);

console.log(modifiedEventsData);
console.log(svelteStatements);