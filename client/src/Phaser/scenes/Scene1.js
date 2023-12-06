import loading from "../assets/menudebut.png";
import bouton from "../assets/boutonplay.png";

// Le chat et le jeu vont partager la même socket.
import socket from "../helpers/chat.js";

export default class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }

    preload() {
      // load image
      this.load.image('loading', loading);
      this.load.image('bouton', bouton);
    }

    create() {
      // background
      this.bg = this.add.image(0, 0, 'loading');
      this.bg.setOrigin(0, 0);
      this.bg.setScale(2.5, 2.5);

      this.rec = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bouton');
      this.rec.setInteractive();
      this.rec.setScale(2, 2);

      // CREATE SOCKET
      this.socket = socket;

      // petite espièglerie nécessaire parce que la socket a été créée en premier
      // dans chat.js, ainsi this.socket.on('connect') ne marchera pas car il faut
      // attendre de connecter la socket du chat et celle-ci pour qu'elle soit bien la même.
      this.socket.emit('gameConnected');
      
      this.socket.on('worldVariable', (worldVariable) => {
        this.worldSize = worldVariable.size;
        this.objects = worldVariable.objects;
      });

      this.rec.on("pointerdown", function() {
        this.scene.start("playGame", { 
          socket: this.socket,
          worldSize: this.worldSize,
          objects: this.objects
        });
      },
      this);

    }

    update() {}
}