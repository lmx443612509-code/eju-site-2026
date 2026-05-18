"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const [showPassword, setShowPassword] = useState(false)

  const glassInput = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
  const labelStyle = "block text-white/50 text-[10px] tracking-[0.25em] mb-2 ml-1 uppercase"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="login-modal-root"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
          
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }} 
            animate={{ scale: 1, y: 0, opacity: 1 }} 
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-[2.5rem] shadow-2xl p-10 backdrop-blur-xl z-10"
          >
            <div className="text-center mb-10">
               <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] relative group">
                 <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <svg className="w-7 h-7 text-white/80 animate-[pulse_3s_ease-in-out_infinite] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                 </svg>
               </div>
               <h2 className="text-2xl font-bold text-white mb-2 tracking-widest" style={{ fontFamily: "'Noto Serif SC', serif" }}>接入系统</h2>
               <p className="text-white/40 text-xs tracking-widest">欢迎回来，奇点正在为您同步备考进度</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className={labelStyle}>邮箱账号</label>
                <input type="email" placeholder="example@gmail.com" className={glassInput} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={labelStyle}>访问密码</label>
                  <span className="text-[10px] text-white/30 hover:text-white/60 cursor-pointer transition-colors">忘记密码?</span>
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={glassInput} />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                    {showPassword ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" /></svg> : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18" strokeWidth="2" /></svg>}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-transparent" />
                <span className="text-[11px] text-white/40 tracking-wider">保持 30 天内自动登录</span>
              </div>

              <button className="w-full h-14 rounded-full bg-white border border-white text-black font-bold tracking-[0.3em] text-sm hover:bg-white/90 active:scale-95 transition-all shadow-lg shadow-white/10 mt-4">立即接入</button>
              
              <p className="text-center mt-8 text-xs text-white/30 tracking-widest">
                还没有账号？ <span onClick={onSwitchToSignup} className="text-white/60 hover:underline cursor-pointer">免费注册</span>
              </p>
            </div>

            <button onClick={onClose} className="absolute top-8 right-8 text-white/10 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}