import React, { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
    const { nodes } = useGLTF("/medias/torrus5.glb");
    const torus = useRef(null);
    const node = nodes.Torus002
    
    useFrame( () => {
        torus.current.rotation.x += 0.02
    })

    const materialProps = useControls({
      thickness: { value: 5, min: 0, max: 20 },
      roughness: { value: 0, min: 0, max: 1, step: 0.1 },
      transmission: {value: 1, min: 0, max: 1, step: 0.1},
      ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
      chromaticAberration: { value: 0.02, min: 0, max: 1},
    })
    
    return (
        <mesh 
          ref={torus}
          {...node}
        >
          <MeshTransmissionMaterial 
            {...materialProps}
          />
        </mesh>
    )
}
