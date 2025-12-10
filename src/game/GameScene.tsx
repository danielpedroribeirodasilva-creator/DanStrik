import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { PointerLockControls, Stars } from '@react-three/drei';
import { BlockWorld } from './BlockWorld';
import { Player } from './Player';
import { GameHUD } from './GameHUD';
import { Suspense, useState, useEffect } from 'react';
import { Bot } from './Bot';
import { useGameStore } from '../store/gameStore';

export const GameScene = () => {
  const { gameMode } = useGameStore();
  const [bots, setBots] = useState<number[][]>([]);

  // Initialize bots
  useEffect(() => {
    // Generate random positions for bots
    const newBots = Array.from({ length: 5 }).map(() => [
      (Math.random() - 0.5) * 20,
      5,
      (Math.random() - 0.5) * 20
    ]);
    setBots(newBots);
  }, []);

  // Player position ref to pass to bots (simplified for demo)
  const playerPos = { current: [0, 0, 0] };

  return (
    <div className="w-full h-screen bg-black relative cursor-none">
      <GameHUD />
      
      <Canvas shadows camera={{ fov: 90 }}>
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.8, 0]}> {/* Earth Gravity for fast paced FPS */}
            <BlockWorld />
            <Player />
            
            {/* Render Bots if not Solo */}
            {gameMode !== 'FFA' && bots.map((pos, i) => (
              <Bot key={i} position={pos as [number, number, number]} playerPos={playerPos as any} />
            ))}
          </Physics>
          <PointerLockControls />
          <Stars />
        </Suspense>
      </Canvas>
      
      <div className="absolute top-4 right-4 text-white/30 text-xs font-mono select-none">
        [ESC] MENU | [WASD] MOVER | [SPACE] PULAR | [CLICK] ATIRAR
      </div>
    </div>
  );
};
