import Card from "./Card.js";
import Deck from "./Deck.js";
import Hand from "./Hand.js";
import DiscardPile from "./DiscardPile.js";


class CardController {
    constructor() {
        this.deck = new Deck();
        this.deck.demoDeck();
        this.hand = new Hand();

        this.discardPile = new DiscardPile();
    }

    draw(i){
        const card = this.deck.draw();
        console.log("drawing");
        this.hand.add(card, i);
        //console.log("added to hand");
        //console.log(card);
        return card
    }

    play(index){
        const card = this.hand.play(index);
        console.log(card);
        this.discardPile.add(card);
        return card;
    }

    getDeck(){
        return this.deck;
    }

    getHand(){
        return this.hand;
    }

    getDiscardPile(){
        return this.discardPile;
    }

}

export default CardController;