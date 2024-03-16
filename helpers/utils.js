function regexMatcher(stringToWorkWith, regex, stringOnly = false) {
    if(stringOnly) {
        return stringToWorkWith.match(regex)[0];
    }
    return stringToWorkWith.match(regex);
}

export {
    regexMatcher
}