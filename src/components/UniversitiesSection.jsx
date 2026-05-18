import React from 'react';
import { motion } from 'framer-motion';

export default function UniversitiesSection({ onOpenVault }) {
  const universityCards = [
    {
      name: "东京大学",
      desc: "日本最高学府，文理科全面领先。",
      img: "/todai.jpg"
    },
    {
      name: "京都大学",
      desc: "崇尚自由学风，科研实力顶级。",
      img: "/kyodai.jpg"
    },
    {
      name: "早稻田大学",
      desc: "私立双雄，政经商科顶尖人才摇篮。",
      img: "/waseda.jpg"
    }
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all mb-6">
            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
            </svg>
            <span className="text-xs font-medium tracking-widest text-white/80 uppercase">名校进阶之路</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">为你量身定制的冲刺目标</h2>
          <p className="text-lg text-white/60 tracking-wide">覆盖日本顶尖国公立与私立名校，奇点 EJU 助你直达理想学府。</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenVault} 
          className="group flex items-center gap-6 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer"
        >
          <span className="text-2xl font-bold text-white tracking-wide">
            开启院校情报矩阵
          </span>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#b38b6d] group-hover:border-[#b38b6d] transition-all duration-300">
            <svg className="w-5 h-5 text-white/70 group-hover:text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {universityCards.map((uni, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -8 }}
            className="relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md flex flex-col group hover:bg-white/10 transition-all duration-500"
          >
            <div className="h-64 overflow-hidden relative">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
               <img 
                 src={uni.img} 
                 alt={uni.name} 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
               />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{uni.name}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{uni.desc}</p>
              </div>
              <div className="mt-8 flex items-center justify-between relative z-10">
                <span className="text-xs text-white/60 font-bold tracking-widest uppercase">Explore Details</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}