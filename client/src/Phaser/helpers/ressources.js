export default class Ressources extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.Scene2, config.x, config.y, config.key, );
        config.Scene2.add.existing(this);
        config.Scene2.physics.add.existing(this);
        this.setInteractive();
        this.setVelocity(0, 0);
        this.setBounce(0);
        this.setScale(0.3, 0.3);
        this.body.immovable = true;
        this.body.moves = false;
        this.nombreressource = 5;
        this.setSize(10, 10);
        if (this.texture.key === "mur") { this.setSize(200, 200); }

        this.on('pointerover', function() {
            // Some options, you could add position, stylings etc
            if (this.texture.key != "mur") {
                let tooltip = { text: 'Pierre (pioche en bois)' }
                if (this.texture.key === "fer") { tooltip = { text: 'Fer (pioche en pierre)' } }
                if (this.texture.key === "or") { tooltip = { text: 'Or (pioche en fer)' } }
                if (this.texture.key === "diams") { tooltip = { text: 'Diams (pioche en fer)' } }

                let tooltipX = config.x - 20
                let tooltipY = config.y - 20
                const textPadding = 5

                const text = config.Scene2.add
                    .text(textPadding, textPadding, tooltip.text, { color: '#000' })
                const background = config.Scene2.add
                    .rectangle(0, 0, 
                        text.displayWidth + (textPadding * 2), 
                        text.displayHeight + (textPadding * 2), 0xffffff).setOrigin(0, 0)

                // Put both text and background in a cointainer to easily position them
                config.Scene2.tooltipContainer = config.Scene2.add.container(tooltipX, tooltipY)
                config.Scene2.tooltipContainer.add(background)
                config.Scene2.tooltipContainer.add(text)
                //console.log(loot.x);
            }
        })

        this.on('pointerout', function() {
            // Hide or destroy tooltip when leaving sprite
            if (this.texture.key != "mur") {
                config.Scene2.tooltipContainer.setVisible(false)
            }
        })
    }

    clickMe() {
        if (this.texture.key === 'diams') { this.nombreressource = 1; }
        this.nombreressource -= 1;
        this.alpha -= .2;

        if (this.texture.key === 'or') {
            this.nombreressource -= 1;
            this.alpha -= .2;
        }

        if (this.texture.key === 'mur') {
            this.nombreressource += 1;
            this.alpha = 1;
        }

        if (this.nombreressource <= 0) {
            let xx = Phaser.Math.Between(0, 2000);
            let yy = Phaser.Math.Between(0, 2000);
            this.x = xx;
            this.y = yy;
            this.nombreressource = 5;
            this.alpha = 1;
            console.log('bye');
        }
    }
}