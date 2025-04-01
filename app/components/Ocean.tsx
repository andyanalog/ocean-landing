// components/Ocean.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import * as THREE from 'three';

// Water surface component
function Ocean() {
  const { viewport } = useThree();
  // For TypeScript, use React.RefObject<THREE.Mesh> instead of MeshRef
  const mesh = useRef<THREE.Mesh>(null);
  
  // Animation for wave effect
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const time = clock.getElapsedTime();
    const position = (mesh.current.geometry as THREE.BufferGeometry).attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      // Create a wave pattern
      const wave1 = 0.1 * Math.sin(x * 0.5 + time * 0.7);
      const wave2 = 0.05 * Math.sin(y * 0.8 + time * 0.5);
      const wave3 = 0.07 * Math.sin(x * 0.2 + y * 0.3 + time * 0.3);
      
      position.setZ(i, wave1 + wave2 + wave3);
    }
    
    position.needsUpdate = true;
  });
  
  return (
    <mesh 
      ref={mesh} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2, 0]}
    >
      <planeGeometry args={[viewport.width * 4, viewport.height * 4, 128, 128]} />
      <meshStandardMaterial 
        color="#0047AB"
        transparent={true}
        opacity={0.8}
        roughness={0.3}
        metalness={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Environment setup including sky and lights
function Environment() {
  return (
    <>
      {/* Add a realistic sky */}
      <Sky 
        distance={450000} 
        sunPosition={[0, 1, 0]} 
        inclination={0.1}
        azimuth={0.25}
        rayleigh={1}
      />
      
      {/* Lights for better visual effect */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[1, 8, 2]} 
        intensity={1.2} 
        color="#ffffff"
        castShadow 
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#b6ceff" />
      
      {/* Slight fog for depth effect */}
      <fog attach="fog" args={['#94c5ff', 1, 50]} />
    </>
  );
}

export default function OceanAnimation() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <Environment />
        <Ocean />
      </Canvas>
    </div>
  );
}