import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  // Load the Earth model using useGLTF hook
  const earth = useGLTF("./planet/scene.gltf");



  return (
    <primitive
      object={earth.scene}
      scale={1.5} // Increase the scale to make it larger
      position={[0, 0, 0]} // Position the object at the center
      position-y={0} rotation-y={0} // Rotation
    />
  );
};

const EarthCanvas = () => {
  const [cameraPosition, setCameraPosition] = useState([0, 5, 15]); // Camera position
  
  return (
    <div className=" w-full h-screen"> {/* Ensure parent div takes full screen */}
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: cameraPosition, // Camera positioned properly
        }}
         // Ensure canvas takes full width and height
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Lights for better illumination */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[-5, 5, 5]} intensity={1} />

          {/* The Earth Model */}
          <Earth />

          {/* Preload all assets */}
          <Preload all />

          {/* Orbit Controls */}
          <OrbitControls 
           autoRotate
          enableZoom={false}
           maxPolarAngle={Math.PI / 2}
           minPolarAngle={Math.PI / 2}
            />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
