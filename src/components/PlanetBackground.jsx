import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function PlanetBackground({ activePlanet = 'earth' }) {
  const mountRef = useRef(null);
  
  // 实时记录当前需要激活的星球
  const activeRef = useRef(activePlanet);
  const planetsArrayRef = useRef([]);

  useEffect(() => {
    activeRef.current = activePlanet;
  }, [activePlanet]);

  useEffect(() => {
    if (!mountRef.current) return;

    /* ==========================================
       1. 初始化深空场景与渲染器
    ========================================== */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // 👑 镜头修复：
    // Z = 7.5：大幅拉近，让星球塞满整个屏幕高度，压迫感拉满！
    // X = 3：把摄像机整体向右平移，这样位于坐标原点 (0,0,0) 的星球就会被挤到画面最左边，甚至切掉一点点。
    camera.position.set(3, 0, 7.5); 

    const renderer = new THREE.WebGLRenderer({ antialias: true }); 
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 15;

    // 👑 镜头修复：
    // 摄像机平移后，视线必须也要跟着平移，直直地看过去。绝不能设为负数看偏！
    controls.target.set(3, 0, 0);

    /* ==========================================
       2. 初始化可编程光照系统
    ========================================== */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    // 调整光源到右侧，照亮星球朝向 UI 的那一面
    sunLight.position.set(8, 5, 5); 
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    /* ==========================================
       3. 预加载并组装全部 8 个星球实体
    ========================================== */
    const textureLoader = new THREE.TextureLoader();
    const planets = {};

    const registerPlanet = (name, object, config, updateFn) => {
      object.name = name;
      object.scale.set(0, 0, 0); 
      object.visible = false;
      object.userData = { config, update: updateFn };
      scene.add(object);
      planets[name] = object;
    };

    // --- 地球 ---
    const earthGroup = new THREE.Group();
    const earthMap = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    const earthBumpMap = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg');
    const earthSpecMap = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png');
    const earthCloudMap = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/fair_clouds_4k.png');
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshPhongMaterial({ map: earthMap, bumpMap: earthBumpMap, bumpScale: 0.15, specularMap: earthSpecMap, specular: new THREE.Color('#333333'), shininess: 15 }));
    const cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(3.05, 64, 64), new THREE.MeshLambertMaterial({ map: earthCloudMap, transparent: true, opacity: 0.8, depthWrite: false }));
    earthGroup.add(earthMesh); earthGroup.add(cloudsMesh);
    registerPlanet('earth', earthGroup, { ambient: 0xffffff, aInt: 0.2, sun: 2.5 }, () => {
      earthMesh.rotation.y += 0.001; cloudsMesh.rotation.y += 0.0015;
    });

    // --- 火星 ---
    const marsMap = textureLoader.load('/mars.jpg'); marsMap.colorSpace = THREE.SRGBColorSpace;
    const marsMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshStandardMaterial({ map: marsMap, bumpMap: marsMap, bumpScale: 0.08, roughness: 0.85 }));
    marsMesh.castShadow = true; marsMesh.receiveShadow = true; marsMesh.rotation.z = 25.2 * (Math.PI / 180);
    registerPlanet('mars', marsMesh, { ambient: 0xffddcc, aInt: 0.1, sun: 3.5 }, () => { marsMesh.rotation.y += 0.0015; });

    // --- 木星 ---
    const jupiterMap = textureLoader.load('/jupiter.jpg'); jupiterMap.colorSpace = THREE.SRGBColorSpace;
    const jupiterMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshStandardMaterial({ map: jupiterMap, roughness: 0.7 }));
    jupiterMesh.castShadow = true; jupiterMesh.receiveShadow = true; jupiterMesh.rotation.z = 3.1 * (Math.PI / 180);
    registerPlanet('jupiter', jupiterMesh, { ambient: 0xffffff, aInt: 0.15, sun: 3.5 }, () => { jupiterMesh.rotation.y += 0.0035; });

    // --- 金星 ---
    const venusGroup = new THREE.Group();
    const venusMap = textureLoader.load('/venus_surface.jpg'); venusMap.colorSpace = THREE.SRGBColorSpace;
    const venusCloudMap = textureLoader.load('/venus_atmosphere.jpg'); venusCloudMap.colorSpace = THREE.SRGBColorSpace;
    const venusMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshStandardMaterial({ map: venusMap, roughness: 1.0 }));
    const vCloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(3.05, 64, 64), new THREE.MeshStandardMaterial({ map: venusCloudMap, transparent: true, opacity: 0.85 }));
    venusGroup.add(venusMesh); venusGroup.add(vCloudsMesh);
    registerPlanet('venus', venusGroup, { ambient: 0xffffff, aInt: 0.1, sun: 3.5 }, () => { venusMesh.rotation.y -= 0.0002; vCloudsMesh.rotation.y += 0.0015; });

    // --- 水星 ---
    const mercuryMap = textureLoader.load('/mercury.jpg'); mercuryMap.colorSpace = THREE.SRGBColorSpace;
    const mercuryMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshStandardMaterial({ map: mercuryMap, bumpMap: mercuryMap, bumpScale: 0.05, roughness: 0.95, metalness: 0.1 }));
    mercuryMesh.castShadow = true; mercuryMesh.receiveShadow = true;
    registerPlanet('mercury', mercuryMesh, { ambient: 0xffffff, aInt: 0.05, sun: 5.0 }, () => { mercuryMesh.rotation.y += 0.001; });

    // --- 天王星 ---
    const uranusGroup = new THREE.Group(); uranusGroup.rotation.z = 97.77 * (Math.PI / 180);
    const uranusMap = textureLoader.load('/uranus.jpg'); uranusMap.colorSpace = THREE.SRGBColorSpace;
    const uranusMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshStandardMaterial({ map: uranusMap, roughness: 0.6, metalness: 0.1 }));
    uranusMesh.castShadow = true; uranusMesh.receiveShadow = true;
    const uRing = new THREE.Mesh(new THREE.RingGeometry(3.8, 5.5, 64), new THREE.MeshStandardMaterial({ color: 0x88ccff, side: THREE.DoubleSide, transparent: true, opacity: 0.15, depthWrite: false }));
    uRing.rotation.x = -Math.PI / 2; uRing.receiveShadow = true; uRing.castShadow = true;
    uranusGroup.add(uranusMesh); uranusGroup.add(uRing);
    registerPlanet('uranus', uranusGroup, { ambient: 0xaaccff, aInt: 0.15, sun: 2.5 }, () => { uranusGroup.rotation.y += 0.002; });

    // --- 海王星 ---
    const neptuneMap = textureLoader.load('/neptune.jpg'); neptuneMap.colorSpace = THREE.SRGBColorSpace;
    const neptuneMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshStandardMaterial({ map: neptuneMap, roughness: 0.65 }));
    neptuneMesh.castShadow = true; neptuneMesh.receiveShadow = true; neptuneMesh.rotation.z = 28.32 * (Math.PI / 180);
    registerPlanet('neptune', neptuneMesh, { ambient: 0x001133, aInt: 0.2, sun: 1.8 }, () => { neptuneMesh.rotation.y += 0.0025; });

    // --- 太阳 ---
    const sunGroup = new THREE.Group(); sunGroup.rotation.z = 7.25 * (Math.PI / 180);
    const sunMap = textureLoader.load('/sun.jpg'); sunMap.colorSpace = THREE.SRGBColorSpace;
    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshBasicMaterial({ map: sunMap }));
    sunGroup.add(sunMesh);
    registerPlanet('sun', sunGroup, { ambient: 0xffffff, aInt: 0.2, sun: 1.0 }, () => { sunMesh.rotation.y += 0.001; });

    planetsArrayRef.current = Object.values(planets);

    /* ==========================================
       4. 动画引擎：实现空间插值与交叉淡入淡出
    ========================================== */
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const current = activeRef.current; 

      planetsArrayRef.current.forEach(p => {
        if (p.userData.update) p.userData.update();

        if (p.name === current) {
          p.visible = true;
          // 新星球缓慢放大浮现
          p.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05); 
        } else {
          // 旧星球缓慢缩小隐退
          p.scale.lerp(new THREE.Vector3(0, 0, 0), 0.06); 
          if (p.scale.x < 0.01) p.visible = false; 
        }
      });

      const targetCfg = planets[current]?.userData.config;
      if (targetCfg) {
        ambientLight.intensity = THREE.MathUtils.lerp(ambientLight.intensity, targetCfg.aInt, 0.05);
        sunLight.intensity = THREE.MathUtils.lerp(sunLight.intensity, targetCfg.sun, 0.05);
        ambientLight.color.lerp(new THREE.Color(targetCfg.ambient), 0.05);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full -z-10" />;
}