import bg from "../assets/solgrotte.png";
import badguy from "../assets/badguy.png";
import mur from "../assets/murgrotte.png";
import pierre from "../assets/pierre1.png";
import fer from "../assets/fer1.png";
import diams from "../assets/diams1.png";
import or from "../assets/gold1.png";
import heal from "../assets/potion2.png";
import speed from "../assets/potion1.png";
import bouclier from "../assets/potion3.png";
import perso1 from "../assets/persoboisSS.png";
import perso2 from "../assets/persopierreSS.png";
import perso3 from "../assets/persoferSS.png";
import perso4 from "../assets/persodiamsSS.png";

import Perso from "../helpers/perso.js";
import Ressources from "../helpers/ressources.js";
import Loot from "../helpers/loot.js";
import Bad from "../helpers/badguy.js";

var worldSize;
var objectsAmount = {};

function estProche2(a, perso) {
  let res1 = Math.sqrt(Math.pow((perso.x - a.x), 2) + Math.pow((perso.y - a.y), 2));
  return (res1 < 150);
}

export default class Scene2 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }

    init(data) {
      this.socket = data.socket;
      worldSize = data.worldSize;
      objectsAmount.ennemies = data.objects.ennemies.amount;
      objectsAmount.mur = data.objects.mur.amount;
      objectsAmount.pierre = data.objects.pierre.amount;
      objectsAmount.fer = data.objects.fer.amount;
      objectsAmount.diamant = data.objects.diamant.amount;
      objectsAmount.or = data.objects.or.amount;
    }

    preload() {
      this.loadImages();
    }

    // executed once, after assets were loaded
    create() {
      // background
      this.bg = this.add.image(0, 0, 'bg');
      this.bg.setOrigin(0, 0);
      //this.bg.setScale(1.5,1.5);
      
      this.createWorld();
      this.createPersonnage();
      this.createEnnemis();
      this.createRessources();
      this.createBonuses();
      this.createCamera();
      this.craftMenu();
    }

    update() {
      //console.log(this.craftbool);
      this.scene.setVisible(true, "UIScene");

      this.detectMovementInputs();
      this.input.keyboard.clearCaptures();
      //this.updateEnnemisMovement();
      this.updateTimers();
      this.updatePersoRotation();
    }

