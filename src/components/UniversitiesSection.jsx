import React from 'react';
import { motion } from 'framer-motion';

export default function UniversitiesSection({ onOpenVault }) {
  const universityCards = [
    { name: "东京大学", desc: "日本最高学府，文理科全面领先。", img: "/todai.jpg" },
    { name: "京都大学", desc: "崇尚自由学风，科研实力顶级。", img: "/kyodai.jpg" },
    { name: "早稻田大学", desc: "私立双雄，政经商科顶尖人才摇篮。", img: "/waseda.jpg" }
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          
          {/* 👑 原版配方：药丸标签 */}
          <div 
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden mb-6"
            style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.05)" }}
          >
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backdropFilter: "blur(8px)", filter: "url(#glass-distortion)", isolation: "isolate" }} />
            <div className="absolute inset-0 z-10 pointer-events-none bg-white/[0.12]" />
            <div className="absolute inset-0 z-20 pointer-events-none" style={{ boxShadow: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 0.5px 0 rgba(255, 255, 255, 0.1)" }} />
            <div className="relative z-30 flex items-center gap-2">
              <svg className="w-4 h-4 text-white/90 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
              </svg>
              <span className="text-xs font-bold tracking-widest text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">名校进阶之路</span>
            </div>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">为你量身定制的冲刺目标</h2>
          <p className="text-lg text-white/60 tracking-wide">覆盖日本顶尖国公立与私立名校，奇点 EJU 助你直达理想学府。</p>
        </div>

        {/* 👑 原版配方：右侧按钮 */}
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenVault} 
          className="group relative flex items-center gap-6 px-8 py-5 rounded-2xl overflow-hidden cursor-pointer"
          style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.05)" }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ backdropFilter: "blur(8px)", filter: "url(#glass-distortion)", isolation: "isolate" }} />
          <div className="absolute inset-0 z-10 pointer-events-none bg-white/[0.12] group-hover:bg-white/[0.2] transition-colors duration-500" />
          <div className="absolute inset-0 z-20 pointer-events-none" style={{ boxShadow: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 0.5px 0 rgba(255, 255, 255, 0.1)" }} />
          <div className="relative z-30 flex items-center gap-6">
            <span className="text-2xl font-bold text-white tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              开启院校情报矩阵
            </span>
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center group-hover:bg-[#38bdf8] group-hover:border-[#38bdf8] transition-all duration-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]">
              <svg className="w-5 h-5 text-white/90 drop-shadow-sm group-hover:text-black transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {universityCards.map((uni, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -8 }}
            className="relative rounded-[2.5rem] overflow-hidden flex flex-col group transition-all duration-500 shadow-2xl"
          >
            <div className="h-64 overflow-hidden relative z-0">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
               <img src={uni.img} alt={uni.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
            </div>
            
            {/* 👑 原版配方：大学卡片底座 */}
            <div 
              className="relative p-8 flex-grow flex flex-col justify-between overflow-hidden"
              style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.05)" }}
            >
              <div className="absolute inset-0 z-0 pointer-events-none" style={{ backdropFilter: "blur(8px)", filter: "url(#glass-distortion)", isolation: "isolate" }} />
              <div className="absolute inset-0 z-10 pointer-events-none bg-white/[0.12] group-hover:bg-white/[0.16] transition-colors duration-500" />
              <div className="absolute inset-0 z-20 pointer-events-none" style={{ boxShadow: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 0.5px 0 rgba(255, 255, 255, 0.1)" }} />
              
              <div className="relative z-30 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{uni.name}</h3>
                  <p className="text-sm font-medium text-white/90 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{uni.desc}</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs text-white/90 font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Explore Details</span>
                  <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-white/20 group-hover:bg-white/40 transition-all shadow-sm">
                    <svg className="w-4 h-4 text-white/90 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}