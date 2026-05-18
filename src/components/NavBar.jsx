import React, { useState, useEffect } from 'react';
import StarBorder from './StarBorder'; 

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-logo" style={{ textDecoration: 'none', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
        渡来教育
      </a>
      
      <div className="nav-links" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <StarBorder as="a" href="#courses" color="#00e5ff" speed="4s" thickness={1}>
          <span style={{ display: 'inline-block', color: '#fff', padding: '6px 16px', fontSize: '0.9rem' }}>查看课程</span>
        </StarBorder>
        
        <StarBorder as="a" href="#universities" color="#00e5ff" speed="4s" thickness={1}>
          <span style={{ display: 'inline-block', color: '#fff', padding: '6px 16px', fontSize: '0.9rem' }}>大学受験</span>
        </StarBorder>
        
        <StarBorder as="a" href="#features" color="#00e5ff" speed="4s" thickness={1}>
          <span style={{ display: 'inline-block', color: '#fff', padding: '6px 16px', fontSize: '0.9rem' }}>特色</span>
        </StarBorder>
        
        <StarBorder as="a" href="#team" color="#00e5ff" speed="4s" thickness={1}>
          <span style={{ display: 'inline-block', color: '#fff', padding: '6px 16px', fontSize: '0.9rem' }}>チーム</span>
        </StarBorder>
        
        <StarBorder as="a" href="#" color="#00e5ff" speed="3s" thickness={2}>
          <span style={{ display: 'inline-block', color: '#00e5ff', padding: '6px 20px', fontSize: '0.9rem', fontWeight: 'bold' }}>ログイン</span>
        </StarBorder>
      </div>
    </nav>
  );
}