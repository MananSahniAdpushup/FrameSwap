export const CONSTANTS = {
  STATE_CONVERTER_REGEX: {
    USE_STATE: /((let|const|var)\s*\[.*\]\s*=\s*useState\(.*\);?)/g,
    STATE_VARIABLE: /(?<=\[)(\w+)/g,
    VARIABLE_DATA_TYPE: /(let|const|var)(?=\s*\[)/g,
    INITIAL_STATE: /(?<=useState\()(.*)(?=\))/g,
    UPDATER_FUNCTION: /set\S*(?<!])/g,
  },
  REACT_EVENTS_CONVERTER: {
    ON_EVENTS: /(on\w+)(?==)/g,
  },
};
