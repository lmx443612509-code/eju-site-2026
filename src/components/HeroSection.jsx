"use client"

import { PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import React from "react"

const GlassContainer = ({ children, className = "", style = {}, onClick }) => (
  <div
    onClick={onClick}
    className={`relative flex items-center justify-center overflow-hidden transition-all duration-700 ${className}`}
    style={{
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.05)",
      ...style,
    }}
  >
    <div className="absolute inset-0 z-0" style={{ backdropFilter: "blur(8px)", filter: "url(#glass-distortion)", isolation: "isolate" }} />
    <div className="absolute inset-0 z-10" style={{ background: "rgba(255, 255, 255, 0.12)" }} />
    <div className="absolute inset-0 z-20" style={{ boxShadow: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 0.5px 0 rgba(255, 255, 255, 0.1)" }} />
    <div className="relative z-30 flex items-center justify-center w-full">{children}</div>
  </div>
)

export default function HeroSection({ onOpenModal, onOpenSignup, onOpenAI }) {
  const glassHeadingStyle = {
    color: "transparent",
    WebkitTextStroke: "1px rgba(255, 255, 255, 0.35)",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.25) 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    textShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  }

  const crispTextStyle = {
    color: "rgba(255, 255, 255, 0.9)",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
  }

  return (
    <section className="min-h-screen w-full relative overflow-hidden bg-transparent flex flex-col">
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
            <feDisplacementMap in="SourceGraphic" in2="softMap" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <main className="relative z-20 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-12 max-w-5xl">
        <div className="text-left max-w-[660px]">
          <div className="mb-10 flex justify-center w-full">
            <GlassContainer className="rounded-full px-6 py-2 border border-white/10 inline-flex">
              <span className="text-white/85 text-[13px] font-medium tracking-[0.25em]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>奇点EJU · AI 线上备考系统</span>
            </GlassContainer>
          </div>

          <h1 className="text-5xl md:text-7xl tracking-tighter font-bold mb-10 leading-[1.15]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            <span style={glassHeadingStyle} className="block mb-3">专为日本留学生考试</span>
            <span style={glassHeadingStyle} className="block">设计的高效突破系统</span>
          </h1>

          <p className="text-lg md:text-xl font-normal mb-16 leading-relaxed max-w-2xl tracking-widest" style={crispTextStyle}>
            渡来教育·奇点EJU，面向日本留学生考试（EJU）的新一代AI线上备考系统。内容全面对标2026最新考纲，全程假名标音，让任何水平的学生都能直接看懂课程。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6">
            <GlassContainer onClick={onOpenSignup} className="rounded-full px-12 py-5 cursor-pointer hover:scale-95 transition-all duration-500 w-full sm:w-auto">
              <span className="text-white/95 font-semibold text-[17px] tracking-[0.2em]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>免费开始</span>
            </GlassContainer>
            <GlassContainer onClick={onOpenModal} className="rounded-full px-12 py-5 cursor-pointer hover:scale-95 transition-all duration-500 w-full sm:w-auto">
              <span className="text-white/95 font-semibold text-[17px] tracking-[0.2em]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>查看课程</span>
            </GlassContainer>
          </div>
        </div>
      </main>

      <div className="absolute bottom-12 right-12 z-30 pointer-events-auto">
        <motion.div 
          onClick={onOpenAI} 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="group relative w-24 h-24 flex items-center justify-center cursor-pointer"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <PulsingBorder 
              colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700"]} 
              colorBack="#00000000" 
              speed={1.5} 
              roundness={1} 
              thickness={0.1} 
              softness={0.2} 
              intensity={5} 
              spotsPerColor={5} 
              spotSize={0.1} 
              pulse={0.1} 
              smoke={0.5} 
              smokeSize={4} 
              scale={0.65} 
              rotation={0} 
              frame={9161408} 
              style={{ width: "70px", height: "70px", borderRadius: "50%" }} 
            />
          </div>

          <motion.svg className="absolute inset-0 w-full h-full text-white/50 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none" viewBox="0 0 100 100" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} style={{ transform: "scale(1.7)" }}><defs><path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs><text className="text-[10px] font-semibold tracking-[0.22em]" fill="currentColor"><textPath href="#circle" startOffset="0%">奇点 EJU AI 助手 • 奇点 EJU AI 助手 • 奇点 EJU AI 助手 • </textPath></text></motion.svg>
        </motion.div>
      </div>
    </section>
  )
}