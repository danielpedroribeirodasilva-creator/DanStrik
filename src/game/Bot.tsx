import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import { Html } from '@react-three/drei';

export const Bot = ({ position, playerPos }: { position: [number, number, number], playerPos: React.MutableRefObject<number[]> }) => {
  const [ref, api] = useSphere(() => ({ 
    mass: 1, 
    position, 
    args: [0.8],
    type: 'Dynamic' 
  }));
  
  const [health, setHealth] = useState(100);
  const isDead = health <= 0;

  useFrame(() => {
    if (isDead) return;

    // IA Simples: Mover em direção ao jogador
    const currentPos = new Vector3();
    // Nota: Em produção, usaríamos subscrição de posição, simplificado aqui
    
    // Movimento aleatório + perseguição lenta
    if (Math.random() > 0.95) {
       const dirX = playerPos.current[0] > (ref.current?.position.x || 0) ? 1 : -1;
       const dirZ = playerPos.current[2] > (ref.current?.position.z || 0) ? 1 : -1;
       api.velocity.set(dirX * 2, 4, dirZ * 2); // Pulo pequeno
    }
  });

  if (isDead) return null;

  return (
    <mesh ref={ref as any} castShadow>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="red" />
      <Html position={[0, 2.5, 0]} center>
        <div className="w-16 h-2 bg-black border border-white">
          <div className="h-full bg-red-500" style={{ width: `${health}%` }} />
        </div>
      </Html>
    </mesh>
  );
};
