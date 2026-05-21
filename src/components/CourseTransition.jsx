import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// 👑 新增：接收一个 onComplete 函数，动画播完通知父组件
export default function CourseTransition({ onComplete }) {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        // 👑 动画彻底结束时，触发回调，让父组件把这个黑幕销毁
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.to('.micro-text', { opacity: 0.6, duration: 1, stagger: 0.1, ease: "power2.out" })
        .to('.char', { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "back.out(1.2)" }, "-=0.5")
        .to({}, { duration: 1.5 }) 
        .to('.blade', { scaleX: 1, opacity: 1, duration: 0.3, ease: "expo.inOut" }, "split")
        .to('.top-text', { y: '-=50', opacity: 0, duration: 0.8, ease: "power3.in" }, "split+=0.1")
        .to('.bottom-text', { y: '+=50', opacity: 0, duration: 0.8, ease: "power3.in" }, "split+=0.1")
        .to('.blade', { opacity: 0, duration: 0.2 }, "split+=0.3")
        // 黑幕撕开，露出底下的 3D 宇宙
        .to('.mask-top', { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "split+=0.3")
        .to('.mask-bottom', { yPercent: 100, duration: 1.2, ease: "expo.inOut" }, "split+=0.3")
        .to('.micro-text', { opacity: 0, duration: 0.5 }, "split+=0.3");
        
        // 🗑️ 删掉了原来这里的 display: "none"，交给 React 销毁
    }, comp);

    return () => ctx.revert();
  }, [onComplete]);

  const mainText = "奇点已至  认知裂变";
  
  const renderChars = () => mainText.split('').map((char, index) => (
    <span key={index} className="char inline-block opacity-0" style={{ transform: 'translateY(100%)' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    // 确保层级最高，能遮住底下的 3D 宇宙
    <div ref={comp} className="absolute inset-0 z-[9999] font-sans selection:bg-transparent pointer-events-none">
      
      <div className="mask-top absolute top-0 left-0 w-full h-1/2 bg-[#080808]"></div>
      <div className="mask-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#080808]"></div>
      
      <div className="micro-text absolute top-8 left-8 opacity-0 text-white/50 text-xs tracking-[0.2em] z-10 hidden md:block">
        SYSTEM.INIT // SINGULARITY_EJU
      </div>
      <div className="micro-text absolute top-8 right-8 opacity-0 text-white/50 text-xs tracking-[0.2em] z-10 hidden md:block">
        LAT: 35.75° N | LON: 139.73° E
      </div>
      <div className="micro-text absolute bottom-8 left-8 opacity-0 text-white/50 text-xs tracking-[0.2em] z-10 hidden md:block leading-relaxed">
        COGNITIVE EXPANSION : ACTIVE <br/>
        TARGET : JAPAN UNIVERSITY
      </div>
      <div className="micro-text absolute bottom-8 right-8 opacity-0 text-white/50 text-xs tracking-[0.2em] z-10 hidden md:block">
        SCROLL TO EXPLORE ↓
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center items-center">
        <div 
            className="blade absolute left-0 w-full h-[1px] bg-white z-30 opacity-0" 
            style={{ top: '50%', transformOrigin: 'center', transform: 'scaleX(0)' }}
        ></div>

        <div className="text-white text-[4vw] md:text-[3.5vw] font-black tracking-[0.2em] whitespace-nowrap">
          <div className="top-text absolute left-1/2 -translate-x-1/2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}>
            {renderChars()}
          </div>
          <div className="bottom-text relative" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}>
            {renderChars()}
          </div>
        </div>
      </div>
    </div>
  );
}