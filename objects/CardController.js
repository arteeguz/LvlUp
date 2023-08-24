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
    //    console.log("drawing");
        this.hand.add(card, x);
        //console.log("added to hand");
        //console.log(card);
        return card
    }

    play(card){
        //const card = this.hand.play(index);
        this.hand.play(card);
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