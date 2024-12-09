import React, { useRef, useState } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
  const [mousedown, setMousedown] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const { nodes } = useGLTF("/medias/torrus.glb");
  const { viewport } = useThree()
  const torus = useRef(null);

  useFrame( () => {
    torus.current.rotation.x += velocity.x / 100;
    torus.current.rotation.y += velocity.y / 100;
    setVelocity({ x: velocity.x * 0.95, y: velocity.y * 0.95 });
  })

  const materialProps = useControls({
      thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
      roughness: { value: 0, min: 0, max: 1, step: 0.1 },
      transmission: {value: 1, min: 0.8, max: 1, step: 0.01},
      ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
      chromaticAberration: { value: 0.02, min: 0, max: 1},
      backside: { value: true},
  })

  return (
    <group
      scale={viewport.width / 3.75}
      onPointerDown={() => setMousedown(true)}
      onPointerUp={() => setMousedown(false)}
      onPointerLeave={() => setMousedown(false)}
      onPointerMove={(e) => {
        if (mousedown) setVelocity({ x: e.movementX, y: e.movementY });
      }}
    >
      <Text font={'/fonts/PPNeueMontreal-Bold.otf'} position={[0, 0, -1]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
        @ericvalxik
      </Text>
      <mesh ref={torus} {...nodes.Torus002}>
        <MeshTransmissionMaterial {...materialProps}/>
      </mesh>
    </group>
  )
}
