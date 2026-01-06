'use client';

import { useEffect, useRef, useState } from 'react';

interface GameState {
  screen: 'menu' | 'playing' | 'paused' | 'levelComplete' | 'gameComplete';
  currentLevel: number;
  totalLevels: number;
  player: PlayerState;
  platforms: Platform[];
  collectibles: Collectible[];
  particles: Particle[];
  keys: KeyState;
  score: number;
  levelScore: number;
  achievements: string[];
  message: string;
  camera: { x: number; y: number };
}

interface PlayerState {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  onGround: boolean;
  speed: number;
  jumpPower: number;
  facing: 'left' | 'right';
  animFrame: number;
  animTimer: number;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'normal' | 'moving' | 'disappearing';
  color: string;
}

interface Collectible {
  x: number;
  y: number;
  collected: boolean;
  type: 'skill' | 'achievement' | 'bonus';
  value: number;
  pulseTimer: number;
  skillName?: string;
  icon?: string;
}

interface Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface KeyState {
  left: boolean;
  right: boolean;
  up: boolean;
  space: boolean;
  escape: boolean;
}

const PortfolioQuest = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameLoaded, setGameLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Enhanced game state with multiple levels and features
    const gameState: GameState = {
      screen: 'menu',
      currentLevel: 1,
      totalLevels: 4,
      player: {
        x: 100,
        y: 450,
        width: 32,
        height: 32,
        velocityX: 0,
        velocityY: 0,
        onGround: false,
        speed: 5,
        jumpPower: -15,
        facing: 'right',
        animFrame: 0,
        animTimer: 0
      },
      platforms: [],
      collectibles: [],
      particles: [],
      keys: {
        left: false,
        right: false,
        up: false,
        space: false,
        escape: false
      },
      score: 0,
      levelScore: 0,
      achievements: [],
      message: "Welcome to Portfolio Quest!",
      camera: { x: 0, y: 0 }
    };

    // Level configurations with specific skills and technologies
    const levels = {
      1: { // Hero Section
        name: "Welcome Valley",
        description: "Begin your journey through Henry's portfolio",
        platforms: [
          { x: 0, y: 568, width: 800, height: 32, type: 'normal' as const, color: '#6b7280' },
          { x: 150, y: 450, width: 150, height: 16, type: 'normal' as const, color: '#6b7280' },
          { x: 400, y: 350, width: 150, height: 16, type: 'normal' as const, color: '#6b7280' },
          { x: 600, y: 450, width: 150, height: 16, type: 'normal' as const, color: '#6b7280' },
        ],
        collectibles: [
          { x: 200, y: 400, type: 'skill' as const, value: 10, skillName: 'HTML', icon: '🌐' },
          { x: 450, y: 300, type: 'skill' as const, value: 10, skillName: 'CSS', icon: '🎨' },
          { x: 650, y: 400, type: 'achievement' as const, value: 25, skillName: 'Frontend', icon: '🏆' },
        ]
      },
      2: { // Skills Section
        name: "Technology Mountain",
        description: "Climb through the tech stack",
        platforms: [
          { x: 0, y: 568, width: 800, height: 32, type: 'normal' as const, color: '#3b82f6' },
          { x: 100, y: 480, width: 120, height: 16, type: 'normal' as const, color: '#3b82f6' },
          { x: 300, y: 400, width: 120, height: 16, type: 'normal' as const, color: '#3b82f6' },
          { x: 500, y: 320, width: 120, height: 16, type: 'normal' as const, color: '#3b82f6' },
          { x: 200, y: 240, width: 120, height: 16, type: 'normal' as const, color: '#3b82f6' },
          { x: 400, y: 160, width: 120, height: 16, type: 'normal' as const, color: '#3b82f6' },
        ],
        collectibles: [
          { x: 150, y: 430, type: 'skill' as const, value: 15, skillName: 'JavaScript', icon: '⚡' },
          { x: 350, y: 350, type: 'skill' as const, value: 15, skillName: 'React', icon: '⚛️' },
          { x: 550, y: 270, type: 'skill' as const, value: 15, skillName: 'Node.js', icon: '🚀' },
          { x: 250, y: 190, type: 'skill' as const, value: 15, skillName: 'TypeScript', icon: '📘' },
          { x: 450, y: 110, type: 'achievement' as const, value: 50, skillName: 'Fullstack', icon: '🏆' },
        ]
      },
      3: { // Experience Section
        name: "Career Timeline",
        description: "Navigate through professional milestones",
        platforms: [
          { x: 0, y: 568, width: 800, height: 32, type: 'normal' as const, color: '#10b981' },
          { x: 50, y: 450, width: 100, height: 16, type: 'normal' as const, color: '#10b981' },
          { x: 250, y: 380, width: 100, height: 16, type: 'normal' as const, color: '#10b981' },
          { x: 450, y: 310, width: 100, height: 16, type: 'normal' as const, color: '#10b981' },
          { x: 650, y: 240, width: 100, height: 16, type: 'normal' as const, color: '#10b981' },
          { x: 350, y: 170, width: 200, height: 16, type: 'normal' as const, color: '#10b981' },
        ],
        collectibles: [
          { x: 100, y: 400, type: 'skill' as const, value: 20, skillName: 'Next.js', icon: '▲' },
          { x: 300, y: 330, type: 'skill' as const, value: 20, skillName: 'Python', icon: '🐍' },
          { x: 500, y: 260, type: 'skill' as const, value: 20, skillName: 'AWS', icon: '☁️' },
          { x: 700, y: 190, type: 'bonus' as const, value: 30, skillName: 'DevOps', icon: '💎' },
          { x: 450, y: 120, type: 'achievement' as const, value: 75, skillName: 'Senior Dev', icon: '🏆' },
        ]
      },
      4: { // Projects Section
        name: "Innovation Lab",
        description: "Explore cutting-edge projects",
        platforms: [
          { x: 0, y: 568, width: 800, height: 32, type: 'normal' as const, color: '#8b5cf6' },
          { x: 100, y: 480, width: 80, height: 16, type: 'normal' as const, color: '#8b5cf6' },
          { x: 280, y: 420, width: 80, height: 16, type: 'normal' as const, color: '#8b5cf6' },
          { x: 460, y: 360, width: 80, height: 16, type: 'normal' as const, color: '#8b5cf6' },
          { x: 640, y: 300, width: 80, height: 16, type: 'normal' as const, color: '#8b5cf6' },
          { x: 520, y: 240, width: 80, height: 16, type: 'normal' as const, color: '#8b5cf6' },
          { x: 300, y: 180, width: 200, height: 16, type: 'normal' as const, color: '#8b5cf6' },
        ],
        collectibles: [
          { x: 140, y: 430, type: 'skill' as const, value: 25, skillName: 'Docker', icon: '🐳' },
          { x: 320, y: 370, type: 'skill' as const, value: 25, skillName: 'GraphQL', icon: '🔗' },
          { x: 500, y: 310, type: 'skill' as const, value: 25, skillName: 'MongoDB', icon: '🍃' },
          { x: 680, y: 250, type: 'bonus' as const, value: 40, skillName: 'AI/ML', icon: '💎' },
          { x: 560, y: 190, type: 'bonus' as const, value: 40, skillName: 'Microservices', icon: '💎' },
          { x: 400, y: 130, type: 'achievement' as const, value: 100, skillName: 'Tech Lead', icon: '🏆' },
        ]
      }
    };

    // Initialize current level
    const initLevel = (levelNum: number) => {
      const levelData = levels[levelNum as keyof typeof levels];
      if (!levelData) return;

      gameState.platforms = levelData.platforms.map(p => ({ ...p }));
      gameState.collectibles = levelData.collectibles.map((c, i) => ({
        x: c.x,
        y: c.y,
        collected: false,
        type: c.type,
        value: c.value,
        pulseTimer: i * 0.5,
        skillName: c.skillName,
        icon: c.icon
      }));
      gameState.particles = [];
      gameState.levelScore = 0;
      gameState.message = levelData.description;
      
      // Reset player position
      gameState.player.x = 100;
      gameState.player.y = 450;
      gameState.player.velocityX = 0;
      gameState.player.velocityY = 0;
      gameState.player.onGround = false;
    };

    // Enhanced input handling for menu and game
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept keys if user is typing in an input, textarea, or contenteditable element
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (gameState.screen === 'menu') {
        if (e.code === 'Space' || e.code === 'Enter') {
          gameState.screen = 'playing';
          initLevel(gameState.currentLevel);
        } else if (e.code === 'Digit1' || e.code === 'Numpad1') {
          gameState.currentLevel = 1;
        } else if (e.code === 'Digit2' || e.code === 'Numpad2') {
          gameState.currentLevel = 2;
        } else if (e.code === 'Digit3' || e.code === 'Numpad3') {
          gameState.currentLevel = 3;
        } else if (e.code === 'Digit4' || e.code === 'Numpad4') {
          gameState.currentLevel = 4;
        }
        return;
      }

      // Game controls
      switch(e.code) {
        case 'KeyA':
        case 'ArrowLeft':
          gameState.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          gameState.keys.right = true;
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'Space':
          gameState.keys.up = true;
          gameState.keys.space = true;
          e.preventDefault();
          break;
        case 'Escape':
          gameState.screen = 'menu';
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Don't intercept keys if user is typing in an input, textarea, or contenteditable element
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (gameState.screen === 'menu') return;

      switch(e.code) {
        case 'KeyA':
        case 'ArrowLeft':
          gameState.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          gameState.keys.right = false;
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'Space':
          gameState.keys.up = false;
          gameState.keys.space = false;
          break;
      }
    };

    // Collision detection
    const checkCollision = (rect1: { x: number; y: number; width: number; height: number }, rect2: { x: number; y: number; width: number; height: number }) => {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
    };

    // Update game logic
    const update = () => {
      const player = gameState.player;

      // Apply gravity
      player.velocityY += 0.8;
      
      // Handle input
      if (gameState.keys.left) {
        player.x -= player.speed;
        player.facing = 'left';
      }
      if (gameState.keys.right) {
        player.x += player.speed;
        player.facing = 'right';
      }
      if (gameState.keys.up && player.onGround) {
        player.velocityY = player.jumpPower;
        player.onGround = false;
      }

      // Update position
      player.y += player.velocityY;
      
      // Keep player in bounds
      player.x = Math.max(0, Math.min(800 - player.width, player.x));
      
      // Reset ground state
      player.onGround = false;
      
      // Check platform collisions
      gameState.platforms.forEach(platform => {
        if (checkCollision(player, platform)) {
          // Landing on top of platform
          if (player.velocityY > 0 && player.y < platform.y) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.onGround = true;
          }
        }
      });

      // Ground collision
      if (player.y > canvas.height - 32 - player.height) {
        player.y = canvas.height - 32 - player.height;
        player.velocityY = 0;
        player.onGround = true;
      }

      // Check collectible collection
      gameState.collectibles.forEach((collectible) => {
        if (!collectible.collected) {
          const distance = Math.sqrt(
            Math.pow(player.x + 16 - (collectible.x + 12), 2) + 
            Math.pow(player.y + 16 - (collectible.y + 12), 2)
          );
          if (distance < 25) {
            collectible.collected = true;
            gameState.score += collectible.value;
            gameState.levelScore += collectible.value;
            
            // Create particles for collection effect
            for (let i = 0; i < 5; i++) {
              gameState.particles.push({
                x: collectible.x + 10,
                y: collectible.y + 10,
                velocityX: (Math.random() - 0.5) * 4,
                velocityY: (Math.random() - 0.5) * 4,
                life: 30,
                maxLife: 30,
                size: Math.random() * 4 + 2,
                color: collectible.type === 'skill' ? '#3b82f6' : 
                       collectible.type === 'bonus' ? '#f59e0b' : '#10b981'
              });
            }
            
            // Set appropriate message based on collectible type with skill name
            if (collectible.type === 'achievement') {
              const skillName = collectible.skillName || 'Achievement';
              gameState.message = `🏆 ${skillName} unlocked! +${collectible.value} points`;
              gameState.achievements.push(`${skillName} Master`);
            } else if (collectible.type === 'bonus') {
              const skillName = collectible.skillName || 'Bonus';
              gameState.message = `💎 ${skillName} collected! +${collectible.value} points`;
            } else {
              const skillName = collectible.skillName || 'Skill token';
              gameState.message = `⚡ ${skillName} mastered! +${collectible.value} points`;
            }
            
            // Check if level is complete
            const levelComplete = gameState.collectibles.every(c => c.collected);
            if (levelComplete) {
              setTimeout(() => {
                if (gameState.currentLevel < gameState.totalLevels) {
                  gameState.currentLevel++;
                  initLevel(gameState.currentLevel);
                  gameState.message = `🎮 Level ${gameState.currentLevel}: ${levels[gameState.currentLevel as keyof typeof levels].name}`;
                } else {
                  gameState.message = "🎉 Congratulations! Portfolio Quest Complete!";
                }
              }, 1500);
            }
          }
        }
      });

      // Update particles
      gameState.particles = gameState.particles.filter(particle => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.life--;
        particle.velocityX *= 0.99; // friction
        particle.velocityY += 0.1; // gravity
        return particle.life > 0;
      });
    };

    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw background elements
      ctx.fillStyle = '#475569';
      for (let i = 0; i < 5; i++) {
        ctx.globalAlpha = 0.2;
        ctx.fillRect(100 + i * 150, 50 + Math.sin(Date.now() * 0.001 + i) * 20, 80, 30);
      }
      ctx.globalAlpha = 1;

      // Draw platforms
      gameState.platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        // Platform shine effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(platform.x, platform.y, platform.width, 4);
      });

      // Draw collectibles with skill names and icons
      gameState.collectibles.forEach(collectible => {
        if (!collectible.collected) {
          collectible.pulseTimer += 0.1;
          const pulse = Math.sin(collectible.pulseTimer) * 0.2 + 1;
          
          // Set color based on collectible type
          if (collectible.type === 'skill') {
            ctx.fillStyle = '#3b82f6';
          } else if (collectible.type === 'bonus') {
            ctx.fillStyle = '#f59e0b';
          } else if (collectible.type === 'achievement') {
            ctx.fillStyle = '#10b981';
          }
          
          ctx.beginPath();
          ctx.arc(collectible.x + 12, collectible.y + 12, 12 * pulse, 0, Math.PI * 2);
          ctx.fill();
          
          // Collectible shine effect
          ctx.fillStyle = collectible.type === 'skill' ? '#60a5fa' : 
                          collectible.type === 'bonus' ? '#fbbf24' : '#34d399';
          ctx.beginPath();
          ctx.arc(collectible.x + 8, collectible.y + 8, 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw skill icon and name
          ctx.fillStyle = '#ffffff';
          ctx.font = '16px monospace';
          ctx.textAlign = 'center';
          
          // Display custom icon if available, otherwise use default
          const displayIcon = collectible.icon || (
            collectible.type === 'skill' ? '⚡' : 
            collectible.type === 'bonus' ? '💎' : '🏆'
          );
          ctx.fillText(displayIcon, collectible.x + 12, collectible.y + 16);
          
          // Display skill name if available, with boundary checking
          if (collectible.skillName) {
            ctx.font = 'bold 10px Inter, Arial, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            
            // Check if text would go outside canvas bounds
            const textWidth = ctx.measureText(collectible.skillName).width;
            const textX = collectible.x + 12;
            const textY = collectible.y + 35;
            
            // Adjust position if text would go outside canvas
            let adjustedX = textX;
            if (textX - textWidth/2 < 5) {
              adjustedX = textWidth/2 + 5; // Left boundary
            } else if (textX + textWidth/2 > canvas.width - 5) {
              adjustedX = canvas.width - textWidth/2 - 5; // Right boundary
            }
            
            // Only draw if within vertical bounds
            if (textY > 15 && textY < canvas.height - 15) {
              ctx.strokeText(collectible.skillName, adjustedX, textY);
              ctx.fillText(collectible.skillName, adjustedX, textY);
            }
          }
        }
      });

      // Draw particles
      gameState.particles.forEach(particle => {
        const alpha = particle.life / particle.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha
      });

      // Draw player
      const player = gameState.player;
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(player.x, player.y, player.width, player.height);
      
      // Player eyes
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(player.x + 8, player.y + 8, 4, 4);
      ctx.fillRect(player.x + 20, player.y + 8, 4, 4);
      
      // Movement feedback
      if (gameState.keys.left || gameState.keys.right) {
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(player.x, player.y, player.width, player.height);
      }

      // Draw UI
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px Inter, Arial, sans-serif';
      ctx.textAlign = 'left';
      const totalCollectibles = gameState.collectibles.length;
      const collectedCount = gameState.collectibles.filter(c => c.collected).length;
      const uiText = `Level ${gameState.currentLevel}/${gameState.totalLevels} - Score: ${gameState.score} - Collected: ${collectedCount}/${totalCollectibles}`;
      
      // Ensure UI text fits within canvas
      const uiTextWidth = ctx.measureText(uiText).width;
      if (uiTextWidth > canvas.width - 40) {
        ctx.font = '14px Inter, Arial, sans-serif';
      }
      ctx.fillText(uiText, 20, 30);
      
      // Draw message with proper sizing
      ctx.font = '16px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      const messageWidth = ctx.measureText(gameState.message).width;
      const maxMessageWidth = canvas.width - 40; // Leave 20px margin on each side
      
      // Adjust font size if message is too long
      if (messageWidth > maxMessageWidth) {
        ctx.font = '14px Inter, Arial, sans-serif';
        const newMessageWidth = ctx.measureText(gameState.message).width;
        if (newMessageWidth > maxMessageWidth) {
          ctx.font = '12px Inter, Arial, sans-serif';
        }
      }
      
      const finalMessageWidth = ctx.measureText(gameState.message).width;
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect((canvas.width - finalMessageWidth) / 2 - 15, 80, finalMessageWidth + 30, 30);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillText(gameState.message, canvas.width / 2, 100);
    };

    // Menu rendering function
    const renderMenu = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Title
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 36px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio Quest', canvas.width / 2, 150);
      
      // Subtitle
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px Inter, Arial, sans-serif';
      ctx.fillText('Navigate through Henry\'s professional journey', canvas.width / 2, 180);
      
      // Instructions
      ctx.font = '16px Inter, Arial, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Desktop: Use WASD or Arrow Keys to move, SPACE to jump', canvas.width / 2, 250);
      ctx.fillText('Mobile: Touch left/right sides to move, top center to jump', canvas.width / 2, 275);
      ctx.fillText('Collect specific skills like JS ⚡, React ⚛️, AWS ☁️, and more!', canvas.width / 2, 300);
      
      // Start button
      const buttonWidth = 200;
      const buttonHeight = 50;
      const buttonX = (canvas.width - buttonWidth) / 2;
      const buttonY = 350;
      
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Inter, Arial, sans-serif';
      ctx.fillText('Start Quest', canvas.width / 2, buttonY + 32);
      
      // Level selection
      ctx.font = '14px Inter, Arial, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Press 1-4 to select starting level', canvas.width / 2, 450);
      
      // Level previews
      const levelNames = Object.entries(levels).map(([num, level]) => `${num}: ${level.name}`);
      levelNames.forEach((name, index) => {
        ctx.fillStyle = gameState.currentLevel === index + 1 ? '#3b82f6' : '#6b7280';
        ctx.font = '12px Inter, Arial, sans-serif';
        ctx.fillText(name, canvas.width / 2, 470 + index * 20);
      });
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (gameState.screen === 'menu') {
        renderMenu();
      } else if (gameState.screen === 'playing') {
        update();
        render();
      }
      
      requestAnimationFrame(gameLoop);
    };

    // Touch control handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;
      
      // Scale touch coordinates
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const scaledX = touchX * scaleX;
      const scaledY = touchY * scaleY;
      
      if (gameState.screen === 'menu') {
        // Check if touching start button area
        const buttonX = (canvas.width - 200) / 2;
        const buttonY = 350;
        if (scaledX >= buttonX && scaledX <= buttonX + 200 && 
            scaledY >= buttonY && scaledY <= buttonY + 50) {
          gameState.screen = 'playing';
          initLevel(gameState.currentLevel);
        }
        return;
      }
      
      // Game controls - divide screen into zones
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      if (scaledX < centerX / 2) {
        // Left side - move left
        gameState.keys.left = true;
      } else if (scaledX > centerX + centerX / 2) {
        // Right side - move right
        gameState.keys.right = true;
      } else if (scaledY < centerY) {
        // Top center - jump
        gameState.keys.up = true;
        gameState.keys.space = true;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      if (gameState.screen === 'menu') return;
      
      // Reset all movement keys on touch end
      gameState.keys.left = false;
      gameState.keys.right = false;
      gameState.keys.up = false;
      gameState.keys.space = false;
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);

    // Start game
    setGameLoaded(true);
    gameLoop();

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full">
      {!gameLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg z-10">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-lg">Loading Portfolio Quest...</p>
            <p className="text-sm text-gray-400 mt-2">Preparing your interactive experience</p>
          </div>
        </div>
      )}
      <canvas 
        ref={canvasRef}
        className="w-full h-auto max-w-full rounded-lg bg-gray-900"
        style={{ aspectRatio: '4/3' }}
      />
    </div>
  );
};

export default PortfolioQuest;