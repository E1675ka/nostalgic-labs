import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

function AnimatedText() {
  const text = ["creativity", "technology", "strategy", "digital", "solutions"];

  // Set initial state for the index of the word to be shown
  const [index, setIndex] = useState(0);

  // Define animation for each word
  const springProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(40px)" }, // Increased distance for smoother motion
    config: { tension: 100, friction: 25 }, // Lower tension and higher friction for smoother, slower animations
    reset: true,
    onRest: () => {
      // Advance to the next word when the animation finishes
      setIndex((prevIndex) => (prevIndex + 1) % text.length);
    },
  });

  return (
    <div className="w-400px flex gap-4">
      {/* Render the current word with animation */}
      <animated.h1
        className="text-2xl font-bold text-purple-500 sm:text-[16px]"
        style={springProps}
      >
        {text[index]}
      </animated.h1>
    </div>
  );
}

export default AnimatedText;
