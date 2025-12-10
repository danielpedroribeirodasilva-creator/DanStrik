import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { useGameStore } from '../store/gameStore';
import { VoxelWeapon } from '../components/game/VoxelWeapon';

const SPEED = 6;
const JUMP_FORCE = 5;

export const Player = () => {
  const { camera } = useThree();
  const { shoot, reload, primaryWeapon } = useGameStore();
  const [isShooting, setIsShooting] = useState(false);
  
  const [ref, api] = useSphere(() => ({ 
    mass: 1, 
    type: 'Dynamic', 
    position: [0, 5, 0],
    fixedRotation: true,
    linearDamping: 0.1,
    args: [0.5]
  }));

  const velocity = useRef([0, 0, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => api.position.subscribe((p) => (pos.current = p)), [api.position]);

  // Movement Logic
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': moveForward.current = true; break;
        case 'KeyS': moveBackward.current = true; break;
        case 'KeyA': moveLeft.current = true; break;
        case 'KeyD': moveRight.current = true; break;
        case 'Space': 
          if (Math.abs(velocity.current[1]) < 0.05) api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
          break;
        case 'KeyR': reload(); break;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': moveForward.current = false; break;
        case 'KeyS': moveBackward.current = false; break;
        case 'KeyA': moveLeft.current = false; break;
        case 'KeyD': moveRight.current = false; break;
      }
    };
    const onMouseDown = () => {
      setIsShooting(true);
      shoot();
      // Auto fire simulation would go here
    };
    const onMouseUp = () => setIsShooting(false);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [api, shoot, reload]);

  useFrame(() => {
    if (!ref.current) return;

    // Sync camera
    camera.position.copy(new Vector3(pos.current[0], pos.current[1] + 0.8, pos.current[2]));

    // Calculate movement direction
    const direction = new Vector3();
    const frontVector = new Vector3(0, 0, Number(moveBackward.current) - Number(moveForward.current));
    const sideVector = new Vector3(Number(moveLeft.current) - Number(moveRight.current), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);
  });

  return (
    <group>
      <mesh ref={ref as any} />
      {/* Weapon attached to camera view */}
      <mesh position={[pos.current[0], pos.current[1] + 0.8, pos.current[2]]} rotation={camera.rotation}>
         <VoxelWeapon type={primaryWeapon} isShooting={isShooting} />
      </mesh>
    </group>
  );
};
