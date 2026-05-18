import React from 'react';

export default function UniversitySection() {
  return (
    <section className="premium-section">
      <div className="section-header">
        <h2 className="glow-title">🏛️ 名門大学への道</h2>
        <p className="subtitle">为你量身定制的冲刺目标，覆盖日本顶尖国公立与私立名校。</p>
      </div>

      <div className="university-grid">
        {/* 大学卡片 1 */}
        <div className="premium-glass-card">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80" alt="Tokyo Univ" />
          </div>
          <div className="card-content">
            <h3>東京大学</h3>
            <p>日本最高学府，文理科全面领先。</p>
            <button className="cyber-btn">查看详情</button>
          </div>
        </div>

        {/* 大学卡片 2 */}
        <div className="premium-glass-card">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" alt="Kyoto Univ" />
          </div>
          <div className="card-content">
            <h3>京都大学</h3>
            <p>崇尚自由学风，科研实力顶级。</p>
            <button className="cyber-btn">查看详情</button>
          </div>
        </div>

        {/* 大学卡片 3 */}
        <div className="premium-glass-card">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=600&q=80" alt="Waseda Univ" />
          </div>
          <div className="card-content">
            <h3>早稲田大学</h3>
            <p>私立双雄之一，国际化程度极高。</p>
            <button className="cyber-btn">查看详情</button>
          </div>
        </div>
      </div>
    </section>
  );
}