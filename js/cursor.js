/**
 * VYRA WEB STUDIO - SOPHISTICATED CURSOR & INTERACTION SYSTEM
 * Lerped smooth aura, dynamic lighting field, 3D card tilt, magnetic buttons.
 * Optimized with requestAnimationFrame for fluid 60fps performance.
 */

(function () {
  'use strict';

  // Check preferences
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouchDevice || prefersReducedMotion) {
    return; // Gracefully disable on touch or reduced motion
  }

  // DOM Elements
  const cursorAura = document.querySelector('.cursor-aura');
  const cursorDot = document.querySelector('.cursor-dot');
  const ambientField = document.querySelector('.ambient-light-field');

  if (!cursorAura || !cursorDot) return;

  // Target coordinates (actual mouse position)
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;

  // Current interpolated coordinates (lerped)
  let auraX = targetX;
  let auraY = targetY;
  let dotX = targetX;
  let dotY = targetY;

  // Lerp factor
  const AURA_LERP = 0.08;
  const DOT_LERP = 0.25;

  let isHoveringInteractive = false;

  // Mouse move listener
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    // Update ambient background field position
    if (ambientField) {
      const xPercent = (targetX / window.innerWidth) * 100;
      const yPercent = (targetY / window.innerHeight) * 100;
      ambientField.style.setProperty('--cursor-x', `${xPercent}%`);
      ambientField.style.setProperty('--cursor-y', `${yPercent}%`);
    }
  }, { passive: true });

  // Animation Loop
  function render() {
    // Lerp positions
    auraX += (targetX - auraX) * AURA_LERP;
    auraY += (targetY - auraY) * AURA_LERP;
    dotX += (targetX - dotX) * DOT_LERP;
    dotY += (targetY - dotY) * DOT_LERP;

    // Apply transforms
    cursorAura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;
    cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Interactive Elements hover effect on cursor dot
  const interactiveSelectors = 'a, button, input, select, textarea, .project-card, .service-row-item, .why-card';
  const interactiveElements = document.querySelectorAll(interactiveSelectors);

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('active');
    });
  });

  // 3D Card Tilt on Portfolio Cards
  const tiltCards = document.querySelectorAll('.project-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7deg
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Magnetic Pull on Buttons
  const magneticButtons = document.querySelectorAll('.btn-vyra-primary, .btn-view-project');

  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });
})();
