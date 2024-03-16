const { regexMatcher } = require('../helpers/utils');
const { 
    REACT_EVENTS_CONVERTER: {
        ON_EVENTS
    } 
} = require('../helpers/constants');

function convertEvent(eventName) {
    return eventName
            .toLowerCase()
            .split(/(on)(.+)/)
            .filter(Boolean) //Similar to filter(elem => elem)
            .join(":");
}

function modifyReactEvents(data) {
    let onEvents = regexMatcher(data, ON_EVENTS);
    let modifiedData = data;
    onEvents.forEach(eventName => {
        let modifiedEvent = convertEvent(eventName);
        modifiedData = modifiedData.replace(eventName, modifiedEvent);
    });
    return modifiedData;
}

module.exports = { 
    modifyReactEvents
}