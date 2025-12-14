import * as Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private skillTokens!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { [key: string]: Phaser.Input.Keyboard.Key };
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private clouds!: Phaser.GameObjects.Group;
  
  // Game state
  private tokensCollected: number = 0;
  private currentLevel: number = 1;
  private gameText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Assets loaded in GameManager
  }

  create() {
    // Add background
    this.add.image(400, 300, 'background');

    // Create world bounds
    this.physics.world.bounds.width = 800;
    this.physics.world.bounds.height = 600;

    // Create background clouds
    this.createBackgroundElements();

    // Create platforms
    this.createPlatforms();

    // Create player
    this.createPlayer();

    // Create collectibles
    this.createSkillTokens();

    // Set up controls
    this.setupControls();

    // Create UI text
    this.createUI();

    // Camera setup
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    // Fade in effect
    this.cameras.main.fadeIn(500, 0, 0, 0);

    // Game instructions
    this.showInstructions();
  }

  createBackgroundElements() {
    this.clouds = this.add.group();
    
    for (let i = 0; i < 4; i++) {
      const cloud = this.add.image(
        Phaser.Math.Between(100, 700),
        Phaser.Math.Between(50, 200),
        'cloud'
      ).setAlpha(0.2);
      
      this.clouds.add(cloud);
      
      this.tweens.add({
        targets: cloud,
        x: cloud.x + Phaser.Math.Between(-30, 30),
        duration: Phaser.Math.Between(4000, 6000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    // Ground platforms
    this.platforms.create(400, 568, 'platform').setScale(12.5, 1).refreshBody();
    
    // Floating platforms - creating a simple level layout
    this.platforms.create(150, 450, 'platform').setScale(3, 1).refreshBody();
    this.platforms.create(350, 350, 'platform').setScale(3, 1).refreshBody();
    this.platforms.create(550, 400, 'platform').setScale(3, 1).refreshBody();
    this.platforms.create(650, 250, 'platform').setScale(3, 1).refreshBody();
    this.platforms.create(200, 200, 'platform').setScale(4, 1).refreshBody();

    // Set platform tint to match portfolio colors
    this.platforms.children.entries.forEach((platform) => {
      (platform as Phaser.Physics.Arcade.Sprite).setTint(0x475569);
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1);

    // Player physics
    this.physics.add.collider(this.player, this.platforms);

    // Player animations would go here if we had sprite sheets
    // For now, we'll use tinting for movement feedback
  }

  createSkillTokens() {
    this.skillTokens = this.physics.add.group({
      key: 'skillToken',
      repeat: 8,
      setXY: { x: 200, y: 0, stepX: 70 }
    });

    this.skillTokens.children.entries.forEach((child, index: number) => {
      const token = child as Phaser.Physics.Arcade.Sprite;
      token.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
      
      // Position tokens on platforms
      const positions = [
        { x: 150, y: 400 },
        { x: 350, y: 300 },
        { x: 550, y: 350 },
        { x: 650, y: 200 },
        { x: 200, y: 150 },
        { x: 300, y: 150 },
        { x: 700, y: 500 },
        { x: 500, y: 500 },
        { x: 50, y: 500 }
      ];

      if (positions[index]) {
        token.setPosition(positions[index].x, positions[index].y);
      }

      // Add floating animation
      this.tweens.add({
        targets: token,
        y: token.y - 10,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: index * 200
      });

      // Add rotation
      this.tweens.add({
        targets: token,
        rotation: Math.PI * 2,
        duration: 3000,
        repeat: -1,
        ease: 'Linear'
      });
    });

    // Collider for collecting tokens
    this.physics.add.collider(this.skillTokens, this.platforms);
    this.physics.add.overlap(this.player, this.skillTokens, this.collectToken, undefined, this);
  }

  setupControls() {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys('W,S,A,D') as { [key: string]: Phaser.Input.Keyboard.Key };
    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  createUI() {
    this.levelText = this.add.text(16, 16, `Level: ${this.currentLevel}`, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Inter, Arial, sans-serif',
      backgroundColor: '#1f2937',
      padding: { x: 8, y: 4 }
    }).setScrollFactor(0);

    this.gameText = this.add.text(16, 50, `Skill Tokens: ${this.tokensCollected}`, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Inter, Arial, sans-serif',
      backgroundColor: '#1f2937',
      padding: { x: 8, y: 4 }
    }).setScrollFactor(0);
  }

  showInstructions() {
    const instructions = this.add.text(400, 100, 'Collect all skill tokens to unlock portfolio sections!', {
      fontSize: '16px',
      color: '#fbbf24',
      fontFamily: 'Inter, Arial, sans-serif',
      backgroundColor: '#1f2937',
      padding: { x: 12, y: 8 },
      align: 'center'
    }).setOrigin(0.5).setScrollFactor(0);

    // Fade out instructions after 3 seconds
    this.tweens.add({
      targets: instructions,
      alpha: 0,
      duration: 1000,
      delay: 3000,
      onComplete: () => instructions.destroy()
    });
  }

  collectToken(_player: Phaser.Physics.Arcade.Sprite, token: Phaser.Physics.Arcade.Sprite) {
    token.disableBody(true, true);
    this.tokensCollected++;
    
    // Update UI
    this.gameText.setText(`Skill Tokens: ${this.tokensCollected}`);

    // Show collection feedback
    const collectText = this.add.text(token.x, token.y, '+1 Skill!', {
      fontSize: '14px',
      color: '#fbbf24',
      fontFamily: 'Inter, Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: collectText,
      y: collectText.y - 50,
      alpha: 0,
      duration: 800,
      onComplete: () => collectText.destroy()
    });

    // Check if all tokens collected
    if (this.tokensCollected >= 9) {
      this.completeLevel();
    }
  }

  completeLevel() {
    const completionText = this.add.text(400, 300, 
      'Level Complete!\nYou\'ve explored the skills section!\n\nPress SPACE to continue', {
      fontSize: '24px',
      color: '#10b981',
      fontFamily: 'Inter, Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center',
      backgroundColor: '#1f2937',
      padding: { x: 20, y: 15 }
    }).setOrigin(0.5).setScrollFactor(0);

    this.tweens.add({
      targets: completionText,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Enable level progression
    this.input.keyboard!.once('keydown-SPACE', () => {
      this.nextLevel();
    });
  }

  nextLevel() {
    this.currentLevel++;
    this.scene.restart();
  }

  update() {
    // Player movement
    const player = this.player;
    
    // Reset player tint
    player.setTint(0x3b82f6);

    // Horizontal movement
    if (this.cursors.left?.isDown || this.wasd.A?.isDown) {
      player.setVelocityX(-160);
      player.setTint(0x2563eb); // Darker blue when moving
    } else if (this.cursors.right?.isDown || this.wasd.D?.isDown) {
      player.setVelocityX(160);
      player.setTint(0x2563eb); // Darker blue when moving
    } else {
      player.setVelocityX(0);
    }

    // Jumping
    if ((this.cursors.up?.isDown || this.wasd.W?.isDown || this.spaceKey?.isDown) && player.body?.touching.down) {
      player.setVelocityY(-330);
    }
  }
}

export default GameScene;
