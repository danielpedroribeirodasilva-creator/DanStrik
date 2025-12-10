import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

// Componente visual procedural para armas estilo Voxel
export const VoxelWeapon = ({ type = 'rifle', isShooting }: { type: string, isShooting: boolean }) => {
  const group = useRef<any>();

  useFrame((state) => {
    if (!group.current) return;
    
    // Animação de recuo
    if (isShooting) {
      group.current.position.z = 0.2; // Recuo para trás
      group.current.rotation.x = 0.1; // Gun kick
    } else {
      // Voltar ao normal suavemente
      group.current.position.z = state.clock.getElapsedTime() % 1 * 0.02; // Idle sway
      group.current.rotation.x = 0;
    }
  });

  if (type.includes('Pistol')) {
    return (
      <group ref={group} position={[0.3, -0.3, -0.5]}>
        {/* Corpo da Pistola */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 0.15, 0.4]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {/* Cano */}
        <mesh position={[0, 0.05, -0.2]}>
          <boxGeometry args={[0.08, 0.08, 0.1]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      </group>
    );
  }

  // Default Rifle (AK Voxel style)
  return (
    <group ref={group} position={[0.4, -0.4, -0.6]}>
      {/* Corpo Principal */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 0.15, 0.6]} />
        <meshStandardMaterial color="#8B4513" /> {/* Madeira */}
      </mesh>
      {/* Cano */}
      <mesh position={[0, 0.05, -0.4]}>
        <boxGeometry args={[0.05, 0.05, 0.6]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Magazine */}
      <mesh position={[0, -0.15, 0.1]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.12]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
};
