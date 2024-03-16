function regexMatcher(stringToWorkWith, regex, stringOnly = false) {
  if (stringOnly) {
    return stringToWorkWith.match(regex)[0];
  }
  return stringToWorkWith.match(regex);
}

function removeEOL(str) {
  return str.replace(/\n/g, "");
}

function getReactComponentName(fileContent) {
  const matchResults = fileContent.match(/export default\s(\w+)/);
  return matchResults[1];
}

function getReactComponentContent(data, functionName) {
  const regex = new RegExp(
    `function\\s+${functionName}\\s*\\(([^)]*)\\)\\s*{([\\s\\S]*)}`
  );
  const matchResults = data.match(regex);
  return matchResults[2];
}

function empty2Div(data) {
  return data.replaceAll(/<>/g, "<div>").replaceAll(/<\/>/g, "</div>");
}

function removeReturnAndJs(data) {
  const returnRemoved = data.replaceAll(/([\s\S]*)return/g, "").trim();
  const parenthesisRemoved = returnRemoved
    .replaceAll(/^\(/g, "")
    .replaceAll(/\);$/g, "");
  return parenthesisRemoved;
}

function getJsPart(data) {
  const jsPart = data.match(/([\s\S]*)return/g)[0].replace(/return$/g, "");
  return jsPart;
}

function getScriptTagWithJsPart(content) {
  const jsPart = getJsPart(content);
  return `<script>${jsPart}</script>`;
}

export {
  regexMatcher,
  removeEOL,
  getReactComponentName,
  getReactComponentContent,
  empty2Div,
  removeReturnAndJs,
  getJsPart,
  getScriptTagWithJsPart,
};
