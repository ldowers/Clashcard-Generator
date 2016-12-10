// Dependency for inquirer npm package
var inquirer = require("inquirer");
var fs = require("fs");

var FlashcardAdmin = function () {

    this.createBasic = function () {
        console.log("Basic");

        inquirer.prompt([
            {
                name: "front",
                message: "What do you want on the front of the flashcard?"
            },
            {
                name: "back",
                message: "What do you want on the back of the flashcard?"
            },
        ]).then(function (answers) {
            console.log("Front: " + answers.front + "\nBack: " + answers.back);
            var newBasic = Basic(answers.front, answers.back);
        });
    };

    this.createClozeDeleted = function () {
        console.log("Cloze-Deleted");
        inquirer.prompt([
            {
                name: "fullText",
                message: "What is the full text for the flashcard?"
            },
            {
                name: "cloze",
                message: "What word or phrase do you want deleted from the flashcard?"
            },
        ]).then(function (answers) {
            console.log("Full Text: " + answers.fullText + "\nCloze: " + answers.cloze);
            var newCloze = Cloze(answers.fullText, answers.cloze);
        });
    };
};
};

module.exports = FlashcardAdmin;