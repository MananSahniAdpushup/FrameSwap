#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";

import { modifyReactEvents } from "./converters/eventConverter.js";
import {
  getReactComponentContent,
  getReactComponentName,
  empty2Div,
  getScriptTagWithJsPart,
  removeReturnAndJs,
} from "./helpers/utils.js";
import {
  convertToSvelteStatements,
  getUseStateStatements,
  removeUpdaterFunction,
} from "./converters/stateConverter.js";

console.log(chalk.white.bold("Welcome to FrameSwap"));
console.log(
  chalk.white("\nConvert components from one framework to another!\n")
);

const initialAvailableFrameworks = ["React", "Svelte"];

// const { frameworkToConvertFrom } = await inquirer.prompt({
//     name: 'frameworkToConvertFrom',
//     type: 'list',
//     message: 'Choose the framework to convert the code from:',
//     choices: initialAvailableFrameworks
// });

// const availableFrameworksToConvertTo = initialAvailableFrameworks.filter(framework => framework !== frameworkToConvertFrom);

// const { frameworkToConvertTo } = await inquirer.prompt({
//     name: 'frameworkToConvertTo',
//     type: 'list',
//     message: 'Choose the framework to convert the code to:',
//     choices: availableFrameworksToConvertTo
// });

// const { codeReadPath } = await inquirer.prompt({
//     name: 'codeReadPath',
//     type: 'input',
//     message: `Enter the path for ${frameworkToConvertFrom} component:`
// });

const codeReadPath = "components/StateComponent.jsx";

const currentReadPath = path.join(process.cwd(), codeReadPath);
const componentFileName = currentReadPath.split("/").pop().replace(".jsx", "");

const stateData = fs.readFileSync(currentReadPath, "utf8");

const modifiedEventsData = modifyReactEvents(stateData);

const componentName = getReactComponentName(modifiedEventsData);
const componentContent = getReactComponentContent(
  modifiedEventsData,
  componentName
);
const contentWithConventionalTags = empty2Div(componentContent);
let fullContent =
  getScriptTagWithJsPart(contentWithConventionalTags) +
  removeReturnAndJs(contentWithConventionalTags);
// console.log(removeReturn(contentWithConventionalTags));

const useStatements = getUseStateStatements(fullContent);
const convertedStatement = convertToSvelteStatements(fullContent);

useStatements.forEach((statement, index) => {
  fullContent = fullContent.replace(statement, convertedStatement[index]);
});

fullContent = removeUpdaterFunction(fullContent, useStatements);

fs.writeFileSync(
  `convertedCode/${componentFileName}.svelte`,
  fullContent,
  "utf8"
);
