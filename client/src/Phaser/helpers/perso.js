export default class Perso extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.Scene2, config.x, config.y, config.key);
        config.Scene2.add.existing(this);
        config.Scene2.physics.add.existing(this);
        this.setScale(0.2,0.2);
        this.setCollideWorldBounds(true,1,1); //Collision avec bordure monde
        this.setBounce(0);
        this.PV=100;
        this.pioche=1;
        this.or=0;
        this.pierre=0;
        this.fer=0;
        this.diams=0;
    }
}