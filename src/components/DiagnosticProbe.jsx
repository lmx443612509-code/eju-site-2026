import React from 'react';
import { Canvas } from '@react-three/fiber';
// 就是下面这一行！刚才漏掉了 Html，现在加上了！
import { OrbitControls, Stars, Html } from '@react-three/drei'; 

function VisiblePlanet({ name, color, position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[2, 32, 32]} />
      {/* 纯色自发光材质，无视任何光照，绝对可见 */}
      <meshBasicMaterial color={color} />
      
      <Html distanceFactor={15} center>
        <div style={{ color: color, fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', textShadow: '0 0 5px #000' }}>
          {name} (诊断球)
        </div>
      </Html>
    </mesh>
  );
}

export default function DiagnosticProbe() {
  return (
    <section style={{ width: '100vw', height: '100vh', backgroundColor: '#020105', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}>
        <h2 style={{ color: '#00FFFF', fontSize: '2rem', marginBottom: '10px' }}>🚀 奇点宇宙 3D 诊断探针</h2>
        <p style={{ color: '#fff' }}>如果我们能看到下方的彩色发光球体，说明星球渲染引擎完全正常！</p>
      </div>

      <Canvas camera={{ position: [0, 0, 40], fov: 45 }}>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* 3个纯色诊断球 */}
        <VisiblePlanet name="日本語" color="#4facfe" position={[10, 0, 0]} />
        <VisiblePlanet name="数学" color="#ff5722" position={[-10, 5, -10]} />
        <VisiblePlanet name="物理" color="#00ffff" position={[0, -10, 10]} />

        <OrbitControls autoRotate={false} />
      </Canvas>
    </section>
  );
}