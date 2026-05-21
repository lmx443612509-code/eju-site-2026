import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LandingReveal.css';

export default function LandingReveal({ onComplete }) {
  const compRef = useRef(null);
  const progressRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tlRef = useRef(null); 

  useEffect(() => {
    let ctx = gsap.context(() => {
      const circumference = 943; 

      gsap.set(progressRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference, 
      });

      const introTl = gsap.timeline({
        delay: 0.3,
        onComplete: () => setIsLoaded(true) 
      });

      introTl
        .to(progressRef.current, { strokeDashoffset: 0, duration: 2.0, ease: "power2.inOut" })
        .to('.pbc-svg', { rotation: 90, duration: 2.0, ease: "power2.inOut" }, "<")
        .to('.preloader-btn-container', { scale: 0.92, duration: 0.6, ease: "back.out(2.5)" })
        .fromTo('.pbc-label', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.4");
    }, compRef);

    return () => ctx.revert(); 
  }, []);

  const handleEngage = () => {
    if (!isLoaded) return; 
    setIsLoaded(false);

    let ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tlRef.current
        .to('.preloader-btn-container', { scale: 0.85, duration: 0.4, ease: "power3.out" })
        .to('.pbc-label', { y: '-100%', opacity: 0, duration: 0.4 }, "<")
        .to('.pbc-outro-label', { y: '0%', opacity: 1, duration: 0.4, ease: "power2.out" }, "<0.1")
        .to(progressRef.current, { strokeDashoffset: -943, duration: 1.1, ease: "power3.inOut" }, "<0.2")
        .to('.preloader-backdrop', { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', duration: 1.2, ease: "expo.inOut" }, "-=0.6")
        .to('.preloader-revealer', { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', duration: 1.2, ease: "expo.inOut" }, "-=1.1");
        
    }, compRef);
  };

  return (
    // 👑 修复重点：absolute 改成了 fixed，w-full 改成了 w-screen，加了 bg-black 兜底，确保强制全屏死死捂住
    <div ref={compRef} className="reveal-container fixed inset-0 z-[9999] w-screen h-screen overflow-hidden pointer-events-auto bg-black">
      <div className="preloader-backdrop absolute inset-0 z-50 bg-black flex items-center justify-center">
        <div className="preloader-btn-container relative w-64 h-64 flex items-center justify-center cursor-pointer" onClick={handleEngage}>
          <svg className="pbc-svg absolute w-full h-full -rotate-90" viewBox="0 0 320 320">
            <circle className="stroke-[#2b2b2b]" cx="160" cy="160" r="150" fill="none" strokeWidth="2" />
            <circle ref={progressRef} className="stroke-white" cx="160" cy="160" r="150" fill="none" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="overflow-hidden absolute flex items-center justify-center w-full h-full">
            <p className="pbc-label text-white font-mono text-xl tracking-widest uppercase opacity-0">奇点EJU</p>
          </div>
          <div className="overflow-hidden absolute flex items-center justify-center w-full h-full">
            <p className="pbc-outro-label text-white font-mono text-sm tracking-widest uppercase translate-y-[100%] opacity-0">授权成功</p>
          </div>
        </div>
      </div>
      <section className="hero relative w-full h-full flex items-center justify-center pointer-events-none">
        <div className="preloader-revealer absolute inset-0 z-40 bg-white" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}></div>
      </section>
    </div>
  );
}