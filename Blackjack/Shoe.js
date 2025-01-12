class Shoe {
    constructor(amountOfDecksPassed) {
        this.shoe = [];
        
        this.decks = amountOfDecksPassed;

        const suites = ["Spades", "Hearts", "Clubs", "Diamonds"];
        const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

        for (let suite of suites) {
            for (let numValue of values) {
                for (let cardAmount = 0; cardAmount < this.decks; cardAmount++) {
                    let card = new Card(numValue, suite, `Images/${numValue}Of${suite}.png`);
                    this.shoe.push(card);
                }
            }
        }
    }

    drawCard() {
        const drawIndex = Math.floor(Math.random() * this.shoe.length);
        const card = this.shoe[drawIndex];

        this.removeCardFromDeck(card);

        return card;
    }

    removeCardFromDeck(card){
        const cardIndex = this.shoe.indexOf(card);
        this.shoe.splice(cardIndex, 1);
    }
}
