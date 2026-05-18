"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { PulsingBorder } from "@paper-design/shaders-react"

export default function AIAssistantModal({ isOpen, onClose }) {
  const [input, setInput] = useState("");

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const panelVariants = {
    hidden: { 
      scale: 0.8, 
      x: 180, 
      y: 280, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 95,   
        damping: 22,     
        mass: 1,
        delay: 0.05      
      }
    },
    exit: { 
      scale: 0.8, 
      x: 180, 
      y: 280, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 24
      }
    }
  };

  return (
    <MotionConfig reducedMotion="never">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="ai-modal-root"
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
            // 🔪 核心修复：删除了导致毛玻璃失效的 willChange: "opacity"
          >
            {/* 背景毛玻璃 */}
            <motion.div 
              variants={backdropVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 bg-black/40 backdrop-blur-2xl" 
              onClick={onClose} 
            />

            {/* 核心操作台面板 */}
            <motion.div
              variants={panelVariants}
              style={{ 
                transformOrigin: "bottom right" 
                // 🔪 核心修复：删除了导致渲染崩溃的 willChange: "transform, opacity"
              }}
              // 💎 视觉升级：面板本身加上 backdrop-blur-xl 和 bg-white/[0.04]，双重毛玻璃质感拉满
              className="relative w-full max-w-4xl h-[85vh] flex flex-col bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden z-10"
            >
              {/* 顶部状态栏 */}
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.8)]"></span>
                   <span className="text-white/80 text-xs tracking-[0.3em] font-medium uppercase">Singularity AI · 已接入</span>
                 </div>
                 <button onClick={onClose} className="text-white/20 hover:text-white transition-colors group">
                   <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg>
                 </button>
              </div>

              {/* 激光雕刻对话区 */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto flex flex-col gap-10 custom-scrollbar">
                 <div className="flex items-start gap-5">
                   
                   {/* 缩小版彩灯头像本体 */}
                   <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] mt-1 overflow-hidden relative">
                      <div className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none">
                          <PulsingBorder 
                              colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700"]} 
                              colorBack="#00000000" 
                              speed={1.0} 
                              roundness={1} thickness={0.1} softness={0.2} intensity={5} spotsPerColor={5} spotSize={0.1} pulse={0.1} smoke={0.5} smokeSize={4} scale={0.65} rotation={0} 
                              style={{ width: "100%", height: "100%", borderRadius: "inherit" }} 
                          />
                      </div>
                   </div>

                   <div className="flex-1">
                      <p 
                        className="text-white/90 text-base md:text-lg leading-relaxed tracking-widest" 
                        style={{ 
                          fontFamily: "'Noto Serif SC', serif",
                          textShadow: "0 2px 8px rgba(255, 255, 255, 0.15)"
                        }}
                      >
                        您好！Singularity AI 系统已就绪。<br />
                        今天你想深度解析哪套真题，或者需要我为你规划专项冲刺？<br /><br/>
                        <span className="text-white/40 text-sm font-sans tracking-wider">在下方输入或粘贴题目即可开始。</span>
                      </p>
                   </div>
                 </div>
              </div>

              {/* 灵动输入底线 */}
              <div className="p-8 md:p-12 pt-0">
                <div className="relative group flex items-center bg-white/[0.02] rounded-2xl hover:bg-white/[0.04] transition-colors duration-300">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="输入你的问题，或粘贴需要解析的真题..."
                    className="w-full bg-transparent text-white/90 placeholder:text-white/20 text-sm md:text-base tracking-widest px-6 py-5 outline-none"
                  />
                  <button className="absolute right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-focus-within:bg-[#00e5ff]/10 group-focus-within:border-[#00e5ff]/30 transition-all duration-300 hover:scale-105 active:scale-95">
                     <svg className="w-5 h-5 text-white/40 group-focus-within:text-[#00e5ff] transform group-focus-within:-translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeWidth="2" /></svg>
                  </button>
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/5 transition-colors duration-300 group-hover:bg-white/10"></div>
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff]/80 to-transparent scale-x-0 group-focus-within:scale-x-100 origin-center transition-transform duration-700 ease-out"></div>
                </div>
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}