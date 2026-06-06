import { useEffect, useRef } from 'react';

export default function FloatingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.002,
    }));

    const sparkles = Array.from({ length: 18 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 4,
      color: ['#F59E0B', '#EC4899', '#7C3AED', '#06B6D4', '#10B981'][Math.floor(Math.random() * 5)],
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
      alpha: Math.random() * 0.7 + 0.3,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: Math.random() * 0.008 + 0.003,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
    }));

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.beginPath();
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => {
        s.alpha += s.speed * (s.alpha > 0.9 ? -1 : s.alpha < 0.1 ? 1 : (Math.random() > 0.5 ? 1 : -1));
        s.alpha = Math.max(0.05, Math.min(0.95, s.alpha));
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#a78bfa';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      sparkles.forEach(sp => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.rotation += sp.rotSpeed;
        sp.alpha += sp.alphaDir * sp.alphaSpeed;
        if (sp.alpha >= 0.9 || sp.alpha <= 0.2) sp.alphaDir *= -1;
        if (sp.y < -20) {
          sp.y = canvas.height + 20;
          sp.x = Math.random() * canvas.width;
        }
        if (sp.x < -20 || sp.x > canvas.width + 20) {
          sp.x = Math.random() * canvas.width;
          sp.y = Math.random() * canvas.height;
        }
        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.rotate(sp.rotation);
        drawStar(ctx, 0, 0, 4, sp.size, sp.size * 0.4, sp.color, sp.alpha);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}