import * as Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';

class GameManager extends Phaser.Scene {
  constructor() {
    super({ key: 'GameManager' });
  }

  preload() {
    // Create simple colored rectangles as placeholders for sprites
    this.load.image('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    
    // Create pixel art style rectangles for the game
    this.createPlayerSprite();
    this.createPlatformSprite();
    this.createCollectibleSprite();
    this.createBackgroundElements();
  }

  createPlayerSprite() {
    // Create a 32x32 blue player sprite
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0x3b82f6); // Blue color matching portfolio
    playerGraphics.fillRect(0, 0, 32, 32);
    playerGraphics.fillStyle(0xffffff); // White for eyes
    playerGraphics.fillRect(8, 8, 4, 4);
    playerGraphics.fillRect(20, 8, 4, 4);
    playerGraphics.generateTexture('player', 32, 32);
    playerGraphics.destroy();
  }

  createPlatformSprite() {
    // Create platform sprites
    const platformGraphics = this.add.graphics();
    platformGraphics.fillStyle(0x6b7280); // Gray platform
    platformGraphics.fillRect(0, 0, 64, 16);
    platformGraphics.generateTexture('platform', 64, 16);
    platformGraphics.destroy();
  }

  createCollectibleSprite() {
    // Create skill token collectible
    const collectibleGraphics = this.add.graphics();
    collectibleGraphics.fillStyle(0xfbbf24); // Gold color
    collectibleGraphics.fillCircle(12, 12, 12);
    collectibleGraphics.fillStyle(0xf59e0b); // Darker gold outline
    collectibleGraphics.lineStyle(2, 0xf59e0b);
    collectibleGraphics.strokeCircle(12, 12, 12);
    collectibleGraphics.generateTexture('skillToken', 24, 24);
    collectibleGraphics.destroy();
  }

  createBackgroundElements() {
    // Create background elements
    const bgGraphics = this.add.graphics();
    bgGraphics.fillStyle(0x1e293b); // Dark blue background
    bgGraphics.fillRect(0, 0, 800, 600);
    bgGraphics.generateTexture('background', 800, 600);
    bgGraphics.destroy();

    // Create cloud sprite
    const cloudGraphics = this.add.graphics();
    cloudGraphics.fillStyle(0x475569, 0.6); // Semi-transparent gray
    cloudGraphics.fillCircle(20, 15, 15);
    cloudGraphics.fillCircle(40, 15, 20);
    cloudGraphics.fillCircle(60, 15, 15);
    cloudGraphics.generateTexture('cloud', 80, 30);
    cloudGraphics.destroy();
  }

  create() {
    // Add other scenes to the scene manager
    this.scene.add('MenuScene', MenuScene, false);
    this.scene.add('GameScene', GameScene, false);
    this.scene.add('UIScene', UIScene, false);
    
    // Start with the Menu Scene
    this.scene.start('MenuScene');
    
    // Add UI Scene as an overlay
    this.scene.launch('UIScene');
    
    // Game data initialization
    this.registry.set('playerProgress', {
      level: 1,
      skillTokens: 0,
      achievements: [],
      currentSection: 'hero'
    });

    // Add keyboard controls info to registry
    this.registry.set('gameControls', {
      movement: ['W', 'A', 'S', 'D', '↑', '↓', '←', '→'],
      action: ['SPACE'],
      pause: ['ESC']
    });
  }
}

export default GameManager;
