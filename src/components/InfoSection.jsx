"use client"

import React from "react"
import { motion } from "framer-motion"

const InfoIcon = ({ children }) => (
  <svg className="w-6 h-6 text-white/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    {children}
  </svg>
)

const upcomingFeatures = [
  { id: 1, title: "练习题", desc: "各科目章末与考试范围的练习题。即时判分、附解析。", icon: <InfoIcon><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></InfoIcon> },
  { id: 2, title: "模拟测试 (历年真题)", desc: "EJU 真题与模拟测试。计时、自动判分、成绩追踪。", icon: <InfoIcon><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></InfoIcon> },
  { id: 3, title: "AI 助手", desc: "7×24小时智能助教。可针对视频内容、解题思路与备考策略提问。", icon: <InfoIcon><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></InfoIcon> }
]

const teamMembers = [
  { id: 1, role: "创始人 · CEO", tag: "产品 · 教学设计", desc: "前 EJU 考生 · 东京大学硕士。以 AI × 教育 打造「3分钟即可启程」的留学生进学平台。", icon: <InfoIcon><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></InfoIcon> },
  { id: 2, role: "工程团队", tag: "全栈开发", desc: "基于 Cloudflare / Next.js / Supabase 自研，自 MVP 起即考虑横向扩展。视频分发、KYC、计费均自主开发。", icon: <InfoIcon><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></InfoIcon> },
  { id: 3, role: "学科讲师团队", tag: "EJU 数学 · 物理 · 化学 · 生物 · 日语", desc: "日本高中、预备校在职讲师及东大 / 京大毕业的学科专家共同监修。完全对接 2026 年新版 EJU 大纲。", icon: <InfoIcon><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></InfoIcon> }
]

export default function InfoSection() {
  const glassHeadingStyle = {
    color: "transparent",
    WebkitTextStroke: "1px rgba(255, 255, 255, 0.35)",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.25) 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    textShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Noto Serif SC', serif",
  }

  const crispTextStyle = {
    color: "rgba(255, 255, 255, 0.9)",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
  }

  return (
    <section className="w-full bg-transparent pb-24 md:pb-32 pt-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10 flex flex-col gap-20 md:gap-24">
        
        {/* ================= 1. 即将上线的功能 ================= */}
        <div>
          <div className="mb-10 md:mb-12 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 tracking-wider flex items-center gap-2.5" style={glassHeadingStyle}>
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              即将上线的功能
            </h2>
            <p className="text-xs md:text-sm font-light tracking-widest px-4 md:px-0" style={crispTextStyle}>
              正在开发中的主要功能。上线时将通过邮件通知您。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, i) => (
              <div key={feature.id} className="relative flex flex-col p-6 md:p-8 rounded-[24px] md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all overflow-hidden">

                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
                    {feature.icon}
                  </div>
                  
                  {/* 微调这里的 gap */}
                  <h3 className="text-lg md:text-xl font-semibold text-white tracking-widest flex items-center flex-wrap gap-1 md:gap-2.5 mt-1" style={{ fontFamily: "'Noto Serif SC', serif", textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>
                    {feature.title}
                    <span className="inline-flex items-center gap-1.5 translate-y-[1px]" style={{ textShadow: "none" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse"></span>
                      <span className="text-white/40 text-[10px] md:text-[11px] tracking-[0.15em] font-light">准备中</span>
                    </span>
                  </h3>
                </div>

                <p className="text-xs md:text-sm font-light leading-relaxed tracking-wider text-white/80" style={crispTextStyle}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 2. 奇点教育团队 ================= */}
        <div>
          <div className="mb-10 md:mb-12 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 tracking-wider flex items-center gap-2.5" style={glassHeadingStyle}>
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              奇点教育团队
            </h2>
            <p className="text-xs md:text-sm font-light tracking-widest max-w-2xl px-4 md:px-0" style={crispTextStyle}>
              由资深工程师、教育从业者、前留学生组成的团队，全力支持每一位备战 EJU 的留学生。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col p-6 md:p-8 rounded-[24px] md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 overflow-hidden"
              >
                <div className="flex flex-col gap-4 mb-5">
                  <div className="w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] group-hover:bg-white/10 transition-colors">
                    {member.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white tracking-widest mb-1.5" style={{ fontFamily: "'Noto Serif SC', serif", textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>
                      {member.role}
                    </h3>
                    <div className="inline-block px-2 py-0.5 md:px-2.5 md:py-1 rounded bg-white/5 border border-white/5 text-white/50 text-[10px] md:text-xs tracking-wider" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                      {member.tag}
                    </div>
                  </div>
                </div>
                <p className="text-xs md:text-sm font-light leading-relaxed tracking-wider text-white/80" style={crispTextStyle}>
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= 3. 联系我们 ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full rounded-[24px] md:rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden"
        >
          <div className="flex flex-col text-center lg:text-left relative z-10 max-w-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 tracking-widest text-white/95" style={{ fontFamily: "'Noto Serif SC', serif", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>联系我们</h2>
            <p className="text-xs md:text-sm tracking-widest Text-white/80" style={crispTextStyle}>欢迎加入团队、合作或求职咨询。</p>
          </div>

          <a href="mailto:contact@eju.aircore.org" className="relative group/mail flex items-center justify-center z-10 w-full lg:w-auto">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-md group-hover:bg-white/10 transition-all duration-500"></div>
            <div className="relative w-full text-center px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2.5 transition-all duration-500 group-hover:scale-95 group-hover:bg-white/10 cursor-pointer">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover/mail:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="text-white/95 text-sm md:text-[15px] font-medium md:font-semibold tracking-wider" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>contact@eju.aircore.org</span>
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  )
}