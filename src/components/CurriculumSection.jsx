import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Stars, useTexture, shaderMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ==========================================
// 1. 星系着色器与宇宙组件
// ==========================================
const GalaxyDiskMaterial = shaderMaterial(
  { uTexture: new THREE.Texture(), uTime: 0 },
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  `
    uniform sampler2D uTexture; 
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 offset = vUv - center;
      float dist = length(offset);
      vec4 finalColor;
      if (dist < 0.001) {
        finalColor = texture2D(uTexture, vUv);
      } else {
        float angle = atan(offset.y, offset.x);
        float coreMask = smoothstep(0.08, 0.20, dist);
        float wave = sin(dist * 40.0 - angle * 6.0 - uTime * 2.5) * coreMask;
        vec2 warpUv = vUv + normalize(offset) * wave * 0.00033;
        finalColor = texture2D(uTexture, warpUv);
        finalColor.rgb *= 1.0 + wave * 0.04; 
      }
      float alpha = smoothstep(0.45, 0.30, dist); 
      gl_FragColor = vec4(finalColor.rgb, alpha);
    }
  `
);
extend({ GalaxyDiskMaterial });

function HolographicGalaxy() {
  const texture = useTexture('/galaxy.jpg'); // 确保 public 目录下有这个图，否则会黑屏，但这不影响逻辑
  const { gl } = useThree(); 
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy(); 
    texture.generateMipmaps = false; 
    texture.minFilter = THREE.LinearFilter; 
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }, [texture, gl]);

  const diskMatRef = useRef();
  useFrame((state) => {
    if (diskMatRef.current) diskMatRef.current.uTime = state.clock.elapsedTime;
  });

  return (
    <group position={[0, -2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[800, 450, 1, 1]} />
        <galaxyDiskMaterial ref={diskMatRef} uTexture={texture} transparent={true} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function InteractivePlanet({ id, name, orbitRadius, size, orbitSpeed, startAngle, texturePath, activePlanet, setActivePlanet, setHoveredPlanet, isPaused }) {
  const groupRef = useRef();
  const planetMeshRef = useRef();
  // 注意：如果本地没有 p1.png 等，星球会渲染不出来，测试时可以注释掉材质，或确保本地有图
  const colorMap = useTexture(texturePath); 
  colorMap.colorSpace = THREE.SRGBColorSpace; 
  const currentAngle = useRef(startAngle);
  const isActive = activePlanet === id;

  useFrame((state, delta) => {
    if (!isPaused && !isActive) {
      const speedFactor = 1.0 + Math.sin(currentAngle.current * 2.0) * 0.3;
      currentAngle.current += orbitSpeed * speedFactor;
    }
    const wobble = 1.0 + Math.sin(currentAngle.current * 3.0) * 0.05;
    const baseX = Math.cos(currentAngle.current) * (orbitRadius * 1.4 * wobble);
    const baseZ = Math.sin(currentAngle.current) * (orbitRadius * 0.8 * wobble); 
    const hoverY = 3.0 + Math.sin(state.clock.elapsedTime * 0.8 + currentAngle.current * 2.0) * 1.5;

    const targetX = isActive ? 0 : baseX;
    const targetY = isActive ? 30 : hoverY; 
    const targetZ = isActive ? 60 : baseZ;  
    const targetPos = new THREE.Vector3(targetX, targetY, targetZ);
    groupRef.current.position.lerp(targetPos, delta * 3.5); 
    
    const depthScale = 1.0 + Math.sin(currentAngle.current) * 0.4;
    const targetScale = isActive ? 8 : depthScale; 
    planetMeshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4);
    
    if (isActive) planetMeshRef.current.rotation.y += 0.003;
    else if (!isPaused) planetMeshRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh 
        ref={planetMeshRef}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setHoveredPlanet(id); }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; setHoveredPlanet(null); }}
        onPointerDown={(e) => { e.stopPropagation(); setActivePlanet(id); }}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={colorMap} roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
}

