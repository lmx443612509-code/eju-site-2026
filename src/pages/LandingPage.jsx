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

const FadeSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: false, amount: 0.15 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="w-full flex flex-col items-center justify-center"
  >
    {children}
  </motion.div>
);

export default function LandingPage() {
  const [isPopoutMode, setIsPopoutMode] = useState(false);
  // 全局沉浸式模态框控制状态
  const [isGlobalAIOpen, setIsGlobalAIOpen] = useState(false); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'ai-only') {
      setIsPopoutMode(true);
      document.title = "林远 · 专属推演空间";
    }
  }, []);

  const [showGlobalIntro, setShowGlobalIntro] = useState(true);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('eju_global_intro_played') === 'true') {
        setShowGlobalIntro(false);
      }
      if (sessionStorage.getItem('eju_course_open') === 'true') {
        setIsCourseOpen(true);
      }
      if (sessionStorage.getItem('eju_vault_open') === 'true') {
        setIsVaultOpen(true);
      }
      setIsClientLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isClientLoaded) {
      sessionStorage.setItem('eju_course_open', isCourseOpen);
    }
  }, [isCourseOpen, isClientLoaded]);

  useEffect(() => {
    if (isClientLoaded) {
      sessionStorage.setItem('eju_vault_open', isVaultOpen);
    }
  }, [isVaultOpen, isClientLoaded]);

  const handleGlobalIntroComplete = () => {
    setShowGlobalIntro(false);
    sessionStorage.setItem('eju_global_intro_played', 'true');
  };

  useEffect(() => {
    const isAnyModalOpen = isCourseOpen || isVaultOpen || isSignupOpen || isLoginOpen || showGlobalIntro || isGlobalAIOpen;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'unset';
  }, [isCourseOpen, isVaultOpen, isSignupOpen, isLoginOpen, showGlobalIntro, isGlobalAIOpen]);

  const handleSwitchToLogin = () => { setIsSignupOpen(false); setTimeout(() => setIsLoginOpen(true), 200); };
  const handleSwitchToSignup = () => { setIsLoginOpen(false); setTimeout(() => setIsSignupOpen(true), 200); };
  const filteredUnis = selectedTier === 'ALL' ? universityData : universityData.filter(u => u.tier === selectedTier);

  if (isPopoutMode) {
    return (
      <div className="w-screen h-screen bg-black overflow-hidden">
        <AIAssistantModal isOpen={true} onClose={() => window.close()} />
      </div>
    );
  }

  if (!isClientLoaded) {
    return <div className="w-screen h-screen bg-black" />;
  }

  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" /></filter>
      </svg>

      {showGlobalIntro && (
        <SplashScreen onComplete={handleGlobalIntroComplete} />
      )}
            
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showGlobalIntro ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full min-h-screen z-10"
      >
        {/* === 核心修复：流光背景容器升级为 fixed 固定沉底，完美消除黑色视差断层 === */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <MeshGradient className="w-full h-full" colors={["#0a192f", "#1e3a8a", "#0284c7", "#38bdf8", "#bae6fd"]} speed={0.25} />
          <MeshGradient className="absolute inset-0 w-full h-full opacity-30" colors={["#000000", "#ffffff", "#0a192f", "#000000"]} speed={0.15} />
        </div>

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
          <FadeSection>
            <HeroSection onOpenModal={() => setIsCourseOpen(true)} onOpenSignup={() => setIsSignupOpen(true)} />
          </FadeSection>
          
          <FadeSection>
            <UniversitiesSection onOpenVault={() => setIsVaultOpen(true)} />
          </FadeSection>

          {/* === 核心修复：重新挂载因回退意外丢失的真题区与信息区 === */}
          <FadeSection>
            <PastExamsSection />
          </FadeSection>

          <FadeSection>
            <InfoSection />
          </FadeSection>
        </motion.div>

        {/* === 核心修复：彩灯点击回归沉浸式模态框模式 === */}
        <motion.div
          onClick={() => setIsGlobalAIOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[90] group w-16 h-16 md:w-24 md:h-24 flex items-center justify-center cursor-pointer"
        >
          <PulsingBorder
            colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700"]}
            colorBack="#00000000" speed={1.5} roundness={1} thickness={0.1} softness={0.2} intensity={5} spotsPerColor={5} spotSize={0.1} pulse={0.1} smoke={0.5} smokeSize={4} scale={0.65} rotation={0} frame={9161408}
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
          <motion.svg className="absolute inset-0 w-full h-full text-white/50 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none" viewBox="0 0 100 100" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} style={{ transform: "scale(1.7)" }}>
            <defs><path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
            <text className="text-[10px] font-semibold tracking-[0.22em]" fill="currentColor">
              <textPath href="#circle" startOffset="0%">奇点 EJU AI 助手 • 奇点 EJU AI 助手 • 奇点 EJU AI 助手 • </textPath>
            </text>
          </motion.svg>
        </motion.div>

        <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} onSwitchToLogin={handleSwitchToLogin} />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignup={handleSwitchToSignup} />

        <AnimatePresence>
          {isCourseOpen && (
            <motion.div
              initial={{ clipPath: "circle(0% at 50% 50%)" }} 
              animate={{ clipPath: "circle(150% at 50% 50%)" }} 
              exit={{ clipPath: "circle(0% at 50% 50%)" }}
              transition={{ duration: 0.8 }} 
              className="fixed inset-0 z-[100] bg-black"
            >
              {/* 协同分屏：透传全局面板打开状态 */}
              <CurriculumSection onClose={() => setIsCourseOpen(false)} onOpenAI={() => setIsGlobalAIOpen(true)} />
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 lg:mb-16">
                <div>
                  <div className="text-[#38bdf8] text-xs font-bold tracking-[0.4em] mb-3 uppercase">INTELLIGENCE MATRIX</div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold tracking-widest">奇点 EJU 院校数据实时监测 system</h2>
                </div>
                <button onClick={() => setIsVaultOpen(false)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/40 hover:text-white transition-all mt-6 md:mt-0">✕</button>
              </div>

              <div className="flex gap-2 md:gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
                {['ALL', 'T1', 'T2', 'T3', 'T4', 'T5'].map(t => (
                  <button key={t} onClick={() => setSelectedTier(t)} className={`text-left text-[10px] tracking-widest py-3 px-4 rounded transition-all ${selectedTier === t ? 'bg-[#38bdf8] text-white' : 'text-white/20 hover:text-white'}`}>{t}</button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredUnis.map((uni) => (
                    <div key={uni.id} className="group bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] px-2 py-1 rounded bg-[#38bdf8]/10 text-[#38bdf8] font-bold tracking-widest border border-[#38bdf8]/20">{uni.tier}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 tracking-widest">{uni.name}</h3>
                      <p className="text-white/40 text-xs tracking-widest mb-6">{uni.type} / {uni.location}</p>
                      
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                        <button className="flex-1 py-2 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors tracking-widest">官网</button>
                        <button className="flex-1 py-2 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors tracking-widest">网申</button>
                        <button className="flex-1 py-2 rounded border border-[#38bdf8]/30 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 text-xs text-[#38bdf8] transition-colors tracking-widest">真题</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 主页高透毛玻璃模态框节点挂载 */}
        <AIAssistantModal 
          isOpen={isGlobalAIOpen} 
          onClose={() => setIsGlobalAIOpen(false)} 
          displayMode="modal"
        />

      </motion.div>
    </>
  );
}
