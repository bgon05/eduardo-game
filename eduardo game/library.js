class Library {
    constructor() {
        this.tags = ["jump", "background"];
        // basically the tags array should be associated with the location of the sound within soundLibrary
        // the tags will be in the same order as the soundLibrary by default in order to simplify the system
        this.soundLibrary = [];
    }

    loadFiles() {
        for (let i = 0; i < this.tags.length; i++) { // loop push sounds into array using tags defined in constructor
            this.soundLibrary.push(new Audio("assets/" + this.tags[i] + ".mp3"));
        }
    } 
    getSound(tag) { // returns audio object
        const numID = this.tags.indexOf(tag);
        if (numID != -1) { // this.tags.indexOf will return -1 if there is no tag associated with the name given
            return this.soundLibrary[numID]; // this.soundLibrary should be in same order as this.tags
        }
    }

}