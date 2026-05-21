import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 确保 FloatingLines 路径正确
import FloatingLines from './FloatingLines'; 

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 4秒后自动开始退场动画
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // 文字入场的分段控制（Stagger）
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8, // 前后半句入场的时间间隔
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="splash-screen-container"
          onClick={() => setIsVisible(false)} 
          initial={{ opacity: 1 }}
          // 🚀 穿透奇点退场：放大、失焦、溶解
          exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',  // 👑 强制锁定视口宽度
            height: '100vh', // 👑 强制锁定视口高度
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            overflow: 'hidden',
            cursor: 'pointer'
          }}
        >
          {/* 👑 霸王条款样式：强制镇压内部 Canvas 的幽灵黑边 */}
          <style>{`
            .splash-canvas-wrapper canvas {
              display: block !important;
              width: 100vw !important;
              height: 100vh !important;
              object-fit: cover;
            }
          `}</style>

          {/* 1. 动态线条背景层 (层级 1) */}
          <div className="splash-canvas-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
            <FloatingLines
              linesGradient={["#4bcc16", "#06c3d4", "#000000"]}
              animationSpeed={1}
              interactive={false}
              bendRadius={8}
              bendStrength={-2}
              mouseDamping={0.05}
              parallax={true}
              parallaxStrength={0.2}
            />
          </div>

          {/* 2. 文本层 (层级 2) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'row', 
              alignItems: 'center',
              whiteSpace: 'nowrap',
              color: '#E6EDF2', 
              fontSize: '26px', 
              letterSpacing: '0.3em', 
              paddingLeft: '0.3em', 
              fontWeight: 300,
              pointerEvents: 'none',
              textShadow: `
                0 0 10px rgba(0,0,0,1), 
                0 0 15px rgba(0,0,0,1), 
                0 0 30px rgba(6, 195, 212, 0.2)
              ` 
            }}
          >
            <motion.span variants={itemVariants}>奇点之后，</motion.span>
            <motion.span variants={itemVariants}>一切才真正开始</motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;