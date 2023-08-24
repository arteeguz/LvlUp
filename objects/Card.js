class Card {
    constructor(name,atk,def) {
        this.name = name;
        this.image = 'card';
        this.attack = atk;
        this.defense = def;
        this.sprite = null;
    }
/*
    setSprite(sprite){
        this.sprite = sprite;
        this.sprite.on('pointerdown', function() {
            const ability = this.cardAbilities[i];
            this.handleAbility(ability);
            sprite.destroy();  // Remove card after using
        }, this);
    }
  */  
    getAbility(){
        return '+10 Damage';
    }

}

export default Card;