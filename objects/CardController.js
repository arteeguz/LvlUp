import Card from "./Card.js";
import Deck from "./Deck.js";
import Hand from "./Hand.js";
import DiscardPile from "./DiscardPile.js";


class CardController {
    constructor(scene) {
        this.scene = scene;
        this.deck = new Deck(scene,this);
        this.deck.demoDeck();
        this.hand = new Hand(scene);

        this.discardPile = new DiscardPile();
    }

    draw(x){
        const card = this.deck.draw();
        this.hand.add(card, x);
        return card
    }

    play(card){
        this.hand.play(card);
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