import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import GameManager from './game/GameManager';

const PhaserGameComponent = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameRef.current || gameInstanceRef.current) return;

    try {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current,
        backgroundColor: '#1a1a2e',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
          }
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 800,
          height: 600
        },
        scene: GameManager,
        render: {
          antialias: true,
          pixelArt: false
        }
      };

      gameInstanceRef.current = new Phaser.Game(config);
      setGameLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize game');
      console.error('Game initialization error:', err);
    }

    // Cleanup function
    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        setGameLoaded(false);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-6">
          <div className="text-red-500 text-lg mb-2">⚠️ Game Loading Error</div>
          <p className="text-gray-600 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

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
      <div 
        ref={gameRef} 
        className="w-full min-h-[600px] rounded-lg overflow-hidden"
        style={{ aspectRatio: '4/3' }}
      />
    </div>
  );
};

export default PhaserGameComponent;
