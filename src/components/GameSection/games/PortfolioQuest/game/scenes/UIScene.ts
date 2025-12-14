import * as Phaser from 'phaser';

class UIScene extends Phaser.Scene {
  private pauseButton!: Phaser.GameObjects.Text;
  private pauseMenu!: Phaser.GameObjects.Container;
  private isPaused: boolean = false;

  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Create pause button
    this.pauseButton = this.add.text(750, 20, '⏸️', {
      fontSize: '24px',
      padding: { x: 8, y: 4 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.togglePause());

    // Create pause menu (initially hidden)
    this.createPauseMenu();

    // ESC key for pause
    this.input.keyboard!.on('keydown-ESC', () => {
      this.togglePause();
    });
  }

  createPauseMenu() {
    const menuBackground = this.add.rectangle(400, 300, 400, 300, 0x1f2937, 0.95);
    
    const titleText = this.add.text(400, 200, 'GAME PAUSED', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Inter, Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const resumeButton = this.add.text(400, 280, 'RESUME', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#3b82f6',
      padding: { x: 20, y: 10 },
      fontFamily: 'Inter, Arial, sans-serif'
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.togglePause())
    .on('pointerover', () => resumeButton.setStyle({ backgroundColor: '#2563eb' }))
    .on('pointerout', () => resumeButton.setStyle({ backgroundColor: '#3b82f6' }));

    const menuButton = this.add.text(400, 340, 'MAIN MENU', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#6b7280',
      padding: { x: 20, y: 10 },
      fontFamily: 'Inter, Arial, sans-serif'
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.returnToMenu())
    .on('pointerover', () => menuButton.setStyle({ backgroundColor: '#4b5563' }))
    .on('pointerout', () => menuButton.setStyle({ backgroundColor: '#6b7280' }));

    const controlsText = this.add.text(400, 420, 
      'WASD/Arrow Keys: Move\nSPACE: Jump\nESC: Pause', {
      fontSize: '14px',
      color: '#94a3b8',
      fontFamily: 'Inter, Arial, sans-serif',
      align: 'center'
    }).setOrigin(0.5);

    this.pauseMenu = this.add.container(0, 0, [
      menuBackground,
      titleText,
      resumeButton,
      menuButton,
      controlsText
    ]);

    this.pauseMenu.setVisible(false);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      // Pause the game scene
      this.scene.pause('GameScene');
      this.pauseMenu.setVisible(true);
      this.pauseButton.setText('▶️');
      
      // Add blur effect to pause button to indicate paused state
      this.tweens.add({
        targets: this.pauseMenu,
        alpha: { from: 0, to: 1 },
        scale: { from: 0.8, to: 1 },
        duration: 200,
        ease: 'Back.out'
      });
    } else {
      // Resume the game scene
      this.scene.resume('GameScene');
      this.pauseMenu.setVisible(false);
      this.pauseButton.setText('⏸️');
    }
  }

  returnToMenu() {
    // Stop current scenes and return to menu
    this.scene.stop('GameScene');
    this.scene.start('MenuScene');
    this.isPaused = false;
    this.pauseMenu.setVisible(false);
    this.pauseButton.setText('⏸️');
  }

  update() {
    // UI scene update logic if needed
  }
}

export default UIScene;
