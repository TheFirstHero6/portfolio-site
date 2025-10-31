// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useEffect, useRef, useState } from "react";

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
  maxFontSize?: number;
  // Fraction of text width used as influence radius; smaller = must be closer
  sensitivity?: number;
}

const TextPressure: React.FC<TextPressureProps> = ({
  text = "Compressa",
  fontFamily = "Compressa VF",
  fontUrl = "https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = "#FFFFFF",
  strokeColor = "#FF0000",
  strokeWidth = 2,
  className = "",
  minFontSize = 24,
  sensitivity = 0.25,
  maxFontSize = 96,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [hasPointer, setHasPointer] = useState(false);
  const activationStartRef = useRef<number | null>(null);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasPointer) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
        activationStartRef.current = performance.now();
        setHasPointer(true);
      } else {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!hasPointer) {
        mouseRef.current.x = t.clientX;
        mouseRef.current.y = t.clientY;
        cursorRef.current.x = t.clientX;
        cursorRef.current.y = t.clientY;
        activationStartRef.current = performance.now();
        setHasPointer(true);
      } else {
        cursorRef.current.x = t.clientX;
        cursorRef.current.y = t.clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    if (containerRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [hasPointer]);

  const setSize = () => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    // Derive a font size from container width and character count,
    // but clamp to avoid runaway growth on large viewports or fullscreen.
    // The divisor (chars.length * 1.8) yields a conservative fit.
    const fitted = containerW / Math.max(1, chars.length * 1.8);
    let newFontSize = Math.min(Math.max(fitted, minFontSize), maxFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  };

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [scale, text]);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 20;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 20;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = Math.max(1, titleRect.width * sensitivity);

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          const getAttr = (
            distance: number,
            minVal: number,
            maxVal: number
          ) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          // Neutral values when pointer is inactive to prevent phantom pressure
          const neutralWdth = 100;
          const neutralWght = 200;
          const neutralItal = italic ? "1" : "0";
          const neutralAlpha = "1";

          // Smooth activation ramp to avoid a pop on first movement
          let ramp = 0;
          if (hasPointer && activationStartRef.current != null) {
            const elapsed = performance.now() - activationStartRef.current;
            ramp = Math.max(0, Math.min(1, elapsed / 180));
          }

          const targetWdth = Math.floor(getAttr(d, 5, 200));
          const targetWght = Math.floor(getAttr(d, 100, 900));
          const targetItal = getAttr(d, 0, 1);

          // Additional temporal smoothing to avoid any jolt
          const prev = (span as any)._prev || {
            wdth: neutralWdth,
            wght: neutralWght,
            ital: parseFloat(neutralItal),
          };
          const smoothing = 0.12; // lower = smoother

          const wdthTarget = width
            ? neutralWdth + ramp * (targetWdth - neutralWdth)
            : neutralWdth;
          const wghtTarget = weight
            ? neutralWght + ramp * (targetWght - neutralWght)
            : neutralWght;
          const italTarget = italic
            ? neutralItal === "1"
              ? 1 * (1 - ramp) + targetItal * ramp
              : 0 * (1 - ramp) + targetItal * ramp
            : parseFloat(neutralItal);

          const wdth = Math.round(prev.wdth + (wdthTarget - prev.wdth) * smoothing);
          const wght = Math.round(prev.wght + (wghtTarget - prev.wght) * smoothing);
          const italVal = (prev.ital + (italTarget - prev.ital) * smoothing).toFixed(2);
          (span as any)._prev = { wdth, wght, ital: parseFloat(italVal) };
          const alphaVal = neutralAlpha;

          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, chars.length, hasPointer, sensitivity]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-transparent"
      // Do not activate on mere enter. We only activate on actual pointer movement.
      onPointerLeave={() => {
        setHasPointer(false);
        // Reset to element center to remove bias when pointer leaves
        if (containerRef.current) {
          const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();
          const cx = left + width / 2;
          const cy = top + height / 2;
          cursorRef.current.x = cx;
          cursorRef.current.y = cy;
          mouseRef.current.x = cx;
          mouseRef.current.y = cy;
        }
      }}
    >
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${
          flex ? "flex justify-between" : ""
        } ${stroke ? "stroke" : ""} uppercase text-center`}
        style={{
          fontFamily,
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor,
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
