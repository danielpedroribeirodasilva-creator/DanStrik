import { usePlane, useBox } from '@react-three/cannon';
import { Sky } from '@react-three/drei';

// Mapa estilo Voxel/Minecraft
export const BlockWorld = () => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], 
    position: [0, -2, 0],
    material: { friction: 0.0 } 
  }));

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />

      {/* Chão Grid */}
      <mesh ref={ref as any} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5ea15e" /> {/* Grama Voxel */}
      </mesh>

      {/* Obstáculos Voxel */}
      <VoxelBox position={[5, 0, -5]} color="#888" size={[2, 4, 2]} />
      <VoxelBox position={[-5, 0, -10]} color="#a64d4d" size={[4, 2, 4]} />
      <VoxelBox position={[0, 0, -15]} color="#4d7aa6" size={[8, 3, 1]} />
      
      {/* Rampa */}
      <VoxelBox position={[10, -1, -10]} color="#555" size={[4, 1, 4]} />
      <VoxelBox position={[11, 0, -10]} color="#555" size={[2, 1, 4]} />
    </>
  );
};

const VoxelBox = ({ position, color, size }: { position: number[], color: string, size: number[] }) => {
  const [ref] = useBox(() => ({ mass: 0, position, args: size.map(s => s/2) })); // Cannon usa half-extents
  return (
    <mesh ref={ref as any} castShadow receiveShadow>
      <boxGeometry args={size as any} />
      <meshStandardMaterial color={color} />
      {/* Borda preta para efeito cartoon */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color="black" linewidth={2} />
      </lineSegments>
    </mesh>
  );
};

import * as THREE from 'three';
