import * as Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
  private titleText!: Phaser.GameObjects.Text;
  private startButton!: Phaser.GameObjects.Text;
  private instructionsText!: Phaser.GameObjects.Text;
  private backgroundTween!: Phaser.Tweens.Tween;

  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    // Assets are loaded in GameManager
  }

  create() {
    // Add background
    this.add.image(400, 300, 'background');

    // Add floating clouds for ambiance
    this.createFloatingClouds();

    // Title
    this.titleText = this.add.text(400, 150, 'PORTFOLIO QUEST', {
      fontSize: '48px',
      color: '#3b82f6',
      fontFamily: 'Inter, Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(400, 200, 'An Interactive Journey Through Henry\'s Portfolio', {
      fontSize: '18px',
      color: '#94a3b8',
      fontFamily: 'Inter, Arial, sans-serif'
    }).setOrigin(0.5);

    // Start button
    this.startButton = this.add.text(400, 300, 'START QUEST', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#3b82f6',
      padding: { x: 20, y: 10 },
      fontFamily: 'Inter, Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startGame())
    .on('pointerover', () => this.startButton.setStyle({ backgroundColor: '#2563eb' }))
    .on('pointerout', () => this.startButton.setStyle({ backgroundColor: '#3b82f6' }));

    // Instructions
    this.instructionsText = this.add.text(400, 450, 
      'Use WASD or Arrow Keys to move\nSPACE to interact\nCollect skill tokens and explore!', {
      fontSize: '16px',
      color: '#64748b',
      fontFamily: 'Inter, Arial, sans-serif',
      align: 'center',
      lineSpacing: 5
    }).setOrigin(0.5);

    // Add some personality with floating skill tokens
    this.createFloatingTokens();

    // Add pulsing animation to start button
    this.tweens.add({
      targets: this.startButton,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  createFloatingClouds() {
    for (let i = 0; i < 3; i++) {
      const cloud = this.add.image(
        Phaser.Math.Between(100, 700),
        Phaser.Math.Between(50, 150),
        'cloud'
      ).setAlpha(0.3);

      this.tweens.add({
        targets: cloud,
        x: cloud.x + Phaser.Math.Between(-50, 50),
        y: cloud.y + Phaser.Math.Between(-20, 20),
        duration: Phaser.Math.Between(3000, 5000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  createFloatingTokens() {
    for (let i = 0; i < 5; i++) {
      const token = this.add.image(
        Phaser.Math.Between(100, 700),
        Phaser.Math.Between(350, 550),
        'skillToken'
      ).setAlpha(0.4);

      this.tweens.add({
        targets: token,
        y: token.y - 20,
        rotation: Math.PI * 2,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: i * 400
      });
    }
  }

  startGame() {
    // Play a transition effect
    this.cameras.main.fadeOut(500, 0, 0, 0);
    
    this.time.delayedCall(500, () => {
      this.scene.start('GameScene');
    });
  }

  update() {
    // Menu scene doesn't need update logic
  }
}

export default MenuScene;
