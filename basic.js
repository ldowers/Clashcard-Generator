function BasicFlashcard(front, back) {
    this.front = front;
    this.back = back;
};

Basic.prototype.displayFlashcard = function () {
    Console.log("Front: " + this.front);
    Console.log("Back: " + this.back);
};

var prompts = [{
    name: "front",
    message: "Front of flashcard?"
},
{
    name: "back",
    message: "Back of flashcard?"
}];

module.exports = { Basic: Basic, prompts: prompts };