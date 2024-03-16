import { regexMatcher } from '../helpers/utils.js';
import { CONSTANTS } from '../helpers/constants.js';

const { ON_EVENTS } = CONSTANTS.REACT_EVENTS_CONVERTER;

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

export { 
    modifyReactEvents
}