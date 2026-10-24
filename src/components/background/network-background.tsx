"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Pulse {
  x: number;
  y: number;
  born: number;
}

const PULSE_LIFETIME = 2200;
const PULSE_INTERVAL = 2600;
const POINTER_RADIUS = 170;

function readAccent(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim();
  const [r, g, b] = raw.split(/\s+/).map(Number);
  return [r || 70, g || 240, b || 184];
}

/**
 * A quiet node graph with occasional "block broadcast" ripples. It pauses off-screen and when the
 * tab is hidden, draws one still frame under prefers-reduced-motion, and follows the theme accent.
 */
export function NetworkBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx = context;
    const surface = canvas;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -9999, y: -9999 };
    let nodes: GraphNode[] = [];
    let pulses: Pulse[] = [];
    let accent = readAccent();
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;
    let lastPulse = 0;
    let onScreen = true;

    function resize() {
      const rect = surface.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.round((width * height) / 18000));
      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.12 + Math.random() * 0.22;
        return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
      });
      pulses = [];
      draw(performance.now(), 0);
    }

    function draw(time: number, step: number) {
      const [r, g, b] = accent;
      const linkDistance = width < 640 ? 100 : 140;
      ctx.clearRect(0, 0, width, height);

      if (step > 0) {
        for (const node of nodes) {
          node.x += node.vx * step;
          node.y += node.vy * step;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance < linkDistance) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - distance / linkDistance) * 0.28})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        const pdx = nodes[i].x - pointer.x;
        const pdy = nodes[i].y - pointer.y;
        const pointerDistance = Math.hypot(pdx, pdy);
        if (pointerDistance < POINTER_RADIUS) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - pointerDistance / POINTER_RADIUS) * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(${r},${g},${b},0.75)`;
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      pulses = pulses.filter((pulse) => time - pulse.born < PULSE_LIFETIME);
      for (const pulse of pulses) {
        const t = (time - pulse.born) / PULSE_LIFETIME;
        ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - t) * 0.35})`;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, t * 150, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (step > 0 && nodes.length > 0 && time - lastPulse > PULSE_INTERVAL) {
        const origin = nodes[Math.floor(Math.random() * nodes.length)];
        pulses.push({ x: origin.x, y: origin.y, born: time });
        lastPulse = time;
      }
    }

    function loop(time: number) {
      const step = lastTime ? Math.min(2, (time - lastTime) / 16.67) : 1;
      lastTime = time;
      draw(time, step);
      frameId = onScreen && !document.hidden ? requestAnimationFrame(loop) : 0;
    }

    function start() {
      if (reduceMotion.matches || frameId) return;
      lastTime = 0;
      frameId = requestAnimationFrame(loop);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = surface.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    }
    function onPointerLeave() {
      pointer.x = pointer.y = -9999;
    }
    function onVisibility() {
      if (!document.hidden) start();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surface);

    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
    });
    intersection.observe(surface);

    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
      if (reduceMotion.matches) draw(performance.now(), 0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none", className)} />;
}
