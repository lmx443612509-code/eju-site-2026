"use client"

import React, { useState, useEffect } from 'react';
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import HeroSection from '../components/HeroSection';
import UniversitiesSection from '../components/UniversitiesSection';
import PastExamsSection from '../components/PastExamsSection';
import InfoSection from '../components/InfoSection';
import SignupModal from '../components/SignupModal';
import LoginModal from '../components/LoginModal';
import AIAssistantModal from '../components/AIAssistantModal';
import CurriculumSection from '../components/CurriculumSection'; 
import { motion, AnimatePresence } from "framer-motion"; 

import SplashScreen from '../components/SplashScreen'; 

const universityData = [
  { id: 1, tier: 'T1', name: '东京大学', type: '国立', location: '东京' },
  { id: 2, tier: 'T1', name: '京都大学', type: '国立', location: '京都' },
  { id: 6, tier: 'T1', name: '早稻田大学', type: '私立', location: '东京' },
  { id: 8, tier: 'T2', name: '神户大学', type: '国立', location: '神户' },
  { id: 11, tier: 'T4', name: '明治大学', type: '私立', location: '东京' },
];

// 👑 视差溶解引擎：负责监听滚动，实现上滑淡出、下滑淡入的高级效果
const FadeSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    // amount: 0.15 表示当元素有 15% 进入视口时开始淡入，离开视口只剩 15% 时开始淡出
    viewport={{ once: false, amount: 0.15 }} 
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="w-full flex flex-col items-center justify-center"
  >
    {children}
  </motion.div>
);

