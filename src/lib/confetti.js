// Lightweight 3D Confetti Particle Effect
export default function triggerConfetti() {
  if (typeof window === 'undefined') return;

  const colors = ['#D4AF37', '#F3E5AB', '#D4AF37', '#FFFFFF', '#F59E0B'];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.zIndex = '9999';
    particle.style.pointerEvents = 'none';
    particle.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
    particle.style.top = `${40 + (Math.random() - 0.5) * 20}%`;
    particle.style.width = `${Math.random() * 8 + 6}px`;
    particle.style.height = `${Math.random() * 8 + 6}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.boxShadow = '0 0 10px rgba(212,175,55,0.6)';
    particle.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    particle.style.opacity = '1';

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 150 + 80;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity + 100;
      const rot = Math.random() * 720 - 360;

      particle.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(0.5)`;
      particle.style.opacity = '0';
    });

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1300);
  }
}
