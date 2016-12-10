var inquirer = require("inquirer");
var b = require("./basic.js");
var c = require("./clozeDeleted.js");

var handleBasicPromptResponse = function (answers) {
    var flashcard = new b.Basic(answers.front, answers.back);

    console.log(flashcard);
};

var handleClozeDeletedPromptResponse = function (answers) {
    var flashcard = new c.ClozeDeleted(answers.text, answers.cloze);

    console.log(flashcard);
};

var handleError = function () {
    console.log(err);
};

var promptForFlashcard = function () {
    // inquirer.prompt(b.prompts).then(handleBasicPromptResponse, handleError);

    inquirer.prompt(c.prompts).then(handleClozeDeletedPromptResponse, handleError);
};

promptForFlashcard();