// ===============================
// GAME FUNCTIONS
// ===============================

    loadImages() {
      // load images
      this.load.image('bg', bg);
      this.load.image('badguy', badguy);
      this.load.image('mur', mur);
      this.load.image('pierre', pierre);
      this.load.image('fer', fer);
      this.load.image('diams', diams);
      this.load.image('or', or);

      this.load.image('heal', heal);
      this.load.image('speed', speed);
      this.load.image('bouclier', bouclier);

      this.load.spritesheet('perso1', perso1, {
        frameWidth: 256,
        frameHeight: 256
      });
      this.load.spritesheet('perso2', perso2, {
        frameWidth: 256,
        frameHeight: 256
      });
      this.load.spritesheet('perso3', perso3, {
        frameWidth: 256,
        frameHeight: 256
      });
      this.load.spritesheet('perso4', perso4, {
        frameWidth: 256,
        frameHeight: 256
      });
    }

    createWorld() {
      this.add.text(0, 0, "X");
      this.add.text(0, worldSize - 20, "X");
      this.add.text(worldSize - 20, worldSize - 20, "X");
      this.add.text(worldSize - 20, 0, "X");
      this.physics.world.setBounds(0, 0, worldSize, worldSize);
      this.craftbool = false;
    }

    // ===== TODO =====
    createPersonnage() {
      this.perso = new Perso({
        Scene2: this,
        x: this.sys.game.config.width / 2,
        y: this.sys.game.config.height / 2,
        key: "perso1"
      });

      this.socket.emit('clientCharacterJoinedGame', this.perso.x, this.perso.y);

      this.anims.create({
        key: "perso1_meure",
        frames: this.anims.generateFrameNumbers("perso1", {
          frames: [1, 2, 3, 4]
        }),
        frameRate: 20,
        repeat: 0
      });
      this.anims.create({
        key: "perso2_meure",
        frames: this.anims.generateFrameNumbers("perso2", {
          frames: [1, 2, 3, 4]
        }),
        frameRate: 20,
        repeat: 0
      });
      this.anims.create({
        key: "perso3_meure",
        frames: this.anims.generateFrameNumbers("perso3", {
          frames: [1, 2, 3, 4]
        }),
        frameRate: 20,
        repeat: 0
      });
      this.anims.create({
        key: "perso4_meure",
        frames: this.anims.generateFrameNumbers("perso4", {
          frames: [1, 2, 3, 4]
        }),
        frameRate: 20,
        repeat: 0
      });
    }
    // ================

    createEnnemis() {
      this.badgroupe = this.physics.add.group({
        key: 'badguy',
        repeat: 0,
      });

      for (let i = 0 ; i < objectsAmount.ennemies ; ++i) {
        this.bad = new Bad({
          Scene2: this,
          x: 0,
          y: 0,
          key: "badguy"
        }); 
        // Initialisés à position 0;0 à leur création, ils seront déplacés là où ils devraient être par le serveur
        // dans la fonction update dédiée de toute façon.
        this.physics.add.overlap(this.bad, this.perso, () => {
          switch (this.perso.pioche) {
            case 1: this.perso.play("perso1_meure"); break;
            case 2: this.perso.play("perso2_meure"); break;
            case 3: this.perso.play("perso3_meure"); break;
            case 4: this.perso.play("perso4_meure"); break;
            default: break;
          }
          if (!this.bouclier) { this.events.emit('downPV'); }
        }, null, this);
        this.badgroupe.add(this.bad);
      }
      this.badgroupe.getChildren()[0].setSize(100, 100);
    }

    createRessourcesGroupes() {
      // D'après Pierre, il faut détruire le premier de chaque parce qu'ils bug, bon.
      this.murgroupe = this.physics.add.group({
        key: 'mur',
        repeat: 0,
      });
      this.murgroupe.getChildren()[0].destroy();

      this.pierregroupe = this.physics.add.group({
        key: 'pierre',
        repeat: 0,
      });
      this.pierregroupe.getChildren()[0].destroy();

      this.fergroupe = this.physics.add.group({
        key: 'fer',
        repeat: 0,
      });
      this.fergroupe.getChildren()[0].destroy();

      this.diamsgroupe = this.physics.add.group({
        key: 'diams',
        repeat: 0,
      });
      this.diamsgroupe.getChildren()[0].destroy();

      this.orgroupe = this.physics.add.group({
        key: 'or',
        repeat: 0,
      });
      this.orgroupe.getChildren()[0].destroy();
    }

    enableMining(key, ressource, clientCharacter) {
      var characterRessource, piocheLevelRequired, eventFlag;
      switch(key) {
        case "pierre":
          characterRessource = this.perso.pierre;
          piocheLevelRequired = 0;
          eventFlag = 'addPierre';
          break;
        case "fer":
          characterRessource = this.perso.fer;
          piocheLevelRequired = 1;
          eventFlag = 'addFer';
          break;
        case "diams":
          characterRessource = this.perso.diams;
          piocheLevelRequired = 2;
          eventFlag = 'addDiams';
          break;
        case "or":
          characterRessource = this.perso.or;
          piocheLevelRequired = 2;
          eventFlag = 'addOr';
          break;
        case "mur": break; // unbreakable
        default: console.log("Invalid key for initializeRessource. Input:"+key); break;
      }

      if (key === "mur") { return; }
      ressource.on('pointerdown', () => {
        if (estProche2(ressource, clientCharacter) && (clientCharacter.pioche > piocheLevelRequired)) {
          characterRessource++;
          this.events.emit(eventFlag);
          ressource.clickMe();
        }
      });
    }

    initializeRessource(key, ressourceAmount, ressourceTab, ressourcePosition) {
      var ennemiesTab = this.badgroupe.getChildren();
      for (let i = 0 ; i < ressourceAmount ; ++i) {
        // Create the ressource on the map
        ressourceTab[i] = new Ressources({
          Scene2: this,
          x: ressourcePosition[i].xPosition,
          y: ressourcePosition[i].yPosition,
          key: key
        });

        // Add Collisions
        this.physics.add.collider(ressourceTab[i], this.perso);
        for (let j = 0 ; j < objectsAmount.ennemies ; ++j) {
          this.physics.add.collider(ressourceTab[i], ennemiesTab[j]);
        }

        // Enable Mining for this precise ressource
        this.enableMining(key, ressourceTab[i], this.perso);
      }
    }

    createRessources() {
      this.createRessourcesGroupes();

      let murtab = this.murgroupe.getChildren();
      let pierretab = this.pierregroupe.getChildren();
      let fertab = this.fergroupe.getChildren();
      let diamstab = this.diamsgroupe.getChildren();
      let ortab = this.orgroupe.getChildren();

      this.socket.emit('getRessourcePositionFromServer');
      this.socket.on('sendRessourcePositionToClient', (positions) => {
        const {murPosition, pierrePosition, ferPosition, diamantPosition, orPosition} = positions;
        this.initializeRessource("mur", objectsAmount.mur, murtab, murPosition);
        this.initializeRessource("pierre", objectsAmount.pierre, pierretab, pierrePosition);
        this.initializeRessource("fer", objectsAmount.fer, fertab, ferPosition);
        this.initializeRessource("diams", objectsAmount.diamant, diamstab, diamantPosition);
        this.initializeRessource("or", objectsAmount.or, ortab, orPosition);
      })
    }

    createBonuses() {
      //HEAL
      let numLoot = 15;
      for (let i = 0; i < numLoot / 3; i++) {
        let xx = Phaser.Math.Between(0, worldSize);
        let yy = Phaser.Math.Between(0, worldSize);
        this.loot = new Loot({
          Scene2: this,
          x: xx,
          y: yy,
          key: "heal"
        });
        this.physics.add.overlap(this.loot, this.perso,
        function recuploot(loot, perso) {
          let xx = Phaser.Math.Between(0, 2000);
          let yy = Phaser.Math.Between(0, 2000);
          loot.x = xx;
          loot.y = yy;
          this.events.emit('addPV');
        },
        null, this);

      }

      //SPEED
      this.boost = false;
      for (let i = 0; i < numLoot / 3; i++) {
        let xx = Phaser.Math.Between(0, worldSize);
        let yy = Phaser.Math.Between(0, worldSize);
        this.loot = new Loot({
          Scene2: this,
          x: xx,
          y: yy,
          key: "speed"
        });
        this.physics.add.overlap(this.loot, this.perso,
        function recuploot(loot, perso) {
          let xx = Phaser.Math.Between(0, 2000);
          let yy = Phaser.Math.Between(0, 2000);
          loot.x = xx;
          loot.y = yy;
          this.boost = true;
          this.timerboost = this.time.addEvent({
            delay: 9999,
            // ms
          });
        },
        null, this);
      }

      //BOUCLIER
      this.bouclier = true;
      this.timerbouclier = this.time.addEvent({
        delay: 9999,
        // ms
      });
      for (let i = 0; i < numLoot / 3; i++) {
        let xx = Phaser.Math.Between(0, worldSize);
        let yy = Phaser.Math.Between(0, worldSize);
        this.loot = new Loot({
          Scene2: this,
          x: xx,
          y: yy,
          key: "bouclier"
        });
        this.physics.add.overlap(this.loot, this.perso,
        function recuploot(loot, perso) {
          let xx = Phaser.Math.Between(0, 2000);
          let yy = Phaser.Math.Between(0, 2000);
          loot.x = xx;
          loot.y = yy;
          this.bouclier = true;
          this.timerbouclier = this.time.addEvent({
            delay: 9999,
            // ms
          });
        },
        null, this);
      }
    }

    createCamera() {
      this.camera = this.cameras.main;
      this.camera.setBounds(0, 0, worldSize, worldSize);
      this.camera.startFollow(this.perso, true, 1, 1, 0, 0);

      this.scene.run('UIScene', {
        test: this.perso
      });
    }

    craftMenu() {
      let a = this;
      var keyObj = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C, false); // Get key object
      keyObj.on('down',
      function() {
        if (!a.craftbool) {
          a.events.emit('craft');
        } else if (a.craftbool) {
          a.events.emit('nocraft');
        }
        a.craftbool = !a.craftbool;

      });
    }

    detectMovementInputs() {
      var velocity = 150;
      if (this.boost) { velocity *= 2; }
      var hasMoved = false;

      //DÉPLACEMENT ZQSD PERSO
      if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z, false).isDown) {
        this.perso.setVelocityY(-velocity);
        hasMoved = true;
      }

      if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, false).isDown) {
        this.perso.setVelocityY(velocity);
        hasMoved = true;
      }

      if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, false).isDown) {
        this.perso.setVelocityX(velocity);
        hasMoved = true;
      }

      if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q, false).isDown) {
        this.perso.setVelocityX(-velocity);
        hasMoved = true;
      }

      if (this.input.keyboard.addKey('s').isUp && this.input.keyboard.addKey('z').isUp) {
        this.perso.setVelocityY(0);
      }

      if (this.input.keyboard.addKey('q').isUp && this.input.keyboard.addKey('d').isUp) {
        this.perso.setVelocityX(0);
      }

      if (!hasMoved) { return; }
      this.socket.emit('clientCharacterHasMoved', this.perso.x, this.perso.y);
    }

    updateEnnemisMovement() {
      function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      function estProche(a, perso) {
        let res1 = Math.sqrt(Math.pow((perso.x - a.x), 2) + Math.pow((perso.y - a.y), 2));
        return (res1 < 450);
      }

      //MOUVEMENTS ADVERSAIRES
      let badTab = this.badgroupe.getChildren();

      for (let i = 0; i < objectsAmount.ennemies; i++) {
        if (estProche(badTab[i], this.perso)) {
          let dx = this.perso.x - badTab[i].x;
          let dy = this.perso.y - badTab[i].y;
          badTab[i].setVelocity(Math.sign(dx) * 50, Math.sign(dy) * 50);
          badTab[i].rotation = Phaser.Math.Angle.Between(badTab[i].x, badTab[i].y, this.perso.x, this.perso.y);
        } else {
          let randmove = randomIntFromInterval(1, 100);
          if (randmove > 90) {
            let rand = randomIntFromInterval(1, 5);
            switch (rand) {
            case 1:
              badTab[i].setVelocityX(50);
              break;
            case 2:
              badTab[i].setVelocityX( - 50);
              break;
            case 3:
              badTab[i].setVelocityY(50);
              break;
            case 4:
              badTab[i].setVelocityY( - 50);
              break;
            case 5:
              badTab[i].setVelocity(0);
              break;
            }
          }
        }
      }
    }

    updateTimers() {
            //Timerbonus
            if (this.bouclier) {
              this.perso.tint = 1;
            } else {
              this.perso.clearTint();
            }
      
            if (this.boost && this.timerboost.getElapsed() > 4000) {
              this.boost = false;
            }
            if (this.bouclier && this.timerbouclier.getElapsed() > 3000) {
              this.bouclier = false;
            }
    }

    updatePersoRotation() {
      //ROTATION PERSO VERS SOURIS  
      let pointerX = this.input.activePointer.worldX;
      let pointerY = this.input.activePointer.worldY;
      this.perso.rotation = Phaser.Math.Angle.Between(this.perso.x, this.perso.y, pointerX, pointerY);
    }
  }