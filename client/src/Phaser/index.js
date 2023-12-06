// Web
import '../style.css';
import './helpers/chat.js';

// Phaser
import Phaser from 'phaser'

// Scenes
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import Scene3 from './scenes/Scene3';

// our game's configuration
const config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 800, // game width
  height: 800, // game height
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: 0x000022,
  parent: 'phaser',
  scene: [Scene1, Scene2, Scene3],
  physics: {
    default: "arcade",
    arcade : { debug:false, enableBody: true,}
  }
}

// create the game, and pass it the configuration
var game = new Phaser.Game(config);









