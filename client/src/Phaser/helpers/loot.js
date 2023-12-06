export default class Loot extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.Scene2, config.x, config.y, config.key);
        config.Scene2.add.existing(this);
        config.Scene2.physics.add.existing(this);
        this.setScale(0.15, 0.15);
        this.setInteractive();

        this.on('pointerover', function(loot) {
            // Some options, you could add position, stylings etc
            let tooltip = { text: 'Potion de Bouclier' }
            if (this.texture.key === "heal") { tooltip = { text: 'Potion de Soin' } }
            if (this.texture.key === "speed") { tooltip = { text: 'Potion de Vitesse' } }

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
        })

        this.on('pointerout', function() {
            // Hide or destroy tooltip when leaving sprite
            config.Scene2.tooltipContainer.setVisible(false)
        })
    }
}