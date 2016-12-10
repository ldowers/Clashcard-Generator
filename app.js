
// constructor for creating basic flashcards
function Basic(front, back) {
    this.front = front;
    this.back = back;
};

Basic.prototype.printinfo = function() {
    console.log("Front: " + this.front + "\nBack: " + this.back);
};

// constructor for creating cloze-deleted flashcards
function ClozeDeleted(fullText, cloze) {
    this.fullText = fullText;
    this.cloze = cloze;
    this.getPartial = function (this.fullText, this.cloze) {

    };
};

ClozeDeleted.prototype.printinfo = function() {
    console.log("Full Text: " + this.fullText + "\nCloze Text: " + this.cloze + "\nCloze-Deleted Text: " + this.partialText);
};

module.exports = Basic;
module.exports = ClozeDeleted;