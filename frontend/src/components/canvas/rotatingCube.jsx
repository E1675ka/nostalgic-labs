import React, { useRef, useEffect } from "react";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

const ObjWithMaterial = ({ objPath }) => {
  const obj = useLoader(OBJLoader, objPath);
  const objRef = useRef();

  // Add material to all meshes in the model
  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "purple",
        metalness: 0.5,
        roughness: 0.5,
        emissive: "#65039e",
        emissiveIntensity: 1,
      });
    }
  });

  // Auto-rotate the object using useFrame hook
  useFrame(() => {
    if (objRef.current) {
      objRef.current.rotation.y += 0.01; // Rotates around the Y-axis
    }
  });

  return <primitive ref={objRef} object={obj} />;
};

const FitToObject = ({ children }) => {
  const { camera, scene } = useThree();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);
    const distance = maxSize / (2 * Math.tan((camera.fov * Math.PI) / 360));
    camera.position.set(center.x, center.y, center.z + distance * 1.5);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
  }, [camera, scene]);

  return <group>{children}</group>;
};

const ResponsiveCanvas = () => {
  const containerRef = useRef();

  const handleResize = () => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      const canvas = containerRef.current.querySelector("canvas");
      if (canvas) {
        canvas.style.width = `${clientWidth}px`;
        canvas.style.height = `${clientHeight}px`;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Trigger resize on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "400px" }} // Full width and height
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ width: "600px", height: "100%" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Controls */}
        <OrbitControls />

        {/* Responsive Object */}
        <FitToObject>
          <ObjWithMaterial objPath="/assets/abstract_object.obj" />
        </FitToObject>
      </Canvas>
    </div>
  );
};

export default ResponsiveCanvas;
