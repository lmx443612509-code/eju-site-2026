import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// SVG 徽章库保持不变
const Icons = {
  Japanese: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>,
  Science: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" strokeWidth="1.5"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9-4.5Z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.7 3.3c2.04 2.03 4.06 7.36-.46 11.9-4.52 4.54-9.85 6.54-11.9 4.5-2.03-2.04-.02-7.36 4.5-11.9 4.54-4.52 9.87-6.54 11.9-4.5Z"/></svg>,
  Arts: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" strokeWidth="1.5"/><circle cx="6" cy="12" r="3" strokeWidth="1.5"/><circle cx="18" cy="19" r="3" strokeWidth="1.5"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth="1.5"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth="1.5"/></svg>,
  Math: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 20h16M4 4v16m4-8l4-4 4 4 4-8"/></svg>,
  PDF: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  Audio: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
  Doc: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Building: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  Edit: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
};

const mockArchiveData = {
  years: ['2023', '2022', '2021', '2020', '2019', '2018'],
  subjects: [
    { id: 'japanese', name: '日本語', icon: Icons.Japanese },
    { id: 'science', name: '理科', icon: Icons.Science },
    { id: 'arts', name: '総合科目', icon: Icons.Arts },
    { id: 'math', name: '数学', icon: Icons.Math },
  ],
  papers: [
    { id: 1, year: '2023', subject: 'japanese', round: '第 2 回 (11月)', size: '18.4 MB', hasAudio: true, hash: 'EJU-JP-2302' },
    { id: 2, year: '2023', subject: 'japanese', round: '第 1 回 (6月)', size: '17.1 MB', hasAudio: true, hash: 'EJU-JP-2301' },
    { id: 3, year: '2023', subject: 'science', round: '第 2 回 (11月)', size: '9.2 MB', hasAudio: false, hash: 'EJU-SC-2302' },
    { id: 4, year: '2023', subject: 'arts', round: '第 2 回 (11月)', size: '12.5 MB', hasAudio: false, hash: 'EJU-AR-2302' },
    { id: 5, year: '2022', subject: 'japanese', round: '第 2 回 (11月)', size: '19.0 MB', hasAudio: true, hash: 'EJU-JP-2202' },
  ]
};

