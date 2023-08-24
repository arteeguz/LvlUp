// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        this.add.text(300, 250, "Artful Duel", { fontSize: '32px', fill: 'red' });
        const playButton = this.add.text(350, 300, 'Play', { fontSize: '48px', fill: '#fff'}).setInteractive( {cursor: 'pointer'});
        playButton.on('pointerdown', () => this.scene.start('GameScene'));
    }
}

// Main Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg');
        this.load.image('card', 'assets/MonaLisaCard.jpg');
        this.load.image('enemy', 'assets/DaVinciCard.jpg');
        this.load.image('playButton', 'assets/Play_Sound_Button.png');
        this.load.image('playButtonHover', 'assets/play_Button_Hover.png');
        this.load.image('muteButton', 'assets/mute_Button.png');
        this.load.image('muteButtonHover', 'assets/mute_Button_Hover.png');
        this.load.audio('cardSliding', 'assets/Page_Turn-Mark_DiAngelo-1304638748.mp3');
        this.load.audio('cardAttack', 'assets/punch-140236.mp3');
        this.load.audio('backgroundMusic', 'assets/fur-elise.mp3');
    }

    create() {
        //Background
        this.background = this.add.image(400, 300, 'background').setScale(1.5);

        //Enemy HP
        this.enemyHP = 100;
        this.enemyHPText = this.add.text(600, 50, `Enemy HP: ${this.enemyHP}`, { fontSize: '24px', fill: '#000' });

        //Main enemy image
        this.enemySprite = this.add.sprite(400, 150, 'enemy').setScale(0.1);  

        //Player Text
        this.playerHP = 100;
        this.playerHPText = this.add.text(100, 50, `Player HP: ${this.playerHP}`, { fontSize: '24px', fill: '#000' });

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

        const cardWidth = 100;
        const startX = 90; //Starting Card X Position

        this.cardSprites = [];
        this.cardAbilities = [];

        for(let i=0; i<6; i++) {

            //Starting Card X position + (number of cards * (card Width * Card Spacing))
            const x = startX + (i * (cardWidth * 0.9)); 

            //Made Cards Smaller
            const card = this.add.sprite(x, 540, 'card').setScale(0.05).setInteractive({cursor: 'pointer'});
            this.cardSprites.push(card);

            // Example abilities
            const abilities = ['+10 Damage', '+20 Damage', '-10 Enemy', '+5 Heal', '+15 Heal', '-5 Enemy'];
            this.cardAbilities.push(abilities[i]);

            card.on('pointerdown', function() {
                const ability = this.cardAbilities[i];
                this.handleAbility(ability);

                //Sound of player or enemy attacking.
                cardAttack.play();

                card.destroy();  // Remove card after using
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
        }

    }

    //If enemy HP is subtracted, player is attacking. If enemy HP is added, enemy is attacking.
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
