export default class Bad extends Phaser.Physics.Arcade.Sprite {   
    constructor(config) {
        super(config.Scene2, config.x, config.y, config.key);
        config.Scene2.add.existing(this);
        config.Scene2.physics.add.existing(this);
        this.setBounce(0);
        this.setScale(0.25,0.25);
        this.setCollideWorldBounds(true,1,1);
    }
}