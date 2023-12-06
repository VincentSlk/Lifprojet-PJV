import carre from "../assets/carre.png";
import p1 from "../assets/pioche1.png";
import p2 from "../assets/pioche2.png";
import p3 from "../assets/pioche3.png";
import p4 from "../assets/pioche4.png";
import symbolpv from "../assets/coeur.png";
import symbolpierre from "../assets/pierre2.png";
import symbolfer from "../assets/fer2.png";
import symbolor from "../assets/gold2.png";
import symboldiams from "../assets/diams2.png";

export default class Scene3 extends Phaser.Scene {
    constructor() {
        super('UIScene');
        this.PV = 0;
        this.pierre = 0;
        this.fer = 0;
        this.diams = 0;
        this.perso = 0;
        this.pioche = 1;
        this.or = 0;
    }

    init(data) {
        this.perso = data.test;
    }

    preload() {
        // load image
        this.load.image('carre', carre);
        this.load.image('p1', p1);
        this.load.image('p2', p2);
        this.load.image('p3', p3);
        this.load.image('p4', p4);
        //this.load.image('perso2', 'img/persopierre.png');
        this.load.image('symbolpv', symbolpv);
        this.load.image('symbolpierre', symbolpierre);
        this.load.image('symbolfer', symbolfer);
        this.load.image('symbolor', symbolor);
        this.load.image('symboldiams', symboldiams);

    }

