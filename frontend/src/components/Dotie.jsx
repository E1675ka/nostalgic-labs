import React from 'react';
import Lottie from "lottie-react";
import animationData from './../assets/techmation.json'
import {useRef} from "react"
const Dot = () => {
  return (
    <Lottie
    animationData={animationData}
    
      loop
      autoplay
      style={{ width: 300, height: 300 }} 
    />
  );
};
console.log(Dot);

export default Dot;