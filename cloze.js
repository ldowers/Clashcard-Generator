function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
};

ClozeDeleted.prototype.displayFlashcard = function () {
    Console.log("Text: " + this.text);
    Console.log("Cloze: " + this.cloze);
};

var prompts = [{
    name: "text",
    message: "Text of flashcard?"
},
{
    name: "cloze",
    message: "Cloze of flashcard?"
}];

module.exports = { ClozeDeleted: ClozeDeleted, prompts: prompts };