export default function LandingPage() {
  const [showGlobalIntro, setShowGlobalIntro] = useState(true);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false); 
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('ALL');

  useEffect(() => {
    const isAnyModalOpen = isCourseOpen || isVaultOpen || isSignupOpen || isLoginOpen || isAIOpen || showGlobalIntro;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'unset';
  }, [isCourseOpen, isVaultOpen, isSignupOpen, isLoginOpen, isAIOpen, showGlobalIntro]);

  const handleSwitchToLogin = () => { setIsSignupOpen(false); setTimeout(() => setIsLoginOpen(true), 200); };
  const handleSwitchToSignup = () => { setIsLoginOpen(false); setTimeout(() => setIsSignupOpen(true), 200); };

  const filteredUnis = selectedTier === 'ALL' ? universityData : universityData.filter(u => u.tier === selectedTier);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#0a192f] text-white selection:bg-[#38bdf8] selection:text-white">

      {/* 👑 全局 SVG 光刻滤镜 (保持不变，支持玻璃材质) */}
      <svg className="fixed inset-0 w-0 h-0 pointer-events-none z-[-2]">
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
            <feDisplacementMap in="SourceGraphic" in2="softMap" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {showGlobalIntro && (
        <SplashScreen onComplete={() => setShowGlobalIntro(false)} />
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showGlobalIntro ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full min-h-screen z-10"
      >
        {/* 👑 恢复：全局冰川星空背景 */}
        <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
          <MeshGradient className="absolute inset-0 w-full h-full z-0 pointer-events-none" colors={["#0a192f", "#1e3a8a", "#0284c7", "#38bdf8", "#bae6fd"]} speed={0.25} />
          <MeshGradient className="absolute inset-0 w-full h-full opacity-30" colors={["#000000", "#ffffff", "#0a192f", "#000000"]} speed={0.15} />
        </div>

        {/* 👑 核心布局：砸碎暗色遮罩，全部换成 FadeSection 视差溶解 */}
        <motion.div 
          animate={{ 
            scale: (isCourseOpen || isVaultOpen) ? 0.95 : 1, 
            opacity: (isCourseOpen || isVaultOpen) ? 0 : 1,
            filter: (isCourseOpen || isVaultOpen) ? "blur(30px)" : "blur(0px)",
            pointerEvents: (isCourseOpen || isVaultOpen) ? "none" : "auto" 
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full flex flex-col items-center"
        >
          {/* 每一页都独立溶解，互不干扰，直接透出底部星球渐变 */}
          <FadeSection>
            <HeroSection onOpenModal={() => setIsCourseOpen(true)} onOpenSignup={() => setIsSignupOpen(true)} />
          </FadeSection>

          <FadeSection>
            <div className="w-full max-w-[1440px] mx-auto pt-10">
              <UniversitiesSection onOpenVault={() => setIsVaultOpen(true)} />
            </div>
          </FadeSection>

          <FadeSection>
            <div className="w-full max-w-[1440px] mx-auto">
              <PastExamsSection />
            </div>
          </FadeSection>

          <FadeSection>
            <div className="w-full max-w-[1440px] mx-auto">
              <InfoSection />
            </div>
          </FadeSection>

        </motion.div>

        {/* 👑 全局 AI 助手悬浮 */}
        <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[90] pointer-events-auto">
          <motion.div 
            onClick={() => setIsAIOpen(true)} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity duration-500 z-10">
              <PulsingBorder 
                colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700"]} 
                colorBack="#00000000" speed={1.5} roundness={1} thickness={0.1} softness={0.2} intensity={5} spotsPerColor={5} spotSize={0.1} pulse={0.1} smoke={0.5} smokeSize={4} scale={0.65} rotation={0} frame={9161408} 
                style={{ width: "100%", height: "100%", borderRadius: "50%" }} 
              />
            </div>
            <motion.svg className="absolute inset-0 w-full h-full text-white/50 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none" viewBox="0 0 100 100" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} style={{ transform: "scale(1.7)" }}><defs><path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs><text className="text-[10px] font-semibold tracking-[0.22em]" fill="currentColor"><textPath href="#circle" startOffset="0%">奇点 EJU AI 助手 • 奇点 EJU AI 助手 • 奇点 EJU AI 助手 • </textPath></text></motion.svg>
          </motion.div>
        </div>

        {/* 弹窗逻辑保持绝对原样 */}
        <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} onSwitchToLogin={handleSwitchToLogin} />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignup={handleSwitchToSignup} />
        <AIAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

        <AnimatePresence>
          {isCourseOpen && (
            <motion.div 
              initial={{ clipPath: "circle(0% at 50% 50%)" }} animate={{ clipPath: "circle(150% at 50% 50%)" }} exit={{ clipPath: "circle(0% at 50% 50%)" }}
              transition={{ duration: 0.8 }} className="fixed inset-0 z-[100] bg-black" 
            >
              <CurriculumSection onClose={() => setIsCourseOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isVaultOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[60] flex flex-col bg-black/60 backdrop-blur-3xl p-10 lg:p-20 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-10">
                <div>
                  <h2 className="text-4xl font-light tracking-tighter text-white">INTELLIGENCE <span className="text-[#38bdf8] font-bold">MATRIX</span></h2>
                  <p className="text-white/20 text-[9px] tracking-[0.6em] uppercase mt-1">奇点 EJU 院校数据实时监测系统</p>
                </div>
                <button onClick={() => setIsVaultOpen(false)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/40 hover:text-white transition-all">✕</button>
              </div>
              <div className="flex-grow flex gap-10 overflow-hidden">
                <div className="hidden lg:flex flex-col gap-2 w-32">
                  {['ALL', 'T1', 'T2', 'T3', 'T4', 'T5'].map(t => (
                    <button key={t} onClick={() => setSelectedTier(t)} className={`text-left text-[10px] tracking-widest py-3 px-4 rounded transition-all ${selectedTier === t ? 'bg-[#38bdf8] text-white' : 'text-white/20 hover:text-white'}`}>{t}</button>
                  ))}
                </div>
                <div className="flex-grow overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                  {filteredUnis.map((uni) => (
                    <div key={uni.id} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all">
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-bold text-[#38bdf8] w-8">{uni.tier}</span>
                        <span className="text-lg text-white/80 font-medium">{uni.name}</span>
                        <span className="text-[9px] text-white/20 tracking-widest uppercase">{uni.type} / {uni.location}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white/5 rounded text-[9px] text-white/40 hover:text-white border border-white/5">官网</button>
                        <button className="px-3 py-1.5 bg-white/5 rounded text-[9px] text-white/40 hover:text-white border border-white/5">网申</button>
                        <button className="px-3 py-1.5 bg-white/5 rounded text-[9px] text-white/40 hover:text-white border border-white/5">真题</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.3); }
      `}</style>
    </div>
  );
}