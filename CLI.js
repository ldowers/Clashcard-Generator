'use strict';
// NPM packages
var inquirer = require("inquirer");
var fs = require("fs");

// Constructors
function BasicFlashcard(front, back) {
    this.front = front;
    this.back = back;
};

BasicFlashcard.prototype.printFront = function () {
    console.log("Front: " + this.front);
};

BasicFlashcard.prototype.printBack = function () {
    console.log("Back: " + this.back);
};

function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
};

ClozeFlashcard.prototype.printFront = function () {
    var index = this.text.indexOf(this.cloze);
    if (index >= 0) {
        console.log("Front: " + this.text.replace(this.cloze, "\[...\]"));
    }
    else {
        console.log("Word or phrase not found.");
    }
};

ClozeFlashcard.prototype.printBack = function () {
    console.log("Back: " + this.text);
};

// Functions
var handleBasicFlashcardResponse = function (answers) {
    // console.log(JSON.stringify(answers, null, '  '));

    var flashcard = new BasicFlashcard(answers.front, answers.back);
    // flashcard.printFront();
    // flashcard.printBack();

    var flashcardString = JSON.stringify(flashcard);

    fs.appendFileSync("basic.txt", flashcardString + "\n");

    console.log("Flashcard saved to basic.txt.");
};

var handleClozeDeletedFlashcardResponse = function (answers) {
    // console.log(JSON.stringify(answers, null, '  '));

    var flashcard = new ClozeFlashcard(answers.text, answers.cloze);
    // flashcard.printFront();
    // flashcard.printBack();

    var flashcardString = JSON.stringify(flashcard);

    fs.appendFileSync("cloze.txt", flashcardString + "\n");

    console.log("Flashcard saved to cloze.txt.");
};

var handleError = function (error) {
    console.log(error);
};

var displayBasicFlashcard = function (output, counter, showFront) {
    if (counter < output.length - 1) {
        var flashcard = JSON.parse(output[counter]);
        var basicFlashcard = new BasicFlashcard(flashcard.front, flashcard.back);

        if (showFront) {
            showFront = false;
            basicFlashcard.printFront();
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'response',
                    message: 'Show answer?',
                    default: true
                }
            ]).then(function (answers) {
                if (answers.response) {
                    displayBasicFlashcard(output, counter, showFront);
                }
            }, handleError);
        }
        else {
            showFront = true;
            basicFlashcard.printBack();
            console.log();
            counter++;
            displayBasicFlashcard(output, counter, showFront);
        }
    }
};

var displayClozeFlashcard = function (output, counter, showFront) {
    if (counter < output.length - 1) {
        var flashcard = JSON.parse(output[counter]);
        var clozeFlashcard = new ClozeFlashcard(flashcard.text, flashcard.cloze);
        
        if (showFront) {
            showFront = false;
            clozeFlashcard.printFront();
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'response',
                    message: 'Show answer?',
                    default: true
                }
            ]).then(function (answers) {
                if (answers.response) {
                    displayClozeFlashcard(output, counter, showFront);
                }
            }, handleError);
        }
        else {
            showFront = true;
            clozeFlashcard.printBack();
            console.log();
            counter++;
            displayClozeFlashcard(output, counter, showFront);
        }
    }
};

var handlePromptResponse = function (answers) {
    // console.log(JSON.stringify(answers, null, '  '));

    // Make a new flashcard
    if (answers.option == "Make a new flashcard") {
        if (answers.type == "Basic") {

            // Prompt for front and back of basic flashcard
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'front',
                    message: 'Front of flashcard?'
                },
                {
                    type: 'input',
                    name: 'back',
                    message: 'Back of flashcard?'
                }
            ]).then(handleBasicFlashcardResponse, handleError);
        } else if (answers.type == "Cloze-Deleted") {

            // Prompt for text and cloze of cloze-deleted flashcard
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'text',
                    message: 'Text for flashcard?'
                },
                {
                    type: 'input',
                    name: 'cloze',
                    message: 'Word or phrase to delete from flashcard?'
                }
            ]).then(handleClozeDeletedFlashcardResponse, handleError);
        } else {
            console.log("Not a valid type!");
        }

        // Use existing flashcards
    } else if (answers.option == "Use existing flashcards") {
        if (answers.type == "Basic") {
            fs.readFile("basic.txt", "utf8", function (err, data) {
                if (err) {
                    console.log("No basic flashcards found!");
                }
                else {
                    var output = data.split("\n");
                    var counter = 0;
                    var showFront = true;

                    displayBasicFlashcard(output, counter, showFront);
                }
            });
        } else if (answers.type == "Cloze-Deleted") {
            fs.readFile("cloze.txt", "utf8", function (err, data) {
                if (err) {
                    console.log("No cloze-deleted flashcards found!");
                }
                else {
                    var output = data.split("\n");
                    var counter = 0;
                    var showFront = true;

                    displayClozeFlashcard(output, counter, showFront);
                }
            });
        } else {
            console.log("Not a valid type!");
        }
    } else {
        console.log("Not a valid option!");
    }
};

var askPrompt = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            choices: [
                'Make a new flashcard',
                'Use existing flashcards'
            ]
        },
        {
            type: 'list',
            name: 'type',
            message: 'What type of flashcard?',
            choices: ['Basic', 'Cloze-Deleted']
        }
    ]).then(handlePromptResponse, handleError);
};

askPrompt();