// ==========================================
// 2. 暗黑学习面板组件 (图2: 课程选择)
// ==========================================
function LMSDashboard({ onPlayVideo, onBack }) {
  const lessons = [
    { id: 1, title: "第1讲 多项式与因式分解", time: "16:01", locked: false },
    { id: 2, title: "第2讲 实数与根号", time: "18:45", locked: true },
    { id: 3, title: "第3讲 一次不等式", time: "22:09", locked: true },
    { id: 4, title: "第4讲 集合与元素", time: "21:32", locked: true },
    { id: 5, title: "第5讲 命题与逻辑", time: "43:23", locked: true },
    { id: 6, title: "第6讲 二次函数与配方法", time: "30:08", locked: true },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-[#12100e] overflow-y-auto pb-24 text-white">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold tracking-widest text-[#b38b6d]" style={{ fontFamily: "'Noto Serif SC', serif" }}>奇点教育</h1>
          <nav className="flex gap-6 text-sm tracking-widest text-white/60">
            <span className="text-white border-b-2 border-[#b38b6d] pb-1">学习</span>
            <span className="hover:text-white cursor-pointer transition-colors">学习面板</span>
            <span className="hover:text-white cursor-pointer transition-colors">个人中心</span>
          </nav>
        </div>
        <button onClick={onBack} className="px-5 py-2 rounded-full border border-white/10 text-xs tracking-widest hover:bg-white/10 transition-colors">返回宇宙</button>
      </div>

      {/* 主体内容 */}
      <div className="max-w-6xl mx-auto mt-12 px-6">
        <h2 className="text-4xl font-bold mb-10 tracking-widest" style={{ fontFamily: "'Noto Serif SC', serif" }}>数学课程 1</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              onClick={() => !lesson.locked && onPlayVideo()}
              className={`relative flex flex-col p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all ${lesson.locked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer group'}`}
            >
              {/* 封面占位图 */}
              <div className="w-full h-48 rounded-2xl bg-[#1a1512] flex items-center justify-center relative overflow-hidden mb-4 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#b38b6d]/20 to-transparent"></div>
                {lesson.locked ? (
                  <svg className="w-10 h-10 text-[#b38b6d]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ) : (
                  <svg className="w-12 h-12 text-[#b38b6d] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] tracking-widest">{lesson.time}</div>
              </div>
              <div className="px-2 pb-2">
                <span className="text-[10px] px-2 py-1 bg-[#b38b6d]/20 text-[#b38b6d] rounded-md tracking-wider mr-2">lesson 0{lesson.id}</span>
                <h3 className="text-lg font-bold mt-3 text-white/90">{lesson.title}</h3>
                {/* 底部微型进度条 */}
                {!lesson.locked && <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden"><div className="w-1/3 h-full bg-[#b38b6d]"></div></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. 沉浸式视频播放器 (图3: 播放界面)
// ==========================================
function VideoPlayer({ onBack }) {
  return (
    <div className="absolute inset-0 z-50 bg-[#0a0807] flex flex-col h-screen text-white overflow-hidden">
      {/* 极简顶栏 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm tracking-widest">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          返回课程目录
        </button>
        <span className="text-xs text-[#b38b6d] border border-[#b38b6d]/30 px-3 py-1 rounded-full">剧场模式开启</span>
      </div>

      <div className="flex flex-1 p-6 gap-6 h-full min-h-0">
        {/* 左侧：播放器核心 */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="w-full aspect-video bg-black rounded-3xl border border-white/10 flex items-center justify-center relative shadow-2xl overflow-hidden">
             {/* 伪装播放画面 */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1512]/90 flex flex-col justify-end p-8">
                <h1 className="text-4xl font-bold tracking-widest mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>第1讲 多项式与因式分解</h1>
                <p className="text-white/50 tracking-widest text-sm">EJU 数学课程 1 讲座</p>
             </div>
             {/* 播放控制条 (UI 模拟) */}
             <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end px-6 pb-4">
                <div className="w-full flex items-center gap-4">
                  <svg className="w-5 h-5 text-white cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  <span className="text-xs tracking-wider text-white/70">12:45 / 16:01</span>
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative"><div className="absolute left-0 top-0 bottom-0 w-3/4 bg-[#b38b6d] rounded-full"></div></div>
                  <svg className="w-5 h-5 text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </div>
             </div>
          </div>
          
          <div className="mt-6 flex gap-4">
             <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2"><svg className="w-4 h-4 text-[#b38b6d]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>AI 助教答疑</button>
             <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2"><svg className="w-4 h-4 text-[#b38b6d]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>随堂练习</button>
          </div>
        </div>

        {/* 右侧：章节侧边栏 */}
        <div className="w-80 bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col backdrop-blur-md h-full">
          <h3 className="text-lg font-bold tracking-widest mb-4 border-b border-white/10 pb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>章节目录</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
            {['学习目标', '单项式与多项式', '同类项', '展开定义', '展开公式(基本3个)', '展开公式(应用5个)', '例题1 提示', '例题1 解答'].map((chapter, idx) => (
              <div key={idx} className={`px-4 py-3 rounded-xl cursor-pointer transition-colors text-sm tracking-wider flex items-center gap-4 ${idx === 1 ? 'bg-[#b38b6d]/20 text-[#b38b6d]' : 'hover:bg-white/5 text-white/70'}`}>
                <span className="opacity-50 text-xs">0{idx + 1}</span>
                {chapter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. 核心主控组件 (掌控宇宙到UI的切换)
// ==========================================
export default function CurriculumSection() {
  const [activePlanet, setActivePlanet] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  
  // 核心状态控制系统：'universe' | 'dashboard' | 'video'
  const [currentView, setCurrentView] = useState('universe'); 
  const [isWarping, setIsWarping] = useState(false);

  const isPaused = activePlanet !== null || hoveredPlanet !== null;

  const planetsData = [
    { id: 'p1', name: '日本語', orbitRadius: 40, size: 5.6, orbitSpeed: 0.0025, startAngle: 0.0, texturePath: '/p2.png' },
    { id: 'p2', name: '数学 1', orbitRadius: 60, size: 4.4, orbitSpeed: 0.0020, startAngle: 2.1, texturePath: '/p1.jpg' },
    { id: 'p3', name: '数学 2', orbitRadius: 80, size: 6.8, orbitSpeed: 0.0015, startAngle: 4.2, texturePath: '/p3.png' },
    { id: 'p4', name: '物 理', orbitRadius: 100, size: 6.0, orbitSpeed: 0.0011, startAngle: 1.0, texturePath: '/p4.png' },
    { id: 'p5', name: '化 学', orbitRadius: 120, size: 5.2, orbitSpeed: 0.0007, startAngle: 3.5, texturePath: '/p5.jpg' },
    { id: 'p7', name: '総合科目', orbitRadius: 140, size: 5.4, orbitSpeed: 0.0005, startAngle: 5.5, texturePath: '/p7.png' },
    { id: 'p6', name: '生 物', orbitRadius: 160, size: 4.4, orbitSpeed: 0.0002, startAngle: 1.8, texturePath: '/p6.jpg' },
  ];

  const activePlanetData = planetsData.find(p => p.id === activePlanet);

  // 触发白场并切换到学习面板
  const handleStartLearning = () => {
    setIsWarping(true);
    setTimeout(() => {
      setCurrentView('dashboard');
      setIsWarping(false); // 切换后白场消失
    }, 1000);
  };

  return (
    <section style={{ width: '100vw', height: '100vh', flex: 'none', backgroundColor: '#000000', position: 'relative', overflow: 'hidden' }}>
      
      {/* 极速白场跃迁覆盖层 */}
      <div 
        style={{
          position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#ffffff',
          pointerEvents: isWarping ? 'auto' : 'none',
          opacity: isWarping ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      {/* 视图 1：宇宙主界面 */}
      {currentView === 'universe' && (
        <>
          <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', pointerEvents: 'none', opacity: activePlanet ? 0 : 1, transition: 'opacity 0.5s' }}>
            <h2 style={{ fontSize: '3rem', color: '#fff', textShadow: '0 0 20px #fff', margin: '0 0 5px 0', letterSpacing: '4px' }}>THE EJU UNIVERSE</h2>
            <p style={{ color: '#ffffff', fontSize: '1rem', letterSpacing: '2px', margin: 0, opacity: 0.7 }}>鼠标悬停锁定目标 • 点击进入沉浸航线</p>
          </div>

          {activePlanetData && (
            <div 
              className="bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
              style={{ 
                position: 'absolute', top: '50%', left: '8%', transform: 'translateY(-50%)', 
                zIndex: 20, padding: '40px', borderRadius: '24px', 
                width: '380px', pointerEvents: 'auto',
                opacity: isWarping ? 0 : 1, 
                transition: 'opacity 0.3s'
            }}>
              <button onClick={() => setActivePlanet(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', opacity: 0.5 }}>✕</button>
              <h2 style={{ color: '#ffffff', margin: '0 0 10px 0', fontSize: '2.5rem' }}>{activePlanetData.name}</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 30px 0', opacity: 0.7 }}>
                这里是专属于 {activePlanetData.name} 课程的核心学习舱。准备好开始你的探索了吗？
              </p>
              <button 
                onClick={handleStartLearning}
                className="bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
                style={{ width: '100%', padding: '15px', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer' }}
              >
                开始学习
              </button>
            </div>
          )}

          <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ fov: 55, position: [0, 320, 180] }} dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
            <Suspense fallback={null}>
              <Stars radius={400} depth={50} count={8000} factor={3} saturation={0} fade speed={1} />
              <ambientLight intensity={0.8} color="#8ba3c7" />
              <pointLight position={[0, 0, 0]} intensity={2500} distance={800} decay={1.5} color="#ffedd6" />
              <directionalLight position={[0, 200, -200]} intensity={1.2} color="#a1bfff" />
              <HolographicGalaxy />
              {planetsData.map(p => (
                 <InteractivePlanet key={p.id} {...p} activePlanet={activePlanet} setActivePlanet={setActivePlanet} setHoveredPlanet={setHoveredPlanet} isPaused={isPaused} />
              ))}
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} target={[0, 0, 0]} />
            </Suspense>
          </Canvas>
        </>
      )}

      {/* 视图 2：LMS 面板 (图2) */}
      {currentView === 'dashboard' && (
        <LMSDashboard 
          onPlayVideo={() => setCurrentView('video')} 
          onBack={() => { setActivePlanet(null); setCurrentView('universe'); }} 
        />
      )}

      {/* 视图 3：沉浸式播放器 (图3) */}
      {currentView === 'video' && (
        <VideoPlayer 
          onBack={() => setCurrentView('dashboard')} 
        />
      )}

    </section>
  );
}