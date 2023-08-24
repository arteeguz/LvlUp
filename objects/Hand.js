class Hand {
    constructor(scene) {
        this.scene = scene;
        this.hand = new Set();
    }

    add(card, x){
        this.hand.add(card);
        card.setSprite(this.scene.add.sprite(x, 550, 'card').setScale(0.3).setInteractive());
        card.addToHand();
    }
    play(card){
        this.hand.delete(card);
        return card;
    }
}

export default Hand;