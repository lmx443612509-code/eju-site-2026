import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Galaxy = () => {
  const pointsRef = useRef();

  // 星系核心参数（老板如果嫌稀疏，咱们之后可以调大 count）
  const count = 50000; 
  const radius = 5; 
  const branches = 3; 
  const spin = 1; 
  const randomness = 0.2;
  const randomnessPower = 3;

  // 核心算法：生成粒子的位置和颜色
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color('#38bdf8'); // 星系中心的亮冰川蓝
    const colorOutside = new THREE.Color('#1e3a8a'); // 星系边缘的深邃海军蓝

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      const spinAngle = r * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      // 让粒子在悬臂周围产生自然的散落感
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // 计算颜色渐变
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, r / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, []);

  // 让星系极其缓慢地自转，体现高级感
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
        vertexColors={true} 
      />
    </points>
  );
};

export default function QuantumGalaxy() {
  return (
    // 铺满全屏的极黑底色
    <div className="w-screen h-screen bg-[#020617] overflow-hidden">
      {/* 3D 摄像机视角：略微俯视星系 */}
      <Canvas camera={{ position: [0, 3, 4], fov: 60 }}>
        <Galaxy />
      </Canvas>
    </div>
  );
}