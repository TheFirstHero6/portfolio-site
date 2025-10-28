"use client";

import { useState, useEffect } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "horizontal" | "vertical" | "both";
  offset?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = "both", offset = 0 } = options;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const calculateTransform = () => {
      let x = 0;
      let y = 0;

      if (direction === "horizontal" || direction === "both") {
        x = mousePosition.x * speed * 50 + offset;
      }

      if (direction === "vertical" || direction === "both") {
        y = mousePosition.y * speed * 50 + offset;
      }

      setTransform({ x, y });
    };

    calculateTransform();
  }, [mousePosition, speed, direction, offset]);

  return { transform, mousePosition };
}
