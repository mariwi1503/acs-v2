"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function PlexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !hero || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false, strength: 0 };
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let touchReleaseTimer: number | undefined;

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);

      const positions = stars.map((star) => {
        if (pointer.strength < 0.01 || motionPreference.matches) return { x: star.x, y: star.y, glow: 0 };
        const dx = star.x - pointer.x;
        const dy = star.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const glow = Math.max(0, 1 - distance / 190) * pointer.strength;
        const push = glow * glow * 24;
        return {
          x: star.x + (distance ? (dx / distance) * push : 0),
          y: star.y + (distance ? (dy / distance) * push : 0),
          glow,
        };
      });

      for (let i = 0; i < positions.length; i++) {
        const first = positions[i];
        for (let j = i + 1; j < positions.length; j++) {
          const second = positions[j];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance > 145) continue;
          const strength = 1 - distance / 145;
          const glow = Math.max(first.glow, second.glow);
          context.strokeStyle = glow > 0
            ? `rgba(112, 199, 245, ${((0.17 + glow * 0.48) * strength).toFixed(3)})`
            : `rgba(112, 199, 245, ${(0.3 * strength).toFixed(3)})`;
          context.lineWidth = glow > 0 ? 1 : 0.7;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }

      if (pointer.strength > 0.01 && !motionPreference.matches) {
        const halo = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 190);
        halo.addColorStop(0, `rgba(244, 91, 19, ${0.09 * pointer.strength})`);
        halo.addColorStop(1, "rgba(244, 91, 19, 0)");
        context.fillStyle = halo;
        context.fillRect(pointer.x - 190, pointer.y - 190, 380, 380);

        positions.forEach((star) => {
          if (star.glow < 0.15) return;
          context.strokeStyle = `rgba(244, 125, 65, ${(star.glow * 0.48).toFixed(3)})`;
          context.lineWidth = 0.8;
          context.beginPath();
          context.moveTo(pointer.x, pointer.y);
          context.lineTo(star.x, star.y);
          context.stroke();
        });
      }

      positions.forEach((position, index) => {
        const star = stars[index];
        context.beginPath();
        context.arc(position.x, position.y, star.radius + position.glow * 1.2, 0, Math.PI * 2);
        context.fillStyle = position.glow > 0.15
          ? `rgba(255, 187, 140, ${(0.7 + position.glow * 0.3).toFixed(3)})`
          : "rgba(177, 223, 249, 0.8)";
        context.fill();
      });
    }

    function animate(time: number) {
      if (document.hidden || motionPreference.matches) return;
      const step = Math.min((time - (previousTime || time)) / 16.67, 2);
      previousTime = time;
      pointer.x += (pointer.targetX - pointer.x) * Math.min(0.17 * step, 1);
      pointer.y += (pointer.targetY - pointer.y) * Math.min(0.17 * step, 1);
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * Math.min(0.12 * step, 1);
      for (const star of stars) {
        star.x += star.vx * step;
        star.y += star.vy * step;
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(animate);
    }

    function start() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (motionPreference.matches || document.hidden) {
        draw();
      } else {
        frame = requestAnimationFrame(animate);
      }
    }

    function resize() {
      if (!canvas || !hero || !context) return;
      const bounds = hero.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(115, Math.max(42, Math.round(width * height / 10500)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.25 + 0.75,
      }));
      start();
    }

    function movePointer(event: PointerEvent) {
      if (event.pointerType === "touch" && !event.isPrimary) return;
      const bounds = hero!.getBoundingClientRect();
      pointer.targetX = event.clientX - bounds.left;
      pointer.targetY = event.clientY - bounds.top;
      window.clearTimeout(touchReleaseTimer);
      if (event.pointerType === "touch") {
        if (!pointer.active) {
          pointer.x = pointer.targetX;
          pointer.y = pointer.targetY;
        }
        pointer.strength = Math.max(pointer.strength, 0.6);
      } else if (!pointer.active && pointer.strength < 0.01) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
      pointer.active = true;
    }

    function startTouch(event: PointerEvent) {
      if (event.pointerType === "touch") movePointer(event);
    }

    function leavePointer(event: PointerEvent) {
      if (event.pointerType !== "touch") {
        pointer.active = false;
        return;
      }
      window.clearTimeout(touchReleaseTimer);
      touchReleaseTimer = window.setTimeout(() => {
        pointer.active = false;
      }, 400);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    hero.addEventListener("pointerdown", startTouch);
    hero.addEventListener("pointermove", movePointer);
    hero.addEventListener("pointerleave", leavePointer);
    hero.addEventListener("pointerup", leavePointer);
    hero.addEventListener("pointercancel", leavePointer);
    document.addEventListener("visibilitychange", start);
    motionPreference.addEventListener("change", start);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(touchReleaseTimer);
      observer.disconnect();
      hero.removeEventListener("pointerdown", startTouch);
      hero.removeEventListener("pointermove", movePointer);
      hero.removeEventListener("pointerleave", leavePointer);
      hero.removeEventListener("pointerup", leavePointer);
      hero.removeEventListener("pointercancel", leavePointer);
      document.removeEventListener("visibilitychange", start);
      motionPreference.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-plexus" aria-hidden="true" />;
}
