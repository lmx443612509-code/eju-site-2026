import React, { useRef, useEffect } from 'react';

const LineWaves = ({
  speed = 0.3,
  innerLineCount = 24,
  outerLineCount = 40,
  warpIntensity = 1,
  rotation = -45,
  edgeFadeWidth = 0,
  colorCycleSpeed = 1,
  brightness = 0.3,
  color1 = '#ffffff',
  color2 = '#174da7',
  color3 = '#c78557',
  enableMouseInteraction = true,
  mouseInfluence = 2
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    // 鼠标物理追踪
    let mouse = { x: -1000, y: -1000 };
    let targetMouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
    };

    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 颜色解析器
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 255, g: 255, b: 255 };
    };

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const c3 = hexToRgb(color3);

    const render = () => {
      time += 0.01 * speed;
      
      // 鼠标丝滑插值
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);
      
      const totalLines = innerLineCount + outerLineCount;
      const spacing = 18; 
      const halfWidth = canvas.width;
      
      for (let i = 0; i < totalLines; i++) {
        const yPos = (i - totalLines / 2) * spacing;
        
        ctx.beginPath();
        for (let x = -halfWidth; x <= halfWidth; x += 10) {
          // 波浪数学变形
          let waveY = Math.sin(x * 0.005 + time) * 30 * warpIntensity;
          let waveX = Math.cos(yPos * 0.01 - time) * 20 * warpIntensity;

          // 鼠标干涉计算
          if (enableMouseInteraction) {
            const rotatedX = x * Math.cos(rotation * Math.PI / 180) - (yPos + waveY) * Math.sin(rotation * Math.PI / 180);
            const rotatedY = x * Math.sin(rotation * Math.PI / 180) + (yPos + waveY) * Math.cos(rotation * Math.PI / 180);
            const screenX = rotatedX + cx;
            const screenY = rotatedY + cy;
            
            const dx = screenX - mouse.x;
            const dy = screenY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 300) {
              const influence = (300 - dist) / 300;
              waveY -= dy * influence * mouseInfluence * 0.15;
            }
          }

          if (x === -halfWidth) {
            ctx.moveTo(x + waveX, yPos + waveY);
          } else {
            ctx.lineTo(x + waveX, yPos + waveY);
          }
        }
        
        // 呼吸渐变混色逻辑
        const cycle = (Math.sin(time * colorCycleSpeed + i * 0.1) + 1) / 2;
        let r, g, b;
        if (cycle < 0.5) {
          const t = cycle * 2;
          r = c1.r * (1 - t) + c2.r * t;
          g = c1.g * (1 - t) + c2.g * t;
          b = c1.b * (1 - t) + c2.b * t;
        } else {
          const t = (cycle - 0.5) * 2;
          r = c2.r * (1 - t) + c3.r * t;
          g = c2.g * (1 - t) + c3.g * t;
          b = c2.b * (1 - t) + c3.b * t;
        }
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${brightness})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      ctx.restore();
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [speed, innerLineCount, outerLineCount, warpIntensity, rotation, colorCycleSpeed, brightness, color1, color2, color3, enableMouseInteraction, mouseInfluence]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background: 'transparent' // 让出底层给你外层的黑底
      }}
    />
  );
};

export default LineWaves;