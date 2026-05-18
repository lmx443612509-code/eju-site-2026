import React from 'react';
import { motion } from 'framer-motion';

export default function PastExamsSection() {
  const exams = [
    { 
      title: "EJU 日本留考真题", 
      count: "12份",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      title: "大学校内考题目", 
      count: "8份",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      title: "模拟笔试测试", 
      count: "5份",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 z-10">
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">历年真题资源库</h2>
        <p className="text-white/50">沉浸式模拟实战，击穿备考信息壁垒。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exams.map((exam, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center hover:bg-white/10 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#b38b6d] group-hover:bg-[#b38b6d] group-hover:text-white transition-all">
              {exam.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{exam.title}</h3>
            <p className="text-sm text-white/30 uppercase tracking-widest">{exam.count} 精选资源</p>
            <button className="mt-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest font-bold">
              点击进入检索
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}