    create() {
        //  Our Text object to display the PV
        this.PV = this.perso.PV;
        this.pierre = this.perso.pierre;
        this.fer = this.perso.fer;
        this.diams = this.perso.diams;
        this.pioche = this.perso.pioche;
        this.or = this.perso.or;

        this.bg = this.add.image(0, 0, 'carre');
        this.bg.setOrigin(0, 0);
        this.bg.setScale(0.5, 0.75);

        this.sPV = this.add.image(30, 30, 'symbolpv');
        this.sPV.setScale(0.1, 0.1);
        this.spierre = this.add.image(30, 60, 'symbolpierre');
        this.spierre.setScale(0.1, 0.1);
        this.sfer = this.add.image(40, 80, 'symbolfer');
        this.sfer.setScale(0.2, 0.2);
        this.sor = this.add.image(30, 120, 'symbolor');
        this.sor.setScale(0.1, 0.1);
        this.sdiams = this.add.image(30, 145, 'symboldiams');
        this.sdiams.setScale(0.2, 0.2);

        this.bg2 = this.add.image(10, 200, 'carre');
        this.bg2.setOrigin(0, 0);

        this.bg2.setScale(0.35, 0.35);
        this.spioche = this.add.image(60, 240, 'p1');
        this.spioche.setScale(2, 2);

        this.infoPV = this.add.text(60, 25, this.PV);

        this.info2 = this.add.text(60, 55, this.pierre);
        this.info3 = this.add.text(60, 85, this.fer);
        this.info4 = this.add.text(60, 145, this.diams);
        //this.info5 = this.add.text(20, 140, 'Pioche: ', { font: '20px Arial', fill: '#0' });
        this.info6 = this.add.text(60, 115, this.or);

        //menu craft
        this.carremenu = this.add.image(400, 400, 'carre');
        this.carremenu.setScale(2.75, 2);
        this.carremenu.setVisible(false);

        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('playGame');

        //  Listen for events from it
        ourGame.events.on('addPV',
            function() {

                this.PV += 25;
                if (this.PV > 100) {
                    this.PV = 100;
                }

                this.infoPV.setText(this.PV);

            },
            this);

        ourGame.events.on('downPV',
            function() {

                this.PV -= 1;
                this.infoPV.setText(this.PV);

                if (this.PV < 0) {
                    this.scene.stop("UIScene");
                    this.scene.stop("playGame");
                    this.scene.start("bootGame");
                }

            },
            this);

        ourGame.events.on('addPierre',
            function() {

                this.pierre += 1;
                if (this.perso.pioche === 4) {
                    this.pierre += 1;
                }

                this.info2.setText(this.pierre);

            },
            this);

        ourGame.events.on('addFer',
            function() {

                this.fer += 1;
                if (this.perso.pioche === 4) {
                    this.fer += 1;
                }

                this.info3.setText(this.fer);

            },
            this);

        ourGame.events.on('addDiams',
            function() {

                this.diams += 1;
                if (this.perso.pioche === 4) {
                    this.diams += 1;
                }

                this.info4.setText(this.diams);

            },
            this);

        ourGame.events.on('addOr',
            function() {

                this.or += 1;
                if (this.perso.pioche === 4) {
                    this.or += 1;
                }

                this.info6.setText(this.or);

            },
            this);

        this.sys.events.once('shutdown',
            function shutdown() {
                ourGame.events.off('addPV');
                ourGame.events.off('downPV');
                ourGame.events.off('addPierre');
                ourGame.events.off('addFer');
                ourGame.events.off('addDiams');
                ourGame.events.off('addOr');

            },
            this);

        this.crafttexte = this.add.text(200, 200, 'Menu Craft :', {
            font: '60px Arial',
            fill: '#0'
        });
        this.crafttexte.setVisible(false);

        this.infocraft2 = this.add.text(100, 300, 'Pioche en Pierre (10 Pierre)', {
            font: '30px Arial',
            fill: '#0'
        });
        this.infocraft2.setVisible(false);
        if (this.pierre > 9) {
            this.infocraft2.setColor('#008000');
            console.log("pierre");
        }
        this.infocraft2.setInteractive();
        this.infocraft2.on('pointerdown',
            function() {
                console.log("craft");
                if (this.pierre > 9 && this.perso.pioche < 2) {
                    //this.info5.setText('Pioche: 2' );
                    this.spioche.setTexture('p2');
                    this.perso.pioche = 2;
                    this.perso.setTexture('perso2');
                    console.log(this.perso.texture.key);
                    this.pierre = this.pierre - 10;

                    this.info2.setText(this.pierre);
                    this.infocraft2.setColor('#0');

                }

            },
            this);

        this.infocraft3 = this.add.text(100, 340, 'Pioche en Fer (10 Fer)', {
            font: '30px Arial',
            fill: '#0'
        });
        this.infocraft3.setVisible(false);
        if (this.fer > 9) {
            this.infocraft3.setColor('#008000');
        }
        this.infocraft3.setInteractive();
        this.infocraft3.on('pointerdown',
            function() {
                console.log("craft");
                if (this.fer > 9 && this.perso.pioche < 3) {
                    //this.info5.setText('Pioche: 3' );
                    this.spioche.setTexture('p3');
                    this.perso.pioche = 3;
                    this.perso.setTexture('perso3');
                    this.fer = this.fer - 10;

                    this.info3.setText(this.fer);
                    this.infocraft3.setColor('#0');

                }

            },
            this);

        this.infocraft4 = this.add.text(100, 380, 'Pioche Ultime (10 Fer, 10 Pierre, 5 Diams)', {
            font: '30px Arial',
            fill: '#0'
        });
        this.infocraft4.setVisible(false);
        if (this.fer > 9 && this.pierre > 9 && this.diams > 4) {
            this.infocraft4.setColor('#008000');
        }
        this.infocraft4.setInteractive();
        this.infocraft4.on('pointerdown',
            function() {
                console.log("craft");
                if (this.fer > 9 && this.perso.pioche < 4 && this.pierre > 9 && this.diams > 4) {
                    //this.info5.setText('Pioche: 4' );
                    this.spioche.setTexture('p4');
                    this.perso.pioche = 4;
                    this.perso.setTexture('perso4');
                    this.fer = this.fer - 10;
                    this.pierre = this.pierre - 10;
                    this.diams = this.diams - 5;

                    this.info3.setText(this.fer);
                    this.info2.setText(this.pierre);
                    this.info4.setText(this.diams);

                    this.infocraft4.setColor('#0');

                }

            },
            this);

        this.infocraft5 = this.add.text(100, 420, 'Potion de Soin (3 Or)', {
            font: '30px Arial',
            fill: '#0'
        });
        this.infocraft5.setVisible(false);
        if (this.or > 2) {
            this.infocraft5.setColor('#008000');
        }
        this.infocraft5.setInteractive();
        this.infocraft5.on('pointerdown',
            function() {
                console.log("craft");
                if (this.or > 3) {
                    this.or = this.or - 3;
                    this.PV += 25;
                    if (this.PV > 100) {
                        this.PV = 100;
                    }
                    this.infoPV.setText(this.PV);

                    this.info6.setText(this.or);

                    this.infocraft5.setColor('#0');

                }

            },
            this);
        true

        this.infocraft6 = this.add.text(100, 460, 'Potion de Fuite Random (6 Or)', {
            font: '30px Arial',
            fill: '#0'
        });
        this.infocraft6.setVisible(false);
        if (this.or > 5) {
            this.infocraft6.setColor('#008000');
        }
        this.infocraft6.setInteractive();
        this.infocraft6.on('pointerdown',
            function() {
                console.log("craft");
                if (this.or > 5) {
                    this.or = this.or - 6;

                    this.info6.setText(this.or);
                    let xx = Phaser.Math.Between(0, 2000);
                    let yy = Phaser.Math.Between(0, 2000);
                    this.perso.x = xx;
                    this.perso.y = yy;

                    this.infocraft6.setColor('#0');

                }

            },
            this);

        this.infocraft7 = this.add.text(100, 500, 'Diams (15 Pierre et 10 Fer)', {
            font: '30px Arial',
            fill: '#0'
        });
        this.infocraft7.setVisible(false);
        if (this.fer > 9 && this.pierre > 14) {
            this.infocraft7.setColor('#008000');
        }
        this.infocraft7.setInteractive();
        this.infocraft7.on('pointerdown',
            function() {
                console.log("craft");
                if (this.fer > 9 && this.pierre > 14) {
                    this.fer = this.fer - 10;
                    this.pierre = this.pierre - 15;
                    this.diams = this.diams + 1;

                    this.info3.setText(this.fer);
                    this.info2.setText(this.pierre);
                    this.info4.setText(this.diams);

                    this.infocraft7.setColor('#0');

                }

            },
            this);
    }

