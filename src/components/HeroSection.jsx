"use client"

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

export default function HeroSection({ onOpenModal, onOpenSignup }) {
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
    // 👑 修复：加入了 min-h-[100svh] 保证首屏高度独立
    <section className="min-h-[100svh] w-full relative overflow-hidden bg-transparent flex flex-col justify-center">
      <main className="relative z-20 px-6 md:px-16 lg:px-24 max-w-5xl">
        <div className="text-left max-w-[660px]">
          <div className="mb-8 md:mb-10 flex justify-start w-full">
            <GlassContainer className="rounded-full px-5 py-2 md:px-6 md:py-2 border border-white/10 inline-flex">
              <span className="text-white/85 text-[10px] md:text-[13px] font-medium tracking-[0.25em]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>奇点EJU · AI 线上备考系统</span>
            </GlassContainer>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-tighter font-bold mb-8 md:mb-10 leading-[1.2] md:leading-[1.15]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            <span style={glassHeadingStyle} className="block mb-2 md:mb-3">专为日本留学生考试</span>
            <span style={glassHeadingStyle} className="block">设计的高效突破系统</span>
          </h1>

          <p className="text-sm sm:text-base md:text-xl font-normal mb-12 md:mb-16 leading-relaxed max-w-2xl tracking-widest text-white/80 md:text-white/90" style={crispTextStyle}>
            渡来教育·奇点EJU，面向日本留学生考试（EJU）的新一代AI线上备考系统。内容全面对标2026最新考纲，全程假名标音，让任何水平的学生都能直接看懂课程。
          </p>

          <div className="flex flex-col sm:flex-row items-start justify-start w-full gap-4 md:gap-6">
            <GlassContainer onClick={onOpenSignup} className="rounded-full w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 cursor-pointer hover:scale-[0.98] transition-all duration-500">
              <span className="text-white/95 font-semibold text-[15px] md:text-[17px] tracking-[0.2em]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>免费开始</span>
            </GlassContainer>
            <GlassContainer onClick={onOpenModal} className="rounded-full w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 cursor-pointer hover:scale-[0.98] transition-all duration-500">
              <span className="text-white/95 font-semibold text-[15px] md:text-[17px] tracking-[0.2em]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>查看课程</span>
            </GlassContainer>
          </div>
        </div>
      </main>
    </section>
  )
}