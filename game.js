// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        this.load.image('menuBackground', 'LvlUp Images/mainMenuBg.jpg');
    }

    create() {
        this.add.image(400, 300, 'menuBackground').setOrigin(0.5).setScale(1.1);
    
        // Title styles and background
        const titleStyle = {
            fontFamily: 'Arial Bold',
            fontStyle: 'italic bold',
            fontSize: '48px',
            fill: ['#22aaff', '#88ddff'],
            stroke: '#ff0000',
            strokeThickness: 2,
            align: 'center'
        };
        
        let titleBG = this.add.graphics();
        titleBG.fillStyle(0x000000, 0.5);
        titleBG.fillRoundedRect(240, 220, 320, 70, 15);
        titleBG.lineStyle(3, 0xffffff, 1);
        titleBG.strokeRoundedRect(240, 220, 320, 70, 15);
    
        this.add.text(400, 255, "Artful Duel", titleStyle).setOrigin(0.5);
    
        // Play button styles and background
        const playStyle = {
            fontFamily: 'Arial Bold',
            fontSize: '52px',
            fill: ['#88ff88', '#008800'],
            stroke: '#ffffff',
            strokeThickness: 2,
            align: 'center'
        };
    
        let playBG = this.add.graphics();
        playBG.fillStyle(0x000000, 0.5);
        playBG.fillRoundedRect(325, 340, 150, 70, 15);
        playBG.lineStyle(3, 0xffffff, 1);
        playBG.strokeRoundedRect(325, 340, 150, 70, 15);
    
        const playButton = this.add.text(400, 375, 'Play', playStyle).setOrigin(0.5).setInteractive();
    
        playButton.on('pointerdown', () => this.scene.start('LevelSelectionScene'));
    }
    
}

class LevelSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectionScene' });
    }

    preload() {
        this.load.image('levelBG', 'LvlUp Images/levelBG.jpg');
    }

    create() {
        this.add.image(400, 300, 'levelBG').setOrigin(0.5).setScale(0.5);

        const buttonStyle = {
            fontSize: '32px',
            fill: '#ff0000',
            stroke: '#000',
            strokeThickness: 3,
            backgroundColor: 'yellow', // semi-transparent black
            padding: { left: 15, right: 15, top: 10, bottom: 10 },
            borderRadius: 8
        };

        const level1Button = this.add.text(150, 300, 'Level 1', buttonStyle).setInteractive();
        level1Button.on('pointerdown', () => this.scene.start('GameScene', { level: 1 }));
        level1Button.on('pointerover', () => level1Button.setBackgroundColor('rgba(0, 0, 0, 0.8)'));  // darker background on hover
        level1Button.on('pointerout', () => level1Button.setBackgroundColor('yellow'));

        const level2Button = this.add.text(500, 300, 'Level 2', buttonStyle).setInteractive();
        level2Button.on('pointerdown', () => this.scene.start('GameScene', { level: 2 }));
        level2Button.on('pointerover', () => level2Button.setBackgroundColor('rgba(0, 0, 0, 0.8)'));  // darker background on hover
        level2Button.on('pointerout', () => level2Button.setBackgroundColor('yellow'));
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

        this.music = null; //Declare music prop
        this.playSoundBtn=null; //Declare sound butt prop
        this.muteBtn=null; //Declare mute property
        this.playerCards = [...this.cards]; // Initialize player cards with all available cards
        this.maxHandSize = 6;
        this.playerHandGroup = null;
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
        this.playerHandGroup = this.add.group();
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

        const cardWidth = 100; //define card dims
        const cardHeight = 200;
        //set cards
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.add.image(150 + i * 100, 500, this.cards[i]).setScale(0.2);
            card.setInteractive();
            //set card hitbox using geometry
            const corner = card.getTopLeft();
            const hitArea = new Phaser.Geom.Rectangle(
                corner[0],
                corner[1],
                card.displayWidth,
                card.displayHeight
            );
            card.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains); // Set the hitboxx area
        
            card.on('pointerdown', () => this.useCard(this.cards[i], card));
        
            card.on('pointerover', function() {
                card.setScale(0.22);
            });
        
            card.on('pointerout', function() {
                card.setScale(0.2);
            });
        }
        
        this.playerHPText = this.add.text(50, 20, `Player HP: ${this.playerHP}`, { fontSize: '16px', fill: 'black' });
        this.enemyHPText = this.add.text(600, 20, `Enemy HP: ${this.enemyHP}`, { fontSize: '16px', fill: 'black' });

        this.turnIndicator = this.add.text(400, 50, "Player's Turn", { fontSize: '32px', fill: 'white' }).setOrigin(0.5);

        // Background Music - Load the music only once in the create method
        this.music = this.sound.add('backgroundMusic', { loop: true });

        // Mute/Play button - Create the buttons only once in the create method
        this.playSoundBtn = this.add.sprite(775, 565, 'playButton').setScale(0.6).setInteractive({ cursor: 'pointer' });
        this.muteBtn = this.add.sprite(775, 565, 'muteButton').setScale(0.6).setInteractive({ cursor: 'pointer' }).setVisible(false);

        this.playSoundBtn.on('pointerdown', function () {
            this.music.stop();
            this.playSoundBtn.setVisible(false);
            this.muteBtn.setVisible(true);
        }, this);

        this.muteBtn.on('pointerdown', function () {
            this.music.play();
            this.playSoundBtn.setVisible(true);
            this.muteBtn.setVisible(false);
        }, this);

        //Uncomment the line of code below to play music once player clicks a level.
        //this.music.play();

    }

    //Gives players new cards once cards in player's hand reaches 0.
    redrawCards() {

        if (this.playerCards.length === 0) {
            const newCards = [];

            for (let i = 0; i < 3; i++) {
                if (this.cards.length > 0) {
                    //Compute a random integer between the min and max values, inclusive.
                    const randomIndex = Phaser.Math.Between(0, this.cards.length - 1);
                    // Remove and get the card
                    //const newCard = this.cards.splice(randomIndex, 1)[0];

                    const newCard = this.cards[randomIndex]; //Stores cards. Does not remove cards.

                    //Push card to newCards array.
                    newCards.push(newCard);

                    //console.log(newCards);
                }
            }
            
            // Add the redrawn cards to the player's hand
            this.playerCards = [...newCards]; 
            this.updatePlayerHandDisplay(); // Update the display including attaching event listeners
            
        }
        
    }

    updatePlayerHandDisplay() {
            // Clear existing card sprites
            this.playerHandGroup.clear(true, true);
        
            // Define card dimensions and spacing
            const cardWidth = 100;
            const cardHeight = 200;
            const cardSpacing = 20;
        
            // Calculate the total width of the player's hand based on the number of cards
            const totalHandWidth = (this.playerCards.length * cardWidth) + ((this.playerCards.length - 1) * cardSpacing);
            
            // Calculate the starting X position to center the hand on the screen
            const startX = (this.sys.canvas.width - totalHandWidth) / 2;
            // Create and position card sprites
            for (let i = 0; i < this.playerCards.length; i++) {
                const cardName = this.playerCards[i];
                let card = this.add.image(startX + (i * (cardWidth + cardSpacing)), 500, cardName).setScale(0.2);
                
                // Set interactive and hit area similar to how you did it before
                
                const corner = card.getTopLeft();
                const hitArea = new Phaser.Geom.Rectangle(
                    corner[0],
                    corner[1],
                    card.displayWidth *5, //multiply by 5 needed for some reason
                    card.displayHeight*5
                );
                card.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
                
                // Use the playerHandGroup to add the card
                this.playerHandGroup.add(card);
                
                // Attach event listeners to the card
                card.on('pointerdown', () => this.useCard(cardName, card));
                
                card.on('pointerover', () => {
                    card.setScale(0.22);
                    // Play sound or do something else
                });
                
                card.on('pointerout', () => {
                    card.setScale(0.2);
                    // Play sound or do something else
                });

            }
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
        //update the text displays
        this.playerHPText.setText(`Player HP: ${this.playerHP}`);
        this.enemyHPText.setText(`Enemy HP: ${this.enemyHP}`);
    
        // Check if the game is over (before animations or changing turns)
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

        this.playerCards.splice(this.playerCards.indexOf(cardName), 1); // Remove the used card from playerCards array

        //Redundant if statement
        /*
        if (this.playerCards.length === 0) {
            this.redrawCards();
        }
        */

        this.redrawCards();
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