const EjuArchiveModal = ({ isOpen, onClose }) => {
  const [activeYear, setActiveYear] = useState('2023');
  const [activeSubject, setActiveSubject] = useState('japanese');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const filteredPapers = mockArchiveData.papers.filter(
    p => p.year === activeYear && p.subject === activeSubject
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#0a192f]/90 flex flex-col overflow-hidden"
        >
          <div className="flex justify-between items-center px-10 py-6 border-b border-white/5 bg-black/20">
            <div>
              <h2 className="text-2xl font-bold tracking-widest text-white">EJU ARCHIVE <span className="text-[#38bdf8]">TERMINAL</span></h2>
              <p className="text-[#38bdf8]/50 text-[10px] tracking-[0.4em] mt-1 uppercase">日本留学试验 历年真题检索矩阵</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-all hover:rotate-90">✕</button>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="w-32 border-r border-white/5 flex flex-col p-6 overflow-y-auto custom-scrollbar">
              <div className="text-white/30 text-[10px] tracking-widest mb-6">TIMELINE</div>
              <div className="flex flex-col gap-4">
                {mockArchiveData.years.map(year => (
                  <button key={year} onClick={() => setActiveYear(year)} className={`text-left text-lg font-light tracking-wider transition-all duration-300 relative ${activeYear === year ? 'text-[#38bdf8] scale-110 translate-x-2' : 'text-white/40 hover:text-white hover:translate-x-1'}`}>
                    {activeYear === year && <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />}
                    {year}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
              <div className="flex flex-wrap gap-4 mb-10">
                {mockArchiveData.subjects.map(subject => (
                  <button key={subject.id} onClick={() => setActiveSubject(subject.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest transition-all duration-300 border ${activeSubject === subject.id ? 'bg-[#38bdf8]/10 border-[#38bdf8]/50 text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.2)]' : 'bg-white/[0.02] border-white/10 text-white/50 hover:bg-white/5 hover:text-white'}`}>
                    {subject.icon} {subject.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                <AnimatePresence mode="popLayout">
                  {filteredPapers.length > 0 ? (
                    filteredPapers.map(paper => (
                      <motion.div key={paper.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-md hover:border-[#38bdf8]/30 hover:bg-white/[0.04] transition-all group">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="text-white/80 text-lg font-medium tracking-wider group-hover:text-white transition-colors">{paper.year}年度 {paper.round}</div>
                            <div className="text-[#38bdf8]/70 text-xs mt-2 font-mono flex items-center gap-3"><span>VOL: {paper.hash}</span><span className="w-1 h-1 rounded-full bg-white/20" /><span>{paper.size}</span></div>
                          </div>
                          <div className="text-white/20 group-hover:text-[#38bdf8]/50 transition-colors">{mockArchiveData.subjects.find(s => s.id === paper.subject)?.icon}</div>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4 border-t border-white/5 pt-5">
                          <button className="flex-1 min-w-[120px] px-4 py-2.5 bg-[#38bdf8]/5 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/20 rounded-lg text-[#38bdf8] text-xs tracking-widest flex items-center justify-center gap-2 transition-all">{Icons.PDF} 卷面提取</button>
                          <button className="flex-1 min-w-[120px] px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white text-xs tracking-widest flex items-center justify-center gap-2 transition-all">{Icons.PDF} 答案解密</button>
                          {paper.hasAudio && <button className="w-full mt-1 px-4 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-purple-400 text-xs tracking-widest flex items-center justify-center gap-2 transition-all">{Icons.Audio} 加载听力波段</button>}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 flex flex-col items-center justify-center text-white/20">
                      <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      <div className="tracking-widest text-sm">该周期数据暂未录入终端</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default function PastExamsSection() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const cards = [
    { id: 'eju', title: 'EJU 日本留考真题', subtitle: '历年完整收录', icon: Icons.Doc, active: true },
    { id: 'university', title: '大学校内考题目', subtitle: '8份 精选资源', icon: Icons.Building, active: false },
    { id: 'mock', title: '模拟笔试测试', subtitle: '5份 精选资源', icon: Icons.Edit, active: false }
  ];

  return (
    <>
      <section className="relative w-full py-24 px-6 md:px-10 z-10 flex flex-col items-center">
        <div className="w-full max-w-6xl mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-white mb-4">历年真题资源库</h2>
          <p className="text-white/50 text-sm tracking-wider">沉浸式模拟实战，击穿备考信息壁垒。</p>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card) => (
            <div 
              key={card.id}
              onClick={() => card.active ? setIsArchiveOpen(true) : alert('该情报库正在升级中，敬请期待。')}
              // 👑 原版配方：真题卡片主体
              className={`relative flex flex-col items-center justify-center p-12 rounded-3xl overflow-hidden transition-all duration-700 ${card.active ? 'cursor-pointer hover:scale-[0.98] group' : 'cursor-not-allowed opacity-60'}`}
              style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.05)" }}
            >
              <div className="absolute inset-0 z-0 pointer-events-none" style={{ backdropFilter: "blur(8px)", filter: "url(#glass-distortion)", isolation: "isolate" }} />
              <div className={`absolute inset-0 z-10 pointer-events-none transition-colors duration-500 ${card.active ? 'bg-white/[0.12] group-hover:bg-white/[0.2]' : 'bg-white/[0.12]'}`} />
              <div className="absolute inset-0 z-20 pointer-events-none" style={{ boxShadow: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 0.5px 0 rgba(255, 255, 255, 0.1)" }} />
              
              <div className="relative z-30 flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center mb-6 text-white/90 drop-shadow-md group-hover:text-[#38bdf8] transition-all duration-500 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]">
                  {card.icon}
                </div>
                
                <h3 className="text-lg font-bold tracking-widest text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">{card.title}</h3>
                <p className="text-xs text-white/90 font-medium tracking-widest mb-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{card.subtitle}</p>
                
                <button className={`px-6 py-2 rounded-full text-[10px] tracking-widest border transition-all shadow-sm ${
                  card.active 
                  ? 'bg-white/20 border-white/40 text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] group-hover:bg-[#38bdf8] group-hover:border-[#38bdf8] group-hover:text-black group-hover:drop-shadow-none'
                  : 'bg-transparent border-white/20 text-white/50'
                }`}>
                  点击进入检索
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EjuArchiveModal isOpen={isArchiveOpen} onClose={() => setIsArchiveOpen(false)} />
    </>
  );
}