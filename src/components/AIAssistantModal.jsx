"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { PulsingBorder } from "@paper-design/shaders-react"

// === 核心注入：靶向线上公网内网穿透 HTTPS 隧道端点 ===
const BACKEND_URL = "https://3fwq8pm7-8765.jpe1.devtunnels.ms/chat"; 

export default function AIAssistantModal({ 
  isOpen, 
  onClose, 
  getCurrentVideoTime = () => 0,
  displayMode = "modal" 
}) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: '我是林远。\n今天你想深度解析哪套真题，或者需要我为你规划专项冲刺？' }
  ]);

  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const fileInputRef = useRef(null);

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [saveStatus, setSaveStatus] = useState("已保存");
  
  const [isClearing, setIsClearing] = useState(false);
  const clearingTimeoutRef = useRef(null);

  const [isListeningChat, setIsListeningChat] = useState(false);
  const [isListeningNote, setIsListeningNote] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const draft = localStorage.getItem('singularity_eju_note_draft');
    if (draft) setNoteContent(draft);
  }, [isOpen]);

  useEffect(() => {
    if (noteContent === "") return;
    setSaveStatus("输入中...");
    const handler = setTimeout(() => {
      setSaveStatus("保存中...");
      try {
        localStorage.setItem('singularity_eju_note_draft', noteContent);
        setSaveStatus("已保存");
      } catch (e) {
        setSaveStatus("保存失败");
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [noteContent]);

  const handleManualSave = () => {
    try {
      localStorage.setItem('singularity_eju_note_draft', noteContent);
      setSaveStatus("手动保存成功");
      setTimeout(() => setSaveStatus("已保存"), 2000);
    } catch (e) {
      setSaveStatus("保存失败");
    }
  };

  const handleCopyNote = async () => {
    try {
      await navigator.clipboard.writeText(noteContent);
      const prev = saveStatus;
      setSaveStatus("已复制");
      setTimeout(() => setSaveStatus(prev), 2000);
    } catch (e) {
      console.error("复制失败", e);
    }
  };

  const handleExportNote = () => {
    if (!noteContent.trim()) return;
    const blob = new Blob([noteContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EJU_Note_${new Date().getTime()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearNote = () => {
    if (isClearing) {
      setNoteContent("");
      localStorage.removeItem('singularity_eju_note_draft');
      setIsClearing(false);
      if (clearingTimeoutRef.current) clearTimeout(clearingTimeoutRef.current);
    } else {
      setIsClearing(true);
      clearingTimeoutRef.current = setTimeout(() => setIsClearing(false), 3000);
    }
  };

  const chatEndRef = useRef(null);
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);

  const animState = useRef({
    isSpeaking: false, mouthY: 0, emotion: 'normal',
    smile: 0, cheek: 0, brow: 0,
    breath: 0, blinkTimer: 0, blinkState: 0, nextBlink: 180
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    if (appRef.current) return; 

    const PIXI = window.PIXI;
    if (!PIXI || !PIXI.live2d || !PIXI.live2d.Live2DModel) {
      console.warn("Live2D 引擎未就绪。");
      return;
    }

    const app = new PIXI.Application({
      resizeTo: containerRef.current,
      backgroundAlpha: 0, 
    });
    containerRef.current.appendChild(app.view);
    appRef.current = app;

    let isDestroyed = false;

    PIXI.live2d.Live2DModel.from('/测试男6.5/测试男.model3.json').then((model) => {
      if (isDestroyed) {
        model.destroy();
        return;
      }
      app.stage.addChild(model);
      
      app.ticker.add(() => {
        if (model && app.screen) {
          const isSplit = displayMode === "split";
          const isMobile = window.innerWidth < 768; 
          
          if (isSplit) {
            const currentScale = 0.20;
            model.scale.set(currentScale);
            model.x = (app.screen.width - model.width * currentScale) / 2;
            model.y = app.screen.height - model.height * currentScale + 80; 
            model.alpha = 0.25; 
          } else {
            model.alpha = 1.0;
            const currentScale = isMobile ? 0.18 : 0.24;
            model.scale.set(currentScale); 
            if (isMobile) {
              model.x = (app.screen.width - model.width * currentScale) / 2;
              model.y = 200; 
            } else {
              model.x = -80; 
              model.y = 240; 
            }
          }
        }
      });

      model.trackMousePlayer = true; 

      const originalUpdate = model.update;
      model.update = function(transform) {
        originalUpdate.call(this, transform);
        if (this.internalModel && this.internalModel.coreModel) {
          const core = this.internalModel.coreModel;
          const st = animState.current;
          
          let finalMouth = st.isSpeaking ? Math.max(0.25, st.mouthY) : 0.25;
          core.setParameterValueById('ParamMouthOpenY', finalMouth);
          
          st.breath += 0.03;
          core.setParameterValueById('ParamBreath', (Math.sin(st.breath) + 1) / 2);
          st.blinkTimer++;
          let eyeOpenness = 1.0;
          if (st.blinkState === 0) { if (st.blinkTimer > st.nextBlink) { st.blinkState = 1; st.blinkTimer = 0; } }
          else if (st.blinkState === 1) { eyeOpenness = 1.0 - (st.blinkTimer / 4); if (eyeOpenness <= 0) { eyeOpenness = 0; st.blinkState = 2; st.blinkTimer = 0; } }
          else if (st.blinkState === 2) { eyeOpenness = st.blinkTimer / 8; if (eyeOpenness >= 1.0) { eyeOpenness = 1.0; st.blinkState = 0; st.blinkTimer = 0; st.nextBlink = 120 + Math.random() * 240; } }
          core.setParameterValueById('ParamEyeLOpen', eyeOpenness);
          core.setParameterValueById('ParamEyeROpen', eyeOpenness);
        }
      };
    }).catch(e => console.error("模型载入异常:", e));

    return () => {
      isDestroyed = true; 
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, [isOpen, displayMode]);

  const playAudioWithLipSync = async (audioBase64) => {
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtxRef.current.state === 'suspended') await audioCtxRef.current.resume();
    if (sourceNodeRef.current) { try { sourceNodeRef.current.disconnect(); } catch (_) {} }

    const audioBlob = await fetch(`data:audio/mpeg;base64,${audioBase64}`).then(r => r.blob());
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);
    const source = audioCtxRef.current.createBufferSource();
    source.buffer = audioBuffer;

    if (!analyserRef.current) {
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.3;
    }
    
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);
    sourceNodeRef.current = source;

    const dataArray = new Uint8Array(analyserRef.current.fftSize);
    animState.current.isSpeaking = true; 

    const updateVolume = () => {
      if (!analyserRef.current || !animState.current.isSpeaking) return;
      analyserRef.current.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) { const v = (dataArray[i] - 128) / 128; sum += v * v; }
      const rms = Math.sqrt(sum / dataArray.length);
      animState.current.mouthY = Math.min(1.0, rms * 15); 
      requestAnimationFrame(updateVolume);
    };
    updateVolume();
    source.start(0);
    source.onended = () => { animState.current.isSpeaking = false; animState.current.mouthY = 0; };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePromptPrefix = (prefix) => {
    setInput((prev) => prev ? `${prefix} ${prev}` : `${prefix} `);
    setIsPlusMenuOpen(false);
  };

  const handleResetContext = () => {
    setMessages([{ role: 'ai', text: '记忆已隔离。当前为全新会话上下文，请发送新指令。' }]);
    setIsPlusMenuOpen(false);
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && !uploadImage) || isLoading) return;
    const userText = input.trim();
    const currentImage = uploadImage;
    setInput("");
    setUploadImage(null);
    
    setMessages(prev => [...prev, { role: 'user', text: currentImage ? `${userText} [图片已上传]` : userText }]);
    setIsLoading(true);

    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();

    try {
      const resp = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText, image: currentImage })
      });
      if (!resp.ok) throw new Error("Backend connection failed");
      const data = await resp.json();
      
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      if (data.audio) await playAudioWithLipSync(data.audio);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "❌ 大脑失联啦！请检查 Python 后端是否启动。" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (target) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("当前浏览器暂不支持语音输入，请使用 Chrome 或 Edge 浏览器。");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    recognition.continuous = false;

    if (target === 'chat') {
      setIsListeningChat(true);
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput((prev) => prev + (prev ? " " : "") + transcript);
      };
      recognition.onend = () => setIsListeningChat(false);
      recognition.onerror = () => setIsListeningChat(false);
    } else if (target === 'note') {
      setIsListeningNote(true);
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setNoteContent((prev) => prev + (prev ? "\n" : "") + transcript);
      };
      recognition.onend = () => setIsListeningNote(false);
      recognition.onerror = () => setIsListeningNote(false);
    }
    recognition.start();
  };

  const handleInsertTimecode = () => {
    const timeInSeconds = getCurrentVideoTime();
    if (timeInSeconds === undefined || timeInSeconds === null) return;
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    const timeStr = `\n[${m}:${s}] `;
    setNoteContent(prev => prev + timeStr);
  };

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  
  const panelVariants = {
    hidden: { scale: 0.8, x: 180, y: 280, opacity: 0 },
    visible: { 
      scale: 1, x: 0, y: 0, opacity: 1, 
      transition: { type: "spring", stiffness: 95, damping: 22, mass: 1, delay: 0.05 } 
    },
    exit: { 
      scale: 0.8, x: 180, y: 280, opacity: 0, 
      transition: { type: "spring", stiffness: 110, damping: 24 } 
    }
  };

  const isSplit = displayMode === "split";

  const renderContent = () => (
    <div className={`w-full h-full flex flex-col relative z-10 ${isSplit ? "bg-[#050505] overflow-hidden" : ""}`}>
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)"
        }}
      >
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
      </div>

      <div className="relative z-10 px-8 py-6 border-b border-white/5 flex items-center justify-between pointer-events-none shrink-0">
         <div className="flex items-center gap-3">
           <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-orange-500' : 'bg-gradient-to-r from-[#00e5ff] to-[#38bdf8]'} animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.8)]`}></span>
           <span className="text-white/80 text-xs tracking-[0.3em] font-medium uppercase">{isLoading ? "老大推演中..." : "林远 · 专属推演空间"}</span>
         </div>
         <button onClick={onClose} className="pointer-events-auto text-white/20 hover:text-white transition-colors group">
           <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg>
         </button>
      </div>

      <div className={`relative z-10 flex-1 overflow-y-auto flex flex-col gap-6 custom-scrollbar pointer-events-auto ${isSplit ? "w-full p-6" : "w-full md:w-[75%] ml-auto p-8 md:p-12"}`}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'ai' && (
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] mt-1 overflow-hidden relative">
                <div className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none">
                  <PulsingBorder colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700"]} colorBack="#00000000" speed={1.0} roundness={1} thickness={0.1} softness={0.2} intensity={5} spotsPerColor={5} spotSize={0.1} pulse={0.1} smoke={0.5} smokeSize={4} scale={0.65} rotation={0} style={{ width: "100%", height: "100%", borderRadius: "inherit" }} />
                </div>
              </div>
            )}
            {msg.role === 'user' && (
              <div className="w-10 h-10 rounded-2xl bg-[#00e5ff]/20 border border-[#00e5ff]/40 flex items-center justify-center shrink-0 mt-1 backdrop-blur-xl">
                <span className="text-[#00e5ff] text-xs font-bold">我</span>
              </div>
            )}
            <div className={`p-5 rounded-3xl max-w-[85%] backdrop-blur-2xl shadow-2xl ${
              msg.role === 'user' ? 'bg-[#00e5ff]/15 border border-[#00e5ff]/30 text-white rounded-tr-sm' : 'bg-white/[0.03] border border-white/10 text-white/90 rounded-tl-sm'
            }`}>
              <p className="text-[15px] leading-relaxed tracking-widest whitespace-pre-wrap font-light" style={{ fontFamily: msg.role === 'ai' ? "'Noto Serif SC', serif" : "inherit" }}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 shrink-0"></div>
            <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/10 rounded-tl-sm flex items-center gap-2 h-12">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div className="shrink-0 h-12 w-full" />
        <div ref={chatEndRef} />
      </div>

      <div className={`relative z-10 p-8 pt-0 shrink-0 pointer-events-auto ${isSplit ? "w-full p-6" : "w-full md:w-[75%] ml-auto md:p-12"}`}>
        <div className="relative group flex flex-col gap-3 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] transition-colors duration-300 backdrop-blur-2xl border border-white/5 focus-within:border-white/20 p-4">
          
          {uploadImage && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 ml-2">
              <img src={uploadImage} alt="upload" className="w-full h-full object-cover" />
              <button onClick={() => setUploadImage(null)} className="absolute top-0 right-0 w-5 h-5 bg-black/60 text-white text-[10px] flex items-center justify-center hover:bg-red-500 transition-colors">✕</button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)} className="w-10 h-10 shrink-0 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 transition-all">
                <span className={`transition-transform duration-300 ${isPlusMenuOpen ? 'rotate-45' : 'rotate-0'}`}>+</span>
              </button>
              <AnimatePresence>
                {isPlusMenuOpen && (
                  <motion.div 
                    key="plus-menu" 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                    className="absolute bottom-14 left-0 w-40 bg-[#111] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden py-2 z-50"
                  >
                    {[
                      { icon: '🧠', label: '深度思考', prefix: '[深度思考]' },
                      { icon: '🎓', label: '专业答疑', prefix: '[专业答疑]' },
                      { icon: '🎯', label: '考点提取', prefix: '[考点提取]' },
                      { icon: '📇', label: '生成闪卡', prefix: '[生成闪卡]' },
                      { icon: '🔄', label: '记忆隔离', action: 'reset' }
                    ].map((item, idx) => (
                      <button key={idx} onClick={() => item.action === 'reset' ? handleResetContext() : handlePromptPrefix(item.prefix)} className="w-full text-left px-4 py-2.5 hover:bg-white/10 text-white/80 text-[13px] flex items-center gap-3 transition-colors">
                        <span>{item.icon}</span><span>{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
            <button onClick={() => fileInputRef.current?.click()} className="shrink-0 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-[13px] flex items-center gap-2 transition-all">📷 拍照</button>
            <button onClick={() => setIsNoteOpen(!isNoteOpen)} className="shrink-0 px-4 py-2 rounded-full bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 border border-[#00e5ff]/30 text-[#00e5ff] text-[13px] flex items-center gap-2 transition-all">📝 笔记</button>

            <div className="flex-1 relative flex items-center">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }} disabled={isLoading} placeholder={isLoading ? "神经脉冲推演中..." : "输入问题..."} className="w-full bg-transparent text-white/90 placeholder:text-white/20 px-2 py-2 pr-10 outline-none text-sm tracking-widest disabled:opacity-50" />
              <button onClick={() => handleVoiceInput('chat')} className={`absolute right-2 p-1.5 rounded-full transition-colors ${isListeningChat ? 'text-[#00e5ff] animate-pulse bg-[#00e5ff]/10' : 'text-white/40 hover:text-white/80'}`} title="语音输入">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
            </div>

            <button onClick={handleSendMessage} disabled={isLoading || (!input.trim() && !uploadImage)} className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 focus-within:bg-[#00e5ff]/10 focus-within:border-[#00e5ff]/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100">
              <svg className="w-5 h-5 text-white/40 transform -translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeWidth="2" /></svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/5 transition-colors duration-300"></div>
          <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff]/80 to-transparent scale-x-0 group-focus-within:scale-x-100 origin-center transition-transform duration-700 ease-out"></div>
        </div>
      </div>

      <AnimatePresence>
        {isNoteOpen && (
          <motion.div
            key="note-drawer" 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`absolute top-0 right-0 h-full bg-[#050505]/95 backdrop-blur-3xl border-l border-white/10 z-[200] flex flex-col shadow-2xl pointer-events-auto ${isSplit ? "w-full" : "w-full md:w-[45%]"}`}
          >
            <div className="shrink-0 px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <span className="text-white/80 text-sm tracking-widest font-medium uppercase">随堂笔记 · Note</span>
              <div className="flex items-center gap-4">
                <span className={`text-[11px] tracking-wider ${saveStatus === '保存失败' ? 'text-red-400' : 'text-white/30'}`}>{saveStatus}</span>
                <button onClick={() => setIsNoteOpen(false)} className="text-white/40 hover:text-white transition-colors">✕</button>
              </div>
            </div>
            
            <div className="shrink-0 relative border-b border-white/5">
              <div className="px-8 py-4 flex flex-row items-center gap-3 overflow-x-auto whitespace-nowrap select-none [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 transition-all">
                <button onClick={() => handleVoiceInput('note')} className={`px-4 py-1.5 rounded-full border text-[13px] font-medium flex items-center gap-2 transition-all ${isListeningNote ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse' : 'bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] hover:bg-[#00e5ff]/20'}`}>
                  🎤 {isListeningNote ? '聆听中...' : '语音速记'}
                </button>
                <button onClick={handleInsertTimecode} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium flex items-center gap-2 transition-all">📌 记录时间戳</button>
                <button onClick={handleManualSave} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium flex items-center gap-2 transition-all">💾 保存笔记</button>
                <button onClick={handleCopyNote} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium flex items-center gap-2 transition-all">📄 复制笔记</button>
                <button onClick={handleExportNote} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium flex items-center gap-2 transition-all">⬇️ 导出 Markdown</button>
                <button onClick={handleClearNote} className={`px-4 py-1.5 rounded-full border text-[13px] font-medium flex items-center gap-2 transition-all ${isClearing ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-red-400'}`}>
                  🗑️ {isClearing ? '确认清空' : '清空笔记'}
                </button>
              </div>
              <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[#050505]/95 to-transparent pointer-events-none" />
            </div>

            <div className="flex-1 p-8 overflow-hidden flex flex-col">
              <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="在此记录你的思考..." className="flex-1 w-full bg-transparent text-white/90 placeholder:text-white/20 outline-none resize-none text-[15px] leading-relaxed tracking-wider custom-scrollbar" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isSplit) {
    return isOpen ? renderContent() : null;
  }

  return (
    <MotionConfig reducedMotion="never">
      <AnimatePresence>
        {isOpen && (
          <motion.div key="ai-modal-root" initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div variants={backdropVariants} transition={{ duration: 0.35, ease: "easeOut" }} className="absolute inset-0 bg-black/40 backdrop-blur-2xl" onClick={onClose} />
            
            <motion.div 
              variants={panelVariants} 
              style={{ transformOrigin: "bottom right", isolation: "isolate" }} 
              className="relative w-full max-w-4xl h-[85vh] flex flex-col z-10 bg-white/[0.04] border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.6)]"
            >
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden rounded-[2rem] flex flex-col"
                style={{ WebkitMaskImage: "-webkit-linear-gradient(white, white)", transform: "translateZ(0)" }}
              >
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ backdropFilter: "blur(20px)", filter: "url(#glass-distortion)", isolation: "isolate" }} />
                
                {renderContent()}
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
