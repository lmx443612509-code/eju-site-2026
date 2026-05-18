import React from 'react';

export default function HeroHeader() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 极简的发光背景装饰 */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: '#00ffff', filter: 'blur(150px)', opacity: 0.15 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: '#8c52ff', filter: 'blur(150px)', opacity: 0.15 }}></div>

      <div style={{ zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '8px', margin: '0 0 20px 0', textShadow: '0 0 30px rgba(0, 255, 255, 0.4)' }}>
          奇点教育 <span style={{ color: '#00ffff' }}>EJU</span>
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#cbd5e1', letterSpacing: '2px', margin: '0 0 50px 0', fontWeight: '300' }}>
          通往日本顶尖名校的全息备考宇宙
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button style={{ 
            padding: '16px 40px', fontSize: '1.2rem', fontWeight: 'bold', color: '#000', 
            background: 'linear-gradient(90deg, #00ffff, #00bfff)', border: 'none', 
            borderRadius: '30px', cursor: 'pointer', boxShadow: '0 0 20px rgba(0,255,255,0.4)',
            transition: 'transform 0.2s'
          }} onMouseOver={e => e.target.style.transform = 'scale(1.05)'} onMouseOut={e => e.target.style.transform = 'scale(1)'}>
            进入星系探索
          </button>
          <button style={{ 
            padding: '16px 40px', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', 
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', 
            borderRadius: '30px', cursor: 'pointer', backdropFilter: 'blur(10px)',
            transition: 'background 0.2s'
          }} onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.05)'}>
            了解课程体系
          </button>
        </div>
      </div>
      
      {/* 滚动提示符 */}
      <div style={{ position: 'absolute', bottom: '40px', color: '#00ffff', opacity: 0.6, animation: 'bounce 2s infinite' }}>
        <div style={{ fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '10px' }}>SCROLL DOWN</div>
        <div style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, #00ffff, transparent)', margin: '0 auto' }}></div>
      </div>
    </div>
  );
}