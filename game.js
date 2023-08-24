// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        this.add.text(300, 250, "Artful Duel", { fontSize: '32px', fill: 'red' });
        const playButton = this.add.text(350, 300, 'Play', { fontSize: '48px', fill: '#fff' }).setInteractive();
        playButton.on('pointerdown', () => this.scene.start('LevelSelectionScene'));
    }
}

class LevelSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectionScene' });
    }

    create() {
        const level1Button = this.add.text(200, 300, 'Level 1', { fontSize: '32px', fill: '#fff' }).setInteractive();
        level1Button.on('pointerdown', () => this.scene.start('GameScene', { level: 1 }));

        const level2Button = this.add.text(600, 300, 'Level 2', { fontSize: '32px', fill: '#fff' }).setInteractive();
        level2Button.on('pointerdown', () => this.scene.start('GameScene', { level: 2 }));
    }
}

class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    create() {
        this.add.text(300, 250, "You Won!", { fontSize: '48px', fill: 'green' });

        const homeButton = this.add.text(200, 400, 'Home', { fontSize: '32px', fill: '#fff' }).setInteractive();
        homeButton.on('pointerdown', () => this.scene.start('MainMenuScene'));

        const replayButton = this.add.text(500, 400, 'Try Again', { fontSize: '32px', fill: '#fff' }).setInteractive();
        replayButton.on('pointerdown', () => this.scene.start('LevelSelectionScene'));
    }
}

class LoseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoseScene' });
    }

    create() {
        this.add.text(300, 250, "You Lost!", { fontSize: '48px', fill: 'red' });

        const homeButton = this.add.text(200, 400, 'Home', { fontSize: '32px', fill: '#fff' }).setInteractive();
        homeButton.on('pointerdown', () => this.scene.start('MainMenuScene'));

        const replayButton = this.add.text(500, 400, 'Try Again', { fontSize: '32px', fill: '#fff' }).setInteractive();
        replayButton.on('pointerdown', () => this.scene.start('LevelSelectionScene'));
    }
}
// Main Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.playerHP = 100;
        this.enemyHP = 100;
        this.cards = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6']; // Sample set of cards
        this.turnIndicator = null;
    }

    preload() {
        this.load.image('bg1', 'LvlUp Images/bg1.jpg');
        this.load.image('bg2', 'LvlUp Images/bg2.jpg');
        this.load.image('monster1', 'LvlUp Images/MonsterOne.png');
        this.load.image('monster2', 'LvlUp Images/monster2.png');
        this.load.image('Card1', 'LvlUp Images/Card1.png');
        this.load.image('Card2', 'LvlUp Images/Card2.png');
        this.load.image('Card3', 'LvlUp Images/Card3.png');
        this.load.image('Card4', 'LvlUp Images/Card4.png');
        this.load.image('Card5', 'LvlUp Images/Card5.png');
        this.load.image('Card6', 'LvlUp Images/Card6.png');
      
        this.load.image('playButton', 'assets/Play_Sound_Button.png');
        this.load.image('playButtonHover', 'assets/play_Button_Hover.png');
        this.load.image('muteButton', 'assets/mute_Button.png');
        this.load.image('muteButtonHover', 'assets/mute_Button_Hover.png');
        this.load.audio('cardSliding', 'assets/Page_Turn-Mark_DiAngelo-1304638748.mp3');
        this.load.audio('cardAttack', 'assets/punch-140236.mp3');
        this.load.audio('backgroundMusic', 'assets/fur-elise.mp3');
    }

    create(data) {
        this.playerHP = 100;
        this.enemyHP = 100;

        if (data.level === 1) {
            this.add.image(400, 300, 'bg1').setOrigin(0.5).setScale(0.8);
            this.enemySprite = this.add.image(400, 200, 'monster1');
        } else if (data.level === 2) {
            this.add.image(400, 300, 'bg2').setOrigin(0.5).setScale(0.3);
            this.enemySprite = this.add.image(400, 200, 'monster2');
        }
        
        this.enemySprite.setScale(0.2);

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.add.image(150 + i * 100, 500, this.cards[i]).setInteractive();
            card.setScale(0.2, 0.2);

            card.on('pointerdown', () => this.useCard(this.cards[i], card));  // passing card object
        }


        this.playerHPText = this.add.text(50, 20, `Player HP: ${this.playerHP}`, { fontSize: '16px', fill: 'black' });
        this.enemyHPText = this.add.text(600, 20, `Enemy HP: ${this.enemyHP}`, { fontSize: '16px', fill: 'black' });

        this.turnIndicator = this.add.text(400, 50, "Player's Turn", { fontSize: '32px', fill: 'white' }).setOrigin(0.5);
    }

    useCard(cardName,card) {
        const previousPlayerHP = this.playerHP;
        const previousEnemyHP = this.enemyHP;
    
        switch (cardName) {
            case 'Card1':
                this.enemyHP -= 40;
                break;
            case 'Card2':
                this.playerHP += 5;
                break;
            case 'Card3':
                this.playerHP += 10;
                break;
            case 'Card4':
                this.enemyHP -= 60;
                break;
            case 'Card5':
                this.playerHP += 8;
                break;
            case 'Card6':
                this.enemyHP -= 40;
                break;
        }
        this.displayCardActionFeedback(cardName);  // display feedback
      
         //Card Sound Effect

        //Mark DiAngelo Sound Bible
        const cardSliding = this.sound.add('cardSliding', {loop: false});

        /*
        Sound Effect by 
        <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=140236">
        UNIVERSFIELD
        </a> 
        from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=140236">
        Pixabay
        </a>
        */
        const cardAttack = this.sound.add('cardAttack', {loop: false});

        //Background Music - https://www.mfiles.co.uk/mp3-downloads/fur-elise.mp3
        const music = this.sound.add('backgroundMusic', {loop: true});

        music.play();

        //Mute/Play button
        const playSoundBtn = this.add.sprite(775, 565, 'playButton').setScale(0.6).setInteractive({cursor: 'pointer'});
        const muteBtn = this.add.sprite(775, 565, 'muteButton').setScale(0.6).setInteractive({cursor: 'pointer'}).setVisible(false);

        playSoundBtn.on('pointerdown', function() {
            music.stop();
            playSoundBtn.setVisible(false);
            muteBtn.setVisible(true);
        }, this);

        muteBtn.on('pointerdown', function() {
            music.play();
            playSoundBtn.setVisible(true);
            muteBtn.setVisible(false);
        }, this);
      
      //Made focus for cards
      card.on('pointerover', function() {
          //console.log("over");

          card.setScale(0.1).setInteractive();

          //Sound that cards may make when you pull a card from your hand
          cardSliding.play();
      }, this);

      card.on('pointerout', function() {
          //console.log("left");

          card.setScale(0.05).setInteractive();

      }, this);

        card.destroy();  // destroy the card
        // First, update the text displays
        this.playerHPText.setText(`Player HP: ${this.playerHP}`);
        this.enemyHPText.setText(`Enemy HP: ${this.enemyHP}`);
    
        // Next, check if the game is over (before animations or changing turns)
        if (!this.checkGameOver()) {
            // If game isn't over, show animations and change turn
    
            if (this.enemyHP !== previousEnemyHP) {
                this.showDamageAnimation(this.enemyHP - previousEnemyHP, this.enemyHPText);
            }
    
            if (this.playerHP !== previousPlayerHP) {
                this.showDamageAnimation(this.playerHP - previousPlayerHP, this.playerHPText);
            }
    
            this.turnIndicator.setText("Enemy's Turn");
    
            this.time.delayedCall(1000, this.handleEnemyTurn, [], this); // Delay of 1 second before enemy takes its turn.
        }
    }
    
    displayCardActionFeedback(cardName) {
        let feedbackText = "";

        switch (cardName) {
            case 'Card1':
                feedbackText = "Dealt 10 damage!";
                break;
            case 'Card2':
                feedbackText = "Healed 5 HP!";
                break;
            case 'Card3':
                feedbackText = "Healed 1 HP!";
                break;
            case 'Card4':
                feedbackText = "Dealt 15 damage!";
                break;
            case 'Card5':
                feedbackText = "Healed 8 HP!";
                break;
            case 'Card6':
                feedbackText = "Healed 3 HP!";
                break;
        }

        const actionText = this.add.text(400, 300, feedbackText, { fontSize: '24px', fill: 'yellow', backgroundColor: 'black' }).setOrigin(0.5);
        this.time.delayedCall(1000, () => actionText.destroy(), [], this);
    }

    handleEnemyTurn() {
        const previousPlayerHP = this.playerHP;
        const previousEnemyHP = this.enemyHP;
    
        const randAction = Math.floor(Math.random() * 6) + 1;
    
        switch (randAction) {
            case 1:
                this.playerHP -= 10; // Harm player
                break;
            case 2:
                this.enemyHP += 5;  // Heal enemy
                break;
            case 3:
                this.playerHP -= 1; // Slight harm to player
                break;
            case 4:
                this.playerHP -= 15; // More harm to player
                break;
            case 5:
                this.enemyHP += 8;  // More heal to enemy
                break;
            case 6:
                this.playerHP -= 3; // Slight harm to player
                break;
        }
    
        // First, update the text displays
        this.playerHPText.setText(`Player HP: ${this.playerHP}`);
        this.enemyHPText.setText(`Enemy HP: ${this.enemyHP}`);
    
        // Next, check if the game is over (before animations or changing turns)
        if (!this.checkGameOver()) {
            // If game isn't over, show animations and change turn
    
            if (this.enemyHP !== previousEnemyHP) {
                this.showDamageAnimation(this.enemyHP - previousEnemyHP, this.enemyHPText);
            }
    
            if (this.playerHP !== previousPlayerHP) {
                this.showDamageAnimation(this.playerHP - previousPlayerHP, this.playerHPText);
            }
    
            this.turnIndicator.setText("Player's Turn");
        }
    }
    
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
            duration: tweenDuration
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
            this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
                if (progress === 1) {
                    this.scene.start('LoseScene');
                }
            }, this);
            return true;
        } else if (this.enemyHP <= 0) {
            this.cameras.main.fade(800, 255, 255, 255, false, function(camera, progress) {
                if (progress === 1) {
                    this.scene.start('WinScene');
                }
            }, this);
            return true;
        }
        return false;
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
    scene: [MainMenuScene, LevelSelectionScene, GameScene, WinScene, LoseScene]
};

let game = new Phaser.Game(config);