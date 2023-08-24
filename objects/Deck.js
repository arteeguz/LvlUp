import Card from "./Card.js";

class Deck {
    constructor(scene,controller) {
        this.scene = scene;
        this.controller = controller;
        this.deck = [];
    }
    
    demoDeck(){
        for (let i = 0; i < 10; i++){
            const card = new Card(this.scene,this.controller,'Mona Lisa', i, 0);
            this.deck.push(card);
        }
    }

    draw(){
        return this.deck.shift();
    }

    add(card){
        this.deck.push(card);
    }
    
    shuffle(){
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]; // swap
        }
    }

}

export default Deck;