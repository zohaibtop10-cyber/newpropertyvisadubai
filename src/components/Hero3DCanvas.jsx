import React, { useEffect, useRef } from 'react';

export default function Hero3DCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) / (width / 2);
      targetMouseY = (e.clientY - rect.top - height / 2) / (height / 2);
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Generate 3D Particles
    const numParticles = 75;
    const particles = Array.from({ length: numParticles }, () => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 600,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#D4AF37' : '#F59E0B',
      alpha: Math.random() * 0.7 + 0.3,
    }));

    // Generate 3D Torus Vertices (Outer Ring)
    const R = 140; // Major radius
    const r = 35;  // Minor radius
    const torusPoints = [];
    const mainSegments = 24;
    const tubeSegments = 12;

    for (let i = 0; i < mainSegments; i++) {
      const u = (i / mainSegments) * Math.PI * 2;
      for (let j = 0; j < tubeSegments; j++) {
        const v = (j / tubeSegments) * Math.PI * 2;
        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = (R + r * Math.cos(v)) * Math.sin(u);
        const z = r * Math.sin(v);
        torusPoints.push({ x, y, z, u, v });
      }
    }

    // Octahedron Vertices (Inner Gold Crystal)
    const crystalSize = 55;
    const crystalVertices = [
      { x: 0, y: -crystalSize, z: 0 },
      { x: crystalSize, y: 0, z: 0 },
      { x: 0, y: 0, z: crystalSize },
      { x: -crystalSize, y: 0, z: 0 },
      { x: 0, y: 0, z: -crystalSize },
      { x: 0, y: crystalSize, z: 0 },
    ];
    const crystalFaces = [
      [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
      [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
    ];

    // Rotation angles
    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      angleX += 0.006;
      angleY += 0.009;

      const rotX = angleX + mouseY * 0.3;
      const rotY = angleY + mouseX * 0.3;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 400;

      // 1. Draw Ambient Gold Glow Sphere Background
      const ambientGlow = ctx.createRadialGradient(
        centerX + mouseX * 40, centerY + mouseY * 40, 10,
        centerX, centerY, width * 0.4
      );
      ambientGlow.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
      ambientGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.05)');
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, width * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Helper 3D rotation & projection
      const project = (px, py, pz) => {
        // Rotate around Y
        let x1 = px * cosY - pz * sinY;
        let z1 = px * sinY + pz * cosY;
        // Rotate around X
        let y2 = py * cosX - z1 * sinX;
        let z2 = py * sinX + z1 * cosX;

        const scale = focalLength / (focalLength + z2 + 350);
        return {
          sx: centerX + x1 * scale,
          sy: centerY + y2 * scale,
          scale,
          z: z2
        };
      };

      // 2. Render Floating Particles
      particles.forEach((p) => {
        p.z += 0.5;
        if (p.z > 300) p.z = -300;

        const proj = project(p.x, p.y, p.z);
        if (proj.scale > 0) {
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, Math.max(0.5, p.radius * proj.scale), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, Math.max(0.1, p.alpha * proj.scale));
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#D4AF37';
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });

      // 3. Render Outer 3D Gold Torus Ring
      const projectedTorus = torusPoints.map(p => ({
        ...project(p.x, p.y, p.z),
        u: p.u,
        v: p.v
      }));

      // Sort points by Z depth for realistic wireframe layering
      projectedTorus.sort((a, b) => b.z - a.z);

      ctx.lineWidth = 1;
      projectedTorus.forEach((pt) => {
        if (pt.scale > 0) {
          ctx.beginPath();
          ctx.arc(pt.sx, pt.sy, 1.8 * pt.scale, 0, Math.PI * 2);
          const depthAlpha = Math.min(0.8, Math.max(0.1, (pt.z + 200) / 400));
          ctx.fillStyle = `rgba(212, 175, 55, ${depthAlpha})`;
          ctx.fill();
        }
      });

      // 4. Render Inner Floating 3D Gold Crystal (Octahedron)
      const projectedCrystal = crystalVertices.map(v => project(v.x, v.y, v.z));
      
      crystalFaces.forEach((face, idx) => {
        const p1 = projectedCrystal[face[0]];
        const p2 = projectedCrystal[face[1]];
        const p3 = projectedCrystal[face[2]];

        if (p1.scale > 0 && p2.scale > 0 && p3.scale > 0) {
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.lineTo(p3.sx, p3.sy);
          ctx.closePath();

          // Face lighting calculation
          const avgZ = (p1.z + p2.z + p3.z) / 3;
          const goldShade = Math.floor(180 + Math.sin(idx + angleY) * 60);
          ctx.fillStyle = `rgba(${goldShade}, ${Math.floor(goldShade * 0.8)}, 55, 0.45)`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
          ctx.fill();

          ctx.strokeStyle = 'rgba(243, 229, 171, 0.8)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full min-h-[320px] pointer-events-none relative z-0"
    />
  );
}
