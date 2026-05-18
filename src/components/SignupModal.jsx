"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    email: "", password: "", country: "中国", major: "理工科", agree: false
  })
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  
  const countries = ["中国", "日本", "韩国", "美国", "中国香港", "其他"]
  const majors = ["理工科", "医学", "文科", "尚未决定"]

  if (!isOpen) return null

  const glassInput = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
  const labelStyle = "block text-white/50 text-[10px] tracking-[0.25em] mb-2 ml-1 uppercase"

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-5xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* 左侧指引区 (逻辑已彻底修复) */}
          <div className="w-full md:w-[38%] bg-white/[0.02] p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-widest" style={{ fontFamily: "'Noto Serif SC', serif" }}>加入奇点 EJU</h2>
              <p className="text-white/40 text-xs tracking-widest">开启您的名校进阶之旅</p>
            </div>

            <div className="flex-1 space-y-8 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-white/10" />
              {[
                { step: "01", title: "创建账号", desc: "填写邮箱信息，即刻开启。", status: 'active' },
                { step: "02", title: "OTP 验证", desc: "输入邮箱验证码确保安全。", status: 'pending' },
                // 核心修复：KYC 放在第 3 步
                { step: "03", title: "KYC 本人认证", desc: "上传身份证+学生证 (Phase 1.5)", status: 'locked' },
                // 核心修复：开启学习 作为最终目标放在第 4 步
                { step: "04", title: "开启学习", desc: "获取专属 AI 提分建议。", status: 'pending' }
              ].map((item, i) => (
                <div key={i} className={`flex gap-6 relative z-10 transition-opacity duration-500 ${item.status === 'locked' ? 'opacity-40' : 'opacity-100'}`}>
                  <div className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[10px] font-bold ${item.status === 'active' ? 'bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-black border-white/20 text-white/40'}`}>
                    {item.status === 'locked' ? <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" /></svg> : item.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-widest mb-1 text-white">{item.title}</h4>
                    <p className="text-white/30 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-[10px] text-white/20 leading-relaxed text-center">🛡️ 您的隐私受 PIPL / GDPR 国际安全标准保护</p>
          </div>

          {/* 右侧表单区 */}
          <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div><label className={labelStyle}>邮箱地址</label><input type="email" placeholder="example@eju.com" className={glassInput} /></div>
              <div>
                <label className={labelStyle}>国家 / 地区</label>
                <div className="relative">
                  <div onClick={() => setIsCountryOpen(!isCountryOpen)} className={`${glassInput} cursor-pointer flex justify-between items-center`}>
                    <span>{formData.country}</span>
                    <svg className={`w-4 h-4 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7" strokeWidth="2" /></svg>
                  </div>
                  {isCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
                      {countries.map(c => <div key={c} onClick={() => { setFormData({...formData, country: c}); setIsCountryOpen(false) }} className="px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white cursor-pointer">{c}</div>)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div><label className={labelStyle}>设置密码</label><input type="password" placeholder="••••••••" className={glassInput} /></div>
              <div><label className={labelStyle}>确认密码</label><input type="password" placeholder="••••••••" className={glassInput} /></div>
            </div>

            <div className="mb-8">
              <label className={labelStyle}>志愿学部（学科）</label>
              <div className="flex flex-wrap gap-3">
                {majors.map(m => (
                  <div key={m} onClick={() => setFormData({...formData, major: m})} className={`px-5 py-2 rounded-full border text-xs font-medium tracking-widest cursor-pointer transition-all ${formData.major === m ? 'bg-white/15 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)_inset]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}>{m}</div>
                ))}
              </div>
            </div>

            <div className="mb-8"><label className={labelStyle}>邀请码 (可选)</label><input type="text" placeholder="输入代码" className={glassInput} /></div>

            <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => setFormData({...formData, agree: !formData.agree})}>
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${formData.agree ? 'bg-white border-white' : 'border-white/20'}`}>{formData.agree && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>}</div>
              <p className="text-[10px] text-white/30">我已同意 <span className="text-white/60 hover:underline">用户协议</span> 与 <span className="text-white/60 hover:underline">隐私保护指引</span></p>
            </div>

            <button className="w-full h-14 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold tracking-[0.3em] text-sm active:scale-95 transition-all">创建账户</button>
            <p className="text-center mt-6 text-xs text-white/30">已有账户？ <span onClick={onSwitchToLogin} className="text-white/60 hover:underline cursor-pointer">立即登录</span></p>
          </div>

          <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg></button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}