    update() {

        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('playGame');
        if (this.pierre > 9) {
            this.infocraft2.setColor('#008000');
        }
        if (this.pierre < 9) {
            this.infocraft2.setColor('#0');
        }

        if (this.or > 5) {
            this.infocraft6.setColor('#008000');
        }
        if (this.or < 5) {
            this.infocraft6.setColor('#0');
        }
        if (this.or > 2) {
            this.infocraft5.setColor('#008000');
        }
        if (this.or < 2) {
            this.infocraft5.setColor('#0');
        }
        if (this.fer > 9 && this.pierre > 9 && this.diams > 4) {
            this.infocraft4.setColor('#008000');
        }
        if (this.fer < 9 || this.pierre < 9 || this.diams < 4) {
            this.infocraft4.setColor('#0');
        }
        if (this.fer > 9) {
            this.infocraft3.setColor('#008000');
        }
        if (this.fer < 9) {
            this.infocraft3.setColor('#0');
        }
        if (this.fer > 9 && this.pierre > 14) {
            this.infocraft7.setColor('#008000');
        }
        if (this.fer < 9 || this.pierre < 14) {
            this.infocraft7.setColor('#0');
        }

        ourGame.events.on('craft',
            function() {
                //console.log("c");
                this.carremenu.setVisible(true);
                this.crafttexte.setVisible(true);
                this.infocraft2.setVisible(true);
                this.infocraft3.setVisible(true);
                this.infocraft4.setVisible(true);
                this.infocraft5.setVisible(true);
                this.infocraft6.setVisible(true);
                this.infocraft7.setVisible(true);

            },
            this);

        ourGame.events.on('nocraft',
            function() {
                //console.log("no c");
                this.carremenu.setVisible(false);
                this.crafttexte.setVisible(false);

                this.infocraft2.setVisible(false);
                this.infocraft3.setVisible(false);
                this.infocraft4.setVisible(false);
                this.infocraft5.setVisible(false);
                this.infocraft6.setVisible(false);
                this.infocraft7.setVisible(false);

            },
            this);

    }

}