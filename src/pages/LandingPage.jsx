"use client"

import React, { useState, useEffect } from 'react';
import { MeshGradient } from "@paper-design/shaders-react";
import HeroSection from '../components/HeroSection';
import UniversitiesSection from '../components/UniversitiesSection';
import PastExamsSection from '../components/PastExamsSection';
import InfoSection from '../components/InfoSection';
import SignupModal from '../components/SignupModal';
import LoginModal from '../components/LoginModal';
import AIAssistantModal from '../components/AIAssistantModal';
import CurriculumSection from '../components/CurriculumSection'; 
import { motion, AnimatePresence } from "framer-motion"; 

// 院校情报矩阵数据
const universityData = [
  { id: 1, tier: 'T1', name: '东京大学', type: '国立', location: '东京' },
  { id: 2, tier: 'T1', name: '京都大学', type: '国立', location: '京都' },
  { id: 6, tier: 'T1', name: '早稻田大学', type: '私立', location: '东京' },
  { id: 8, tier: 'T2', name: '神户大学', type: '国立', location: '神户' },
  { id: 11, tier: 'T4', name: '明治大学', type: '私立', location: '东京' },
];

export default function LandingPage() {
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false); 
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('ALL');

  useEffect(() => {
    const isAnyModalOpen = isCourseOpen || isVaultOpen || isSignupOpen || isLoginOpen || isAIOpen;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'unset';
  }, [isCourseOpen, isVaultOpen, isSignupOpen, isLoginOpen, isAIOpen]);

  const handleSwitchToLogin = () => { setIsSignupOpen(false); setTimeout(() => setIsLoginOpen(true), 200); };
  const handleSwitchToSignup = () => { setIsLoginOpen(false); setTimeout(() => setIsSignupOpen(true), 200); };

  const filteredUnis = selectedTier === 'ALL' ? universityData : universityData.filter(u => u.tier === selectedTier);

  return (
    <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-black text-white selection:bg-[#b38b6d] selection:text-white">
      
      {/* 底部流体背景 (100% 还原原始色号) */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <MeshGradient className="absolute inset-0 w-full h-full" colors={["#000000", "#8B4513", "#ffffff", "#3E2723", "#5D4037"]} speed={0.3} backgroundColor="#000000" />
        <MeshGradient className="absolute inset-0 w-full h-full opacity-50" colors={["#000000", "#ffffff", "#8B4513", "#000000"]} speed={0.2} wireframe={true} backgroundColor="transparent" />
      </div>

      {/* 主视界层 (不被任何组件插入，保持原始垂直排版) */}
      <motion.div 
        animate={{ 
          scale: (isCourseOpen || isVaultOpen) ? 0.95 : 1, 
          opacity: (isCourseOpen || isVaultOpen) ? 0 : 1,
          filter: (isCourseOpen || isVaultOpen) ? "blur(30px)" : "blur(0px)",
          pointerEvents: (isCourseOpen || isVaultOpen) ? "none" : "auto" 
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex flex-col"
      >
        <HeroSection 
          onOpenModal={() => setIsCourseOpen(true)} 
          onOpenSignup={() => setIsSignupOpen(true)} 
          onOpenAI={() => setIsAIOpen(true)} 
        />
        
        {/* 核心修改点：把打开情报库的函数传给 UniversitiesSection */}
        <UniversitiesSection onOpenVault={() => setIsVaultOpen(true)} />
        
        <PastExamsSection />
        <InfoSection />
      </motion.div>

      {/* ============== 其他弹窗区 ============== */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} onSwitchToLogin={handleSwitchToLogin} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignup={handleSwitchToSignup} />
      <AIAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

      {/* ============== 奇点大爆炸层 (星系课程) ============== */}
      <AnimatePresence>
        {isCourseOpen && (
          <motion.div 
            initial={{ clipPath: "circle(0% at 50% 50%)" }} animate={{ clipPath: "circle(150% at 50% 50%)" }} exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.8 }} className="fixed inset-0 z-[100] bg-black" 
          >
            <button onClick={() => setIsCourseOpen(false)} className="absolute top-10 left-10 z-[110] text-white/40 hover:text-white uppercase tracking-widest text-[10px]">← Back</button>
            <CurriculumSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============== 院校情报矩阵层 (全屏毛玻璃图层) ============== */}
      <AnimatePresence>
        {isVaultOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/60 backdrop-blur-3xl p-10 lg:p-20 overflow-hidden"
          >
            {/* 顶部情报条 */}
            <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-10">
              <div>
                <h2 className="text-4xl font-light tracking-tighter text-white">INTELLIGENCE <span className="text-[#b38b6d] font-bold">MATRIX</span></h2>
                <p className="text-white/20 text-[9px] tracking-[0.6em] uppercase mt-1">奇点 EJU 院校数据实时监测系统</p>
              </div>
              <button onClick={() => setIsVaultOpen(false)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/40 hover:text-white transition-all">✕</button>
            </div>

            {/* 核心筛选与列表 */}
            <div className="flex-grow flex gap-10 overflow-hidden">
              <div className="hidden lg:flex flex-col gap-2 w-32">
                {['ALL', 'T1', 'T2', 'T3', 'T4', 'T5'].map(t => (
                  <button key={t} onClick={() => setSelectedTier(t)} className={`text-left text-[10px] tracking-widest py-3 px-4 rounded transition-all ${selectedTier === t ? 'bg-[#b38b6d] text-white' : 'text-white/20 hover:text-white'}`}>{t}</button>
                ))}
              </div>
              <div className="flex-grow overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                {filteredUnis.map((uni) => (
                  <div key={uni.id} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all">
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-bold text-[#b38b6d] w-8">{uni.tier}</span>
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(179, 139, 109, 0.3); }
      `}</style>
    </div>
  );
}