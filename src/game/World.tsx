import { usePlane } from '@react-three/cannon';
import { Stars, Sky } from '@react-three/drei';

export const World = () => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], 
    position: [0, -2, 0],
    material: { friction: 0.1 } // Low friction for moon slide feel
  }));

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.1} mieCoefficient={0.005} mieDirectionalG={0.8} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Moon Surface */}
      <mesh ref={ref as any} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Ambient Light for Space */}
      <ambientLight intensity={0.3} color="#ccccff" />
      <directionalLight position={[10, 50, 20]} intensity={1.5} castShadow />
      
      {/* Some Craters/Obstacles */}
      <mesh position={[10, 0, -10]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 5]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      <mesh position={[-15, 2, -20]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 4, 8, 8]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </>
  );
};
