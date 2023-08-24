import CardController from "./objects/CardController.js";
import Card from "./objects/Card.js";

// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        this.add.text(300, 250, "Artful Duel", { fontSize: '32px', fill: 'red' });
        const playButton = this.add.text(350, 300, 'Play', { fontSize: '48px', fill: '#fff' }).setInteractive();
        playButton.on('pointerdown', () => this.scene.start('GameScene'));
    }
}

// Main Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.CardController = new CardController(this);
        this.handMap = new Map();
    }

    preload() {
        this.load.image('background', 'bg.jpg');
        this.load.image('card', 'MonaLisaCard1.jpg');
        this.load.image('enemy', 'DaVinciCard.jpg');
    }

    create() {
        this.add.image(400, 300, 'background').setScale(1.5);
        this.enemyHP = 1000;
        this.enemyHPText = this.add.text(600, 50, `Enemy HP: ${this.enemyHP}`, { fontSize: '24px', fill: '#000' });
        this.enemySprite = this.add.sprite(400, 150, 'enemy').setScale(0.1);  // Main enemy image

        this.playerHP = 100;
        this.playerHPText = this.add.text(100, 50, `Player HP: ${this.playerHP}`, { fontSize: '24px', fill: '#000' });

        const cardWidth = 100;
        const startX = 120;

        this.cardSprites = [];
        this.cardAbilities = [];

        for(let i=0; i<6; i++) {
            
            const x = startX + (i * cardWidth);
//            const card = this.CardController.draw(i)
            const card = this.CardController.draw(x)
        /*  const drawing = this.add.sprite(x, 550, 'card').setScale(0.3).setInteractive();
            this.handMap.set(drawing, i);
        */
            //console.log("checking handmap");
            //console.log(this.handMap.get(drawing));
            //console.log(this.CardController.getHand());
            /*
            const card = this.add.sprite(x, 550, 'card').setScale(0.3).setInteractive();
            this.cardSprites.push(card);

            // Example abilities
            const abilities = ['+10 Damage', '+20 Damage', '-10 Enemy', '+5 Heal', '+15 Heal', '-5 Enemy'];
            this.cardAbilities.push(abilities[i]);
            */

            /*
            drawing.on('pointerdown', function() {
                //const ability = this.cardAbilities[i];
                const card = this.CardController.play(this.handMap.get(drawing));
                const ability = card.getAbility();
                this.handleAbility(ability);
                this.handMap.delete(drawing);
                drawing.destroy();  // Remove card after using
            }, this);
            */
        }
    }
/*
    handleAbility(ability) {
        switch(ability) {
            case '+10 Damage':
                this.enemyHP -= 10;
                this.showDamageAnimation(10, this.enemyHPText);
                break;
            case '+20 Damage':
                this.enemyHP -= 20;
                this.showDamageAnimation(20, this.enemyHPText);
                break;
            case '-10 Enemy':
                this.enemyHP += 10;
                this.showDamageAnimation(-10, this.enemyHPText);
                break;
            case '-5 Enemy':
                this.enemyHP += 5;
                this.showDamageAnimation(-5, this.enemyHPText);
                break;
        }

        this.enemyHPText.setText(`Enemy HP: ${this.enemyHP}`);
        this.playerHPText.setText(`Player HP: ${this.playerHP}`);
        this.checkGameOver();
    }
*/
    showDamageAnimation(damage, textObj) {
        const originalY = textObj.y;
        const tweenDuration = 500;

        if (damage > 0) {
            textObj.setColor('#ff0000');
            this.damageEnemyAnimation(); // Trigger enemy damage animation
        } else {
            textObj.setColor('#00ff00');
            this.damagePlayerAnimation(); // Trigger player damage animation
        }

        this.tweens.add({
            targets: textObj,
            y: originalY - 20,
            duration: tweenDuration,
            yoyo: true,
            onYoyo: function() {
                textObj.setColor('#ffffff');
                textObj.y = originalY;
            }
        });
    }

    damageEnemyAnimation() {
        // Rotate the enemy sprite left and right
        this.tweens.add({
            targets: this.enemySprite,
            angle: { from: -15, to: 15 },  
            duration: 100,
            yoyo: true,
            repeat: 5
        });
    }

    damagePlayerAnimation() {
        const damageOverlay = this.add.rectangle(400, 300, 800, 600, 0xff0000, 0.4);
        damageOverlay.setBlendMode(Phaser.BlendModes.COLOR);
        this.tweens.add({
            targets: damageOverlay,
            alpha: 0,
            duration: 500,
            onComplete: () => damageOverlay.destroy()
        });
    }

    checkGameOver() {
        if (this.playerHP <= 0) {
            alert('You lose!');
        } else if (this.enemyHP <= 0) {
            alert('You win!');
        }
    }

    update() {
        // empty function for now
    }
}

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [MainMenuScene, GameScene]
};

let game = new Phaser.Game(config);
