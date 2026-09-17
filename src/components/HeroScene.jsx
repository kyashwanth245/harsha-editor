import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion, isTouchDevice } from '../utils/format.js';

/**
 * Subtle 3D accent layer for the hero: a handful of glowing wireframe
 * shapes + a soft particle field, drifting and reacting gently to the
 * mouse. Intentionally lightweight — this is a premium accent, not a
 * full WebGL showpiece.
 */
export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    if (prefersReducedMotion()) return undefined;

    const isMobile = isTouchDevice() || window.innerWidth < 768;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    mount.appendChild(renderer.domElement);

    // Glowing wireframe shapes
    const shapeGroup = new THREE.Group();
    const shapeCount = isMobile ? 2 : 4;
    const colors = [0x7c3aed, 0x22d3ee, 0xec4899, 0xa855f7];
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(0.9, 0),
      new THREE.TorusGeometry(0.7, 0.22, 8, 24),
    ];

    for (let i = 0; i < shapeCount; i += 1) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const spread = isMobile ? 3.5 : 5.5;
      mesh.position.set(
        (Math.random() - 0.5) * spread * 2,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 3
      );
      const scale = 0.6 + Math.random() * 0.9;
      mesh.scale.setScalar(scale);
      mesh.userData.rotSpeed = {
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.003,
      };
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;
      shapeGroup.add(mesh);
    }
    scene.add(shapeGroup);

    // Particle field
    const particleCount = isMobile ? 90 : 220;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!isMobile) window.addEventListener('mousemove', onMouseMove);

    let rafId;
    const clock = new THREE.Clock();
    let visible = true;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!visible) return;
      const t = clock.getElapsedTime();

      shapeGroup.children.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotSpeed.x * 16;
        mesh.rotation.y += mesh.userData.rotSpeed.y * 16;
        mesh.position.y += Math.sin(t * 0.4 + mesh.userData.floatOffset) * 0.0009;
      });

      particles.rotation.y = t * 0.01;

      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      shapeGroup.children.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />;
}
