class Hand {
    constructor(scene) {
        this.scene = scene;
        //this.hand = Array(6);
        this.hand = new Set();
    }
/*
    add(card, sprite){
        this.hand.push(card);
        card.setSprite(sprite)
    }
*/

    add(card, x){
        //this.hand.push(card);
        this.hand.add(card);
        card.setSprite(this.scene.add.sprite(x, 550, 'card').setScale(0.3).setInteractive());
        card.addToHand();
    }
    play(card){
        //const card = this.hand[index];
        //const card = this.hand.get(index);
        console.log(card);
        //this.hand = this.hand.splice(index,1);
        //this.hand[index] = null;
        this.hand.delete(card);
        return card;
    }
}

export default Hand;