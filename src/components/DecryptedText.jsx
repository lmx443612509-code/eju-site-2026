import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 15,
  characters = 'アカサタナハマヤラワ1234567890!<>-_\\/[]{}—=+*^?#_',
  className = '',
  delay = 0,
}) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeout;
    let interval;
    let currentIteration = 0;

    // 初始清空，等待 delay 后执行
    setDisplayText('');

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '; // 保持空格不乱码
              if (index < currentIteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (currentIteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text); // 【绝对底线】：动画结束强制输出原文
        }

        currentIteration += text.length / maxIterations;
      }, speed);
    };

    timeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, maxIterations, characters, delay]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayText}
    </motion.span>
  );
}