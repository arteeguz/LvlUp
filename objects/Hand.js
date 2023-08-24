class Hand {
    constructor() {
        //this.hand = Array(6);
        this.hand = new Map();
    }
/*
    add(card, sprite){
        this.hand.push(card);
        card.setSprite(sprite)
    }
*/

    add(card, index){
        //this.hand.push(card);
        this.hand.set(index, card);
    }
    play(index){
        //const card = this.hand[index];
        const card = this.hand.get(index);
        console.log(card);
        //this.hand = this.hand.splice(index,1);
        //this.hand[index] = null;
        this.hand.delete(index);
        return card;
    }
}

export default Hand;