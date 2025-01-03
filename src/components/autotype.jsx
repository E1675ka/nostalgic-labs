import React, { useState, useEffect } from 'react';
const AutoTyping = ({ text, speed = 200 }) => {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else {
        setIndex(0);
        setTypedText('');
      }
    }, speed);

    // Clean up interval on component unmount
    return () => clearInterval(typingInterval);
  }, [index, text, speed]);

  return <div>{typedText}</div>;
};


const AutoType = () => {


  const text = `Where Nostalgia Meets Digital Innovation`;
  return (
    <div>
      <AutoTyping  text={text} speed={200} s/>
    </div>
  );
};

export default AutoType;