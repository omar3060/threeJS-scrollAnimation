import React from "react";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { AxesHelper } from 'three';
import { Watch } from "./Watch";

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ progress }) => {
  const cameraRef = useRef(null);
  useFrame(() => {
    // console.log(cameraRef.current.position)
    cameraRef.current.lookAt(0, 0, 0);
  });
  useEffect(() => {
    const updateCamPos = () => {
      const positions = [
        [3.5, 2.17, 3.7],
        [3.7, 0.6, 0.7],
        [2.3, 0.87, -4.2],
        [0, 2.5, 3.6],
      ];

      if (progress >= 1) {
        gsap.to(cameraRef.current.position, {
          x:0,
          y:2.5,
          z:3.6,
          duration:.5,
          ease: 'power1.out'
        })
      }else {
        const segmentProgress = 1/3
      const segmentIndex = Math.floor(progress/ segmentProgress )
      console.log(segmentIndex)
      const percentage = (progress%segmentProgress)/segmentProgress
      console.log(percentage)
      const [startX, startY, startZ] = positions[segmentIndex]
      const [endX, endY, endZ] = positions[segmentIndex + 1]
      const x = startX + (endX - startX) * percentage
      const y = startY + (endY - startY) * percentage
      const z = startZ + (endZ - startZ) * percentage
      gsap.to(cameraRef.current.position, {
        x,
        y,
        z,
        duration:.5,
        ease: 'power1.out'
      })
      }
    };
    updateCamPos()
  }, [progress, cameraRef.current]);
  return (
    <>
      {/* <OrbitControls/> */}
      <PerspectiveCamera
        ref={cameraRef}
        fov={45}
        near={0.1}
        far={10000}
        makeDefault
        position={[3.5, 2.17, 3.7]}
        // position={[3.7, .6, .7]}
        // position={[2.3, .87, -4.2]}
        // position={[0, 2.5, 3.6]}
      />
      <Environment preset="city" />
      <Watch />
      {/* <axesHelper args={[500]} /> */}
    </>
  );
};

export default Scene;
