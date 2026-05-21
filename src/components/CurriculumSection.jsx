import React, { useState } from 'react';
import PlanetBackground from './PlanetBackground'; 
import CourseTransition from './CourseTransition'; 

// ==========================================
// 1. 学习面板组件
// ==========================================
function LMSDashboard({ onPlayVideo, onBack, onGoProfile }) {
  const lessons = [
    { id: 1, title: "第1讲 多项式与因式分解", time: "16:01", locked: false },
    { id: 2, title: "第2讲 实数与根号", time: "18:45", locked: true },
    { id: 3, title: "第3讲 一次不等式", time: "22:09", locked: true },
    { id: 4, title: "第4讲 集合与元素", time: "21:32", locked: true },
    { id: 5, title: "第5讲 命题与逻辑", time: "43:23", locked: true },
    { id: 6, title: "第6讲 二次函数与配方法", time: "30:08", locked: true },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-[#0a192f] overflow-y-auto pb-24 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-10">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0">
          <h1 className="text-2xl font-bold tracking-widest text-[#38bdf8]">奇点教育</h1>
          <nav className="flex gap-4 md:gap-6 text-sm tracking-widest text-white/50">
            <span className="text-white border-b-2 border-[#38bdf8] pb-1 cursor-default">学习面板</span>
            <span onClick={onGoProfile} className="hover:text-white cursor-pointer transition-colors">个人中心</span>
          </nav>
        </div>
        <button onClick={onBack} className="px-5 py-2 rounded-full border border-white/10 text-xs tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-all hover:border-[#38bdf8]/50">
          返回宇宙
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-12 px-6">
        <h2 className="text-3xl md:text-4xl font-light mb-10 tracking-widest text-center md:text-left">
          EJU <span className="text-[#38bdf8] font-bold">核心课程</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              onClick={() => !lesson.locked && onPlayVideo()}
              className={`relative flex flex-col p-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 ${lesson.locked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:bg-white/[0.08] hover:border-[#38bdf8]/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] cursor-pointer group'}`}
            >
              <div className="w-full h-48 rounded-2xl bg-[#0f172a] flex items-center justify-center relative overflow-hidden mb-4 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/20 to-transparent"></div>
                {lesson.locked ? (
                  <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ) : (
                  <svg className="w-12 h-12 text-[#38bdf8] group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] transition-all" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] tracking-widest border border-white/10 text-white/80">{lesson.time}</div>
              </div>
              <div className="px-2 pb-2">
                <span className="text-[10px] px-2 py-1 bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 rounded-md tracking-wider mr-2 uppercase">lesson 0{lesson.id}</span>
                <h3 className="text-lg font-medium mt-4 text-white/90 tracking-wide">{lesson.title}</h3>
                {!lesson.locked && (
                  <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div className="w-1/3 h-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. 个人中心组件
// ==========================================
function UserProfile({ onGoDashboard, onBack }) {
  return (
    <div className="absolute inset-0 z-50 bg-[#0a192f] overflow-y-auto pb-24 text-white">
      
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-20">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0">
          <h1 className="text-2xl font-bold tracking-widest text-[#38bdf8]">奇点教育</h1>
          <nav className="flex gap-4 md:gap-6 text-sm tracking-widest text-white/50">
            <span onClick={onGoDashboard} className="hover:text-white cursor-pointer transition-colors">学习面板</span>
            <span className="text-white border-b-2 border-[#38bdf8] pb-1 cursor-default">个人中心</span>
          </nav>
        </div>
        <button onClick={onBack} className="px-5 py-2 rounded-full border border-white/10 text-xs tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-all hover:border-[#38bdf8]/50">
          返回宇宙
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-12 px-6">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3 tracking-widest text-white/90">
            <span className="text-2xl">👤</span> 个人中心
          </h2>
          <p className="text-white/40 mt-3 text-xs tracking-wider">可在此查看账户信息并修改密码。</p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-6 backdrop-blur-md shadow-xl">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-8 text-white/80 tracking-widest border-b border-white/5 pb-4">
            <span className="opacity-70">📄</span> 账户信息
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <div>
              <div className="text-xs text-white/30 mb-2 tracking-widest">显示名（用户名）</div>
              <div className="text-sm font-medium text-white/80">---</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-2 tracking-widest">邮箱</div>
              <div className="text-sm font-medium text-white/80">---</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-2 tracking-widest">用户 ID</div>
              <div className="text-xs text-white/40 font-mono">---</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-2 tracking-widest">角色</div>
              <span className="bg-orange-500/10 text-orange-400 text-xs px-3 py-1 rounded border border-orange-500/20 font-bold">Free</span>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-2 tracking-widest">邮箱认证</div>
              <div className="text-sm text-green-400 flex items-center gap-2">
                <span className="text-xs">✅</span> 已认证
              </div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-2 tracking-widest">KYC 状态</div>
              <div className="text-sm text-[#38bdf8] hover:text-white cursor-pointer transition-colors flex items-center gap-1">
                未申请 (前往申请 →)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-6 backdrop-blur-md shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white/80 tracking-widest">
              <span className="opacity-70">🛡️</span> 本人认证信息 (KYC 提交内容)
            </h3>
            <button className="px-4 py-2 bg-white/[0.05] border border-white/20 rounded-lg text-xs text-white/80 hover:bg-white/10 transition-colors flex items-center gap-2">
              📝 修改 (重新申请 KYC)
            </button>
          </div>
          <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl flex items-center gap-3">
            <span className="text-yellow-500/80">🛡️</span>
            <span className="text-yellow-500/80 text-sm tracking-wide">
              尚未提交本人认证。<span className="text-yellow-400 font-bold ml-2 cursor-pointer hover:underline">申请 KYC →</span>
            </span>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-6 backdrop-blur-md shadow-xl">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-2 text-white/80 tracking-widest">
            <span className="opacity-70">🔑</span> 修改密码
          </h3>
          <p className="text-white/30 text-xs tracking-wider mb-8">至少 8 位 / 字母、数字、符号至少使用 2 种。</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs text-white/50 mb-2 tracking-widest">現在のパスワード <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="password" disabled className="w-full bg-[#0a192f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 outline-none focus:border-[#38bdf8]/50 transition-colors cursor-not-allowed" />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-2 tracking-widest">新しいパスワード <span className="text-red-500">*</span></label>
              <div className="relative mb-2">
                <input type="password" disabled className="w-full bg-[#0a192f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 outline-none focus:border-[#38bdf8]/50 transition-colors cursor-not-allowed" />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <p className="text-white/20 text-[10px]">8文字以上 / 英字・数字・記号のうち2種以上</p>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-2 tracking-widest">新しいパスワード（確認） <span className="text-red-500">*</span></label>
              <input type="password" disabled className="w-full bg-[#0a192f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 outline-none focus:border-[#38bdf8]/50 transition-colors cursor-not-allowed" />
            </div>

            <button className="w-full py-3.5 bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30 rounded-lg font-bold tracking-widest mt-4 hover:bg-[#38bdf8]/20 transition-all flex items-center justify-center gap-2 cursor-not-allowed">
              🔑 パスワードを変更する
            </button>

            <div className="bg-yellow-500/5 border border-yellow-500/10 p-3 rounded-lg text-yellow-500/50 text-[10px] tracking-widest text-center mt-2">
              密码经 bcrypt 哈希后保存（cost=10），服务器管理员也无法还原原始密码。
            </div>
          </div>
        </div>

        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 mb-12 backdrop-blur-md shadow-xl">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-2 text-red-400 tracking-widest">
            <span>⚠️</span> 危险操作
          </h3>
          <p className="text-red-400/50 text-xs tracking-wider mb-6">账户删除（30 天冷却期）将在 Phase 2 实现（FR-AUTH-008）。</p>
          <button disabled className="px-6 py-2.5 bg-transparent border border-red-500/30 text-red-500/40 rounded-lg text-xs tracking-widest cursor-not-allowed line-through decoration-red-500/30">
            删除账户 (未实现)
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. 视频播放器组件 (👑 新增剧场模式)
// ==========================================
function VideoPlayer({ onBack }) {
  // 👑 新增：剧场模式状态开关
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  return (
    // 👑 动态控制背景色：开启剧场模式时，背景压低为纯黑 #000000，关掉则恢复深渊蓝
    <div className={`absolute inset-0 z-50 flex flex-col h-screen text-white overflow-hidden transition-colors duration-700 ${isTheaterMode ? 'bg-[#000000]' : 'bg-[#0a192f]'}`}>
      
      {/* 顶部导航 */}
      <div className={`flex items-center justify-between px-6 py-4 border-b border-white/5 z-10 transition-colors duration-700 ${isTheaterMode ? 'bg-[#000000]' : 'bg-[#0a192f]'}`}>
        <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm tracking-widest">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span className="hidden md:inline">返回课程目录</span><span className="inline md:hidden">返回</span>
        </button>
        
        {/* 👑 剧场模式按钮切换逻辑 */}
        <button 
          onClick={() => setIsTheaterMode(!isTheaterMode)}
          className={`text-xs px-4 py-1.5 rounded-full tracking-widest transition-all duration-300 ${
            isTheaterMode 
            ? 'text-red-400 border border-red-400/30 bg-red-400/10 hover:bg-red-400/20 shadow-[0_0_10px_rgba(248,113,113,0.2)]' // 退出剧场的红色警示样式
            : 'text-[#38bdf8] border border-[#38bdf8]/30 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20' // 默认样式
          }`}
        >
          {isTheaterMode ? '退出剧场' : '剧场模式'}
        </button>
      </div>

      <div className="flex flex-col-reverse md:flex-row flex-1 p-4 md:p-6 gap-4 md:gap-6 min-h-0 overflow-y-auto">
        
        {/* 左侧：视频与操作区 (在剧场模式下，由于 flex-1，右侧消失后它会自动撑满全屏) */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-500">
          <div className={`w-full bg-black rounded-3xl border border-white/10 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden mb-6 transition-all duration-500 ${isTheaterMode ? 'aspect-[21/9] md:aspect-video' : 'aspect-video'}`}>
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black flex flex-col justify-end p-4 md:p-8 pointer-events-none">
                <h1 className="text-2xl md:text-4xl font-bold tracking-widest mb-2 md:mb-4">第1讲 多项式与因式分解</h1>
                <p className="text-[#38bdf8] tracking-widest text-xs">EJU 数学核心课程</p>
             </div>
             <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent flex items-end px-4 md:px-6 pb-3 md:pb-4">
                <div className="w-full flex items-center gap-3 md:gap-4">
                  <svg className="w-5 h-5 text-white hover:text-[#38bdf8] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  <span className="text-[10px] md:text-xs tracking-wider text-white/70">12:45 / 16:01</span>
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-[#38bdf8] rounded-full shadow-[0_0_10px_#38bdf8]"></div>
                  </div>
                  <svg className="w-5 h-5 text-white hover:text-[#38bdf8] cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </div>
             </div>
          </div>
          <div className="flex gap-4">
             <button className="flex-1 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs tracking-widest hover:bg-white/[0.08] hover:border-[#38bdf8]/40 transition-all flex items-center justify-center gap-2 group">
               <svg className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
               AI 助教答疑
             </button>
             <button className="flex-1 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs tracking-widest hover:bg-white/[0.08] hover:border-[#38bdf8]/40 transition-all flex items-center justify-center gap-2 group">
               <svg className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               随堂练习
             </button>
          </div>
        </div>

        {/* 👑 右侧：章节目录 (开启剧场模式时，这个区块会被隐藏) */}
        {!isTheaterMode && (
          <div className="w-full md:w-80 bg-white/[0.02] border border-white/10 rounded-3xl p-5 flex flex-col backdrop-blur-md h-full min-h-0 transition-opacity duration-500">
            <h3 className="text-sm font-bold tracking-[0.2em] mb-4 border-b border-white/10 pb-4 text-white/80">章节目录</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar min-h-0">
              {['学习目标', '单项式与多项式', '同类项', '展开定义', '展开公式(基本3个)', '展开公式(应用5个)', '例题1 提示', '例题1 解答'].map((chapter, idx) => (
                <div key={idx} className={`px-4 py-3.5 rounded-xl cursor-pointer transition-all text-xs tracking-wider flex items-center gap-4 border border-transparent ${idx === 1 ? 'bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/20 shadow-inner' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}>
                  <span className={`text-[10px] ${idx === 1 ? 'opacity-80' : 'opacity-40'}`}>0{idx + 1}</span>
                  {chapter}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. 奇点宇宙主舞台
// ==========================================
export default function CurriculumSection({ onClose }) {
  const [activePlanet, setActivePlanet] = useState('earth');
  const [currentView, setCurrentView] = useState('universe'); 
  const [showIntro, setShowIntro] = useState(true);

  const coursesData = [
    { id: 'sun', name: 'EJU 核心课', title: 'SUN', desc: '恒星级核心课程，点燃你的学习引擎。' },
    { id: 'earth', name: '日本語', title: 'EARTH', desc: '语言的边界就是思想的边界，掌握 EJU 文理通用语言。' },
    { id: 'mercury', name: '数学 1', title: 'MERCURY', desc: '水星般敏捷，攻克基础数学核心考点。' },
    { id: 'venus', name: '数学 2', title: 'VENUS', desc: '金星般璀璨，进阶高等数学逻辑推演。' },
    { id: 'mars', name: '物 理', title: 'MARS', desc: '火星般硬核，探寻宇宙底层的物理定律。' },
    { id: 'jupiter', name: '化 学', title: 'JUPITER', desc: '木星般庞大，构建宏大的化学反应网络。' },
    { id: 'uranus', name: '総合科目', title: 'URANUS', desc: '天王星般深邃，洞悉文科综合的底层脉络。' },
    { id: 'neptune', name: '生 物', title: 'NEPTUNE', desc: '海王星般神秘，探索生命科学的无尽奥秘。' },
  ];

  const activeCourse = coursesData.find(c => c.id === activePlanet);

  return (
    <section className="w-full h-full flex-none bg-[#000000] relative overflow-hidden">
      
      {showIntro && (
        <CourseTransition onComplete={() => setShowIntro(false)} />
      )}

      {currentView === 'universe' && (
        <>
          <div className="absolute inset-0 z-0 bg-black">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
              <source src="/galaxy-bg.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 z-10 pointer-events-none">
            <PlanetBackground activePlanet={activePlanet} />
          </div>

          <div className={`w-full h-full absolute inset-0 z-20 transition-opacity duration-1000 pointer-events-none ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full px-4 flex flex-col items-center pointer-events-auto">
              <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-6 tracking-wider" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                THE EJU UNIVERSE
              </h2>
              <div className="flex flex-wrap justify-center gap-2 md:gap-6 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all">
                {coursesData.map((course) => (
                  <button 
                    key={course.id}
                    onClick={() => setActivePlanet(course.id)}
                    className={`text-xs md:text-sm font-medium tracking-widest px-4 py-1.5 rounded-full transition-all duration-300 ${
                      activePlanet === course.id 
                      ? 'bg-white/20 text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.5)]' 
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {course.name}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="absolute top-10 left-10 text-white/40 hover:text-white uppercase tracking-widest text-[10px] flex items-center gap-2 pointer-events-auto"
            >
              ← Back
            </button>

            {activeCourse && (
              <div 
                className={`bg-black/40 border border-white/10 backdrop-blur-xl pointer-events-auto
                  fixed bottom-0 left-0 w-full p-6 pb-12 rounded-t-[24px] rounded-b-0 shadow-2xl
                  md:absolute md:top-1/2 md:translate-y-[-50%] md:w-[420px] md:p-10 md:rounded-3xl
                  md:left-auto md:right-12 transition-all duration-500`}
              >
                <div className="text-[#38bdf8] text-xs font-bold tracking-[0.3em] mb-2 uppercase">
                  {activeCourse.title} SYSTEM
                </div>
                <h2 className="text-white text-3xl md:text-4xl font-semibold mb-4 tracking-wider">
                  {activeCourse.name}
                </h2>
                <p className="text-[#cbd5e1]/80 text-sm md:text-base leading-relaxed mb-10 tracking-wide">
                  {activeCourse.desc}
                </p>
                
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="group relative w-full p-4 overflow-hidden rounded-xl bg-white/10 border border-white/20 hover:border-[#38bdf8]/50 transition-all cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="relative z-10 text-white font-bold tracking-widest">进入沉浸航线</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {currentView === 'dashboard' && (
        <LMSDashboard 
          onPlayVideo={() => setCurrentView('video')} 
          onGoProfile={() => setCurrentView('profile')}
          onBack={() => setCurrentView('universe')} 
        />
      )}

      {currentView === 'profile' && (
        <UserProfile 
          onGoDashboard={() => setCurrentView('dashboard')}
          onBack={() => setCurrentView('universe')} 
        />
      )}

      {currentView === 'video' && (
        <VideoPlayer 
          onBack={() => setCurrentView('dashboard')} 
        />
      )}

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}