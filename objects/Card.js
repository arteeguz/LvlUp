class Card {
    constructor(scene,controller,name,atk,def) {
        this.scene = scene;
        this.controller = controller;
        this.name = name;
        this.image = 'card';
        this.attack = atk;
        this.defense = def;
        this.sprite = null;
        this.hand = null;
        console.log(this.controller);
    }

    setSprite(sprite){
        this.sprite = sprite;
        const card = this;
        this.sprite.on('pointerdown', function() {
            console.log(card.controller);
            card.controller.play(this);
            const ability = '+10 Damage';
            card.handleAbility();
            card.sprite.destroy();  // Remove card after using
        }, this.scene);
    }

    addToHand(){
        this.hand = this.controller.getHand();
    }

    handleAbility(){
        this.scene.enemyHP -= 10;
        this.scene.showDamageAnimation(10, this.scene.enemyHPText);
        this.scene.enemyHPText.setText(`Enemy HP: ${this.scene.enemyHP}`);
        this.scene.playerHPText.setText(`Player HP: ${this.scene.playerHP}`);
        this.scene.checkGameOver();
    }
  
    getAbility(){
        return '+10 Damage';
    }

}

export default Card;