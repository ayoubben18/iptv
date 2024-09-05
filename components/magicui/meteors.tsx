"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMeteorStyles = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const styles = [...new Array(number)].map(() => ({
        top: -5,
        left: Math.floor(Math.random() * containerWidth) + "px",
        animationDelay: Math.random() * 1 + 0.2 + "s",
        animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
      }));
      setMeteorStyles(styles);
    };

    updateMeteorStyles();
    window.addEventListener("resize", updateMeteorStyles);

    return () => window.removeEventListener("resize", updateMeteorStyles);
  }, [number]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-purple-600 shadow-[0_0_0_1px_#ffffff10]",
          )}
          style={style}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-purple